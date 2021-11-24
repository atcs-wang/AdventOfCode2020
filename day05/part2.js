// https://adventofcode.com/2020/day/5

// Learning about parsing: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
//learnign about sets: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set

const fs = require('fs');

// Using the Object class definition approach
// Treat like associative dictionaries
class BoardingPass {
    
    constructor(data_str) {
        this.text = data_str
        this.text_num = data_str.replace(/F/g, "0").replace(/B/g, "1").replace(/L/g, "0").replace(/R/g,"1")
        this.id = parseInt(this.text_num,2);
        this.column = this.id % 8 
        this.row = this.id >>> 3
    }
}



fs.readFile('day05/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let passes = data.split(/\r?\n/).filter(e => e != "").map(e => new BoardingPass(e))
    console.log(passes)
    let all = new Set()
    for (let i = 0; i < 128 * 8; i++)
        all.add(i)
    passes.forEach(p => all.delete(p.id))
     
    console.log(all)

});
