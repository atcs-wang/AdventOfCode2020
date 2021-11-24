//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some

const fs = require('fs');

fs.readFile('day13/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/)
    const my_timestamp = Number(instructions[0])
    const bus_ids = instructions[1].split(',').filter(e => e != 'x')
    
    let my_bus = undefined
    let t = my_timestamp
    for (t = my_timestamp; my_bus == undefined; t++){
        for (const bus of bus_ids){
            if (t % bus == 0){
                my_bus = bus
                break;
            }
        } 
    }
    const in_time = (--t) - my_timestamp
    console.log(`Take bus ${my_bus} in ${ in_time}`);
    console.log(my_bus * in_time)
});