// https://adventofcode.com/2020/day/2

var fs = require('fs');

function isValid(line) {
    let stuff = line.split(/[- :]+/)
    // console.log(stuff)
    const p1 = Number(stuff[0]) -1
    const p2 = Number(stuff[1]) -1
    const char = stuff[2]
    const password = stuff[3]

    return [password[p1] == char, password[p2] == char].filter(x => x).length == 1
}

fs.readFile('day02/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const lines = data.split(/\r?\n/).filter(e => e != "")

    const valid = lines.filter(isValid)
    console.log(valid)
    console.log(valid.length)

});
