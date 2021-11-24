// https://adventofcode.com/2020/day/9

// https://stackoverflow.com/questions/3422458/unpacking-array-into-separate-variables-in-javascript

const fs = require('fs');
const readline = require('readline')

// instead of reading the whole file at once, let's do one line at a time as a stream
// https://stackabuse.com/reading-a-file-line-by-line-in-node-js/

const readInterface = readline.createInterface({
    input: fs.createReadStream('day09/input.txt', 'utf8'),
    output: process.stdout
});

const historyqueue = []
let count = 0
function queue_contains_sum(sum){
    // console.log('Count: ' + count)
    for (var i = 0; i < historyqueue.length; i++) {
        for (var j = i + 2; j < historyqueue.length ; j++) {
            // console.log("\t" + (historyqueue[i] + historyqueue[j]) + " == " + sum + "?")
            if (historyqueue.slice(i,j).reduce((s,a) => s + a, 0) == sum)
                return [i,j]
        }
    }
    return undefined
}


function handler(line) {
    count += 1;
    const num = Number(line)
    // console.log(line);
    historyqueue.push(num) 
    // else{
    //     readInterface.close()
    //     readInterface.removeAllListeners()    
    // }
}

readInterface.on('line', handler);

readInterface.on('close', function() {
    let indexes = queue_contains_sum(22406676)
    let nums = historyqueue.slice(indexes[0],indexes[1])
    console.log(nums)
    let sum = Math.min(...nums) + Math.max(...nums)
    console.log(`From ${indexes} = ${nums}:  ${sum}`);


})
