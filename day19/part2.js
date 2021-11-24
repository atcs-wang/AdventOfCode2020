const { match } = require('assert');
const fs = require('fs')

class Rule {
    static all_rules = new Map();

    constructor(rule_str = ""){
        
        [this.rule_num, this.rule_str] = rule_str.split(":");
        let index;
        if ((index = this.rule_str.indexOf("\"")) != -1){
            this.character = this.rule_str.slice(index + 1, index + 2)
            this.matches_front = (message, depth) => {
                // this.debug(message, depth); 
                return message.startsWith(this.character) ? [1] : []
            }
        }
        else {
            this.list_of_subrules = this.rule_str.split("|").map(e => e.trim().split(" "));
        }
        Rule.all_rules.set(this.rule_num, this);
    }

    debug(message, depth){
        console.log("|" + "-|".repeat(depth) + ">" + `${message}: Trying rule ${this.rule_num}: ${this.rule_str}`)
    }

    debug2(rt, message, depth){
        if (rt.length != 0)
            console.log("|" + "-|".repeat(depth) + ">" + `${message}: rule ${this.rule_num}: ${this.rule_str} returns` + JSON.stringify(rt))
    }

    matches_front(message, depth = 0){
        // this.debug(message, depth)
        if (message.length == 0)
            return []
        //return a LIST of the number of characters on the front that match. If no matches, return empty list
        //try each of the subrule lists. 
        const rt = this.list_of_subrules.map( subrules => {
            return subrules.reduce( (front_matches, subr) => {
                subr = Rule.all_rules.get(subr);
                //for each front_match so far, 
                return front_matches.map( front => {
                    // check if this subrule matches on the substring, for each of those matches, add to front
                    return subr.matches_front(message.slice(front), depth + 1).map(e => front + e)
                }).flat()
            }, [0]); 
        }).flat();
        // this.debug2(rt, message, depth)
        // console.log(rt)
        return rt

    }
}

fs.readFileSync("./day19/input_rules_2.txt",'utf8').split(/\r?\n/).forEach(e => {if (e != "") new Rule(e);});

// console.log(Rule.all_rules);
const rule0 = Rule.all_rules.get('0')

const match_messages = fs.readFileSync("./day19/input_messages.txt",'utf8').split(/\r?\n/).filter(e => {console.log(`Testing: ${e}`); return rule0.matches_front(e).includes(e.length)});
console.log(match_messages)
console.log(match_messages.length)