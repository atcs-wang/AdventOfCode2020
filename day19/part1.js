const { match } = require('assert');
const fs = require('fs')

class Rule {
    static all_rules = new Map();

    constructor(rule_str = ""){
        [this.rule_num, rule_str] = rule_str.split(":");
        let index;
        if ((index = rule_str.indexOf("\"")) != -1){
            this.character = rule_str.slice(index + 1, index + 2)
            this.matches_front = (message) => message.startsWith(this.character) ? [1] : []
        }
        else {
            this.list_of_subrules = rule_str.split("|").map(e => e.trim().split(" "));
        }
        Rule.all_rules.set(this.rule_num, this);
    }


    matches_front(message){
        //return a LIST of the number of characters on the front that match. If no matches, return empty list
        //try each of the subrule lists. 
        return this.list_of_subrules.map( subrules => {
            return subrules.reduce( (front_matches, subr) => {
                subr = Rule.all_rules.get(subr);
                //for each front_match so far, 
                return front_matches.map( front => {
                    // check if this subrule matches on the substring, for each of those matches, add to front
                    return subr.matches_front(message.slice(front)).map(e => front + e)
                }).flat()
            }, [0]); 
        }).flat()
    }
}

fs.readFileSync("./day19/input_rules.txt",'utf8').split(/\r?\n/).forEach(e => {if (e != "") new Rule(e);});

// console.log(Rule.all_rules);
const rule0 = Rule.all_rules.get('0')

const match_messages = fs.readFileSync("./day19/input_messages.txt",'utf8').split(/\r?\n/).filter(e => rule0.matches_front(e) == e.length);
console.log(match_messages)
console.log(match_messages.length)