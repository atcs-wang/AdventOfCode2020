// https://adventofcode.com/2020/day/2


var fs = require('fs');

function isValid(line) {
    let stuff = line.split(/[- :]+/)
    // console.log(stuff)
    const min = Number(stuff[0])
    const max = Number(stuff[1])
    const char = stuff[2]
    const password = stuff[3]

    let count = password.split('').reduce((total, c) => total + (c == char? 1 : 0), 0) //alt: filter(c => c == char).length
    return count >= min && count <= max
}

fs.readFile('day02/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const lines = data.split(/\r?\n/).filter(e => e != "")

    const valid = lines.filter(isValid)
    
    console.log(valid.length)

});
