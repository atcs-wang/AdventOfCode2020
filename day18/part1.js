const ep = require('./expression_parser.js')
const fs = require('fs')
console.log(fs.readFileSync("day18/input.txt", 'utf8').split(/\r?\n/).filter(e => e != "").map(line => ep.evaluate_math(line)).reduce((a,b) => a + b)); 
