// https://adventofcode.com/2020/day/6


const fs = require('fs');

const allQs = "qwertyuiopasdfghjklzxcvbnm".split('')
class Group {
    
    constructor(data_str) {
        
        let persons = data_str.split(/\r?\n/).filter(e => e != "")
        this.questions_yes = new Set()
        allQs.forEach(q => {
            let all = true;
            persons.forEach((person) => {
                if (!person.includes(q))
                    all = false;
            })    
            if (all)
                this.questions_yes.add(q)
        })
    }

}



fs.readFile('day06/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let groups = data.split(/\r?\n\r?\n/).filter(e => e != "").map(e => new Group(e))
    console.log(groups)
    console.log(`Sum of Groups: ${groups.reduce((sum, g) => sum + g.questions_yes.size, 0)}`);

});
