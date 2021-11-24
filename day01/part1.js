// https://adventofcode.com/2020/day/1
// Research from: https://stackabuse.com/read-files-with-node-js/
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions

//asynchronous

var fs = require('fs');
const util = require('./day01_util.js');

var SUM = 2020



fs.readFile('day01/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let pair = util.findSumPair(SUM, data.split(/\r?\n/).filter(e => e != "").map(Number).sort((a, b) => a - b)); //x => parseInt(x)
    console.log(pair)
    console.log(pair.reduce((a,b) => a * b))

});

//synchronous version:

// try {
//     var data = fs.readFileSync('day01/input.txt', 'utf8');
//     findSumPair(SUM, data);
// } catch(e) {
//     console.log('Error:', e.stack);
// }

