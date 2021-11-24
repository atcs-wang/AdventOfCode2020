
const fs = require('fs');


class Rule {
    constructor(rule_str){
        //okay this is a cool trick
        [this.field, this.low_a, this.high_a, this.low_b, this.high_b] = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/.exec(rule_str).slice(1);
        this.low_a = Number(this.low_a)
        this.low_b = Number(this.low_b)
        this.high_a = Number(this.high_a)
        this.high_b = Number(this.high_b)
        // console.log(this)
    }

    is_valid(value){
        return (value >= this.low_a && value <= this.high_a) ||  (value >= this.low_b && value <= this.high_b) 
    }
}

class Ticket {
    constructor (ticket_str ="") {
        this.fields = ticket_str.split(",").map(e => Number(e))
        // console.log(this)
    }

    get_certainly_invalid_fields(rules = []){
        let invalids = this.fields.filter( field =>  ! rules.some(rule => rule.is_valid(field)));
        // console.log(`${this.fields}: X = ${invalids}`)
        return invalids
    }
}

//Let's try doing synchronous file reading today
const rules = fs.readFileSync("day16/input_rules.txt", 'utf8').split(/\r?\n/).map(line => new Rule(line)) 

const tickets = fs.readFileSync("day16/input_nearby.txt", 'utf8').split(/\r?\n/).map(line => new Ticket(line)) 

console.log(tickets.reduce((sum, ticket) => sum + ticket.get_certainly_invalid_fields(rules).reduce((a,b) => a + b, 0), 0))