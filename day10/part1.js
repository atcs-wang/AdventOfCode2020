// https://adventofcode.com/2020/day/10

// https://stackoverflow.com/questions/3422458/unpacking-array-into-separate-variables-in-javascript

const fs = require('fs');



fs.readFile('day10/input.txt', 'utf8', function(err, data) {
    let adapters = data.split(/\r?\n/).filter(e => e != "").map(e => Number(e)).sort((a,b) => a - b)
    console.log(adapters)
    
    adapters.push(adapters[adapters.length -1] + 3)
    let counts = new Map([[1,0], [2,0], [3,0]])
    adapters.reduce((joltage,a) => {
        counts.set(a - joltage , (counts.get(a - joltage))+1);
        return a
    }, 0)
    console.log(counts)
});
