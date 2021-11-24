// https://adventofcode.com/2020/day/11

const fs = require('fs');
const util = require('./board.js');

fs.readFile('day11/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const b = util.Board.fromString(data)
    let last_b_str = b.toString()
    b.update()    
    while (last_b_str != b.toString()) {
        last_b_str = b.toString()
        console.log(`Generation : ${b.generation} Filled : ${b.count()}`)
        b.update()
    }
    console.log(last_b_str)
});