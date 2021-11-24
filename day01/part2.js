var fs = require('fs');

const util = require('./day01_util.js');

var SUM = 2020



fs.readFile('day01/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    data = data.split(/\r?\n/).filter(e => e != "").map(Number).sort((a, b) => a - b)
    let nums = null;
    for (var i = 0; i < data.length; i++){
        const x = data[i]

        nums = util.findSumPair(SUM - x, data, i + 1); 
        if (nums != null){
            nums.push(x)
            break
        }
        
    }
    console.log(nums)
    console.log(nums.reduce((a,b) => a * b))

});