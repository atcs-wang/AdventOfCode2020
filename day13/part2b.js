//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
const fs = require('fs');

fs.readFile('day13/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/)
    const my_timestamp = Number(instructions[0])
    const bus_ids = instructions[1].split(',')
    const factors = []
    const remainders = []
    for (let i = 0; i< bus_ids.length; i++){
        if (bus_ids[i] == 'x')
            continue;
        factors.push(Number(bus_ids[i]))
        remainders.push(i)
    }
    const max_factor = Math.max(...factors)
    const max_index = factors.indexOf(max_factor)
    let t = max_factor - remainders[max_index]
    factors.splice(max_index,1)
    remainders.splice(max_index,1)
    console.log(factors)
    console.log(remainders)
    let b = true
    let all_divisible = false

    const MIN = 100000000000000
    while (t < MIN)
        t += max_factor

    for (t =t; !all_divisible; t+= max_factor){
        all_divisible = true
        for (let i = 0; i< factors.length; i++){
            if ((t + remainders[i]) % factors[i] != 0){
                all_divisible = false
                break;
            }
        }
    }
    console.log(t)
});