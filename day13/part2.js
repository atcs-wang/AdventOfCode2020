//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
const fs = require('fs');

fs.readFile('day13/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/)
    const my_timestamp = Number(instructions[0])
    const bus_ids = instructions[1].split(',')
    
    let t = 100000000000000
    for (t = t; ! ((tt) => bus_ids.every(b => 
         (b == 'x' || (tt % Number(b) == 0)) && (tt++ >= 0)
    ))(t); t++){
    }

    console.log(t)
});