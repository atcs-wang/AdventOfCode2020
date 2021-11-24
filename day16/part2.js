
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

    is_valid(rules){
        return this.fields.every( field =>  rules.some(rule => rule.is_valid(field)));
    }
}

//Let's try doing synchronous file reading today
const rules = fs.readFileSync("day16/input_rules.txt", 'utf8').split(/\r?\n/).map(line => new Rule(line)) 

const tickets = fs.readFileSync("day16/input_nearby.txt", 'utf8').split(/\r?\n/).map(line => new Ticket(line)) 

const valid_tickets = tickets.filter(e => e.is_valid(rules)) 


//figure out which columns are possible for each rule
rules.forEach(rule => {
    rule.possible_columns = []
    for (let col = 0; col < rules.length; col++){
        if (valid_tickets.every( ticket => rule.is_valid(ticket.fields[col]))){
            rule.possible_columns.push(col);
        }
    }
    // console.log(rule)
});
let uncertain_rules = []
//process of elimination - any rules with only one possible column, remove that from others' possiblities
while ((uncertain_rules = rules.filter(rule => !rule.hasOwnProperty('column')) ).length > 0) {
    uncertain_rules.filter(rule => rule.possible_columns.length == 1).forEach( known_rule => {
        known_rule.column = known_rule.possible_columns[0];
        uncertain_rules.forEach(rule => {
            var index = rule.possible_columns.indexOf(known_rule.column);
            if (index !== -1) {
                rule.possible_columns.splice(index, 1);
            }
        })
    }
    )
}

const columns_to_rulenames = new Map()
rules.forEach(rule => columns_to_rulenames.set(rule.column, rule.field))
console.log(columns_to_rulenames)
//my ticket
const myTicket = new Ticket(fs.readFileSync("day16/input_yourticket.txt", 'utf8') )
let mult = 1;
for (let col = 0; col < rules.length; col++){
    if (columns_to_rulenames.get(col).startsWith('departure')){
        mult *= myTicket.fields[col]
        console.log(`${col} (${columns_to_rulenames.get(col)}) :${myTicket.fields[col]}`)
    }
}
console.log(mult)



