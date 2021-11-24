//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
//https://en.wikipedia.org/wiki/Chinese_remainder_theorem

const fs = require('fs');

fs.readFile('day13/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/)
    const my_timestamp = Number(instructions[0])
    const bus_ids = instructions[1].split(',')
    const factors_remainders = []
    for (let i = 0; i< bus_ids.length; i++){
        if (bus_ids[i] == 'x')
            continue;
            const factor = Number(bus_ids[i])
            console.log(`Factor ${factor} offset ${i} remainder ${(factor * i - i) % factor}`)
            factors_remainders.push([factor, (factor * i - i) % factor ])
    }
    factors_remainders.sort((a,b) => b[0] - a[0])
    console.log(factors_remainders)
    
    //sieve!

    const answer = factors_remainders.reduce(([f_a, r_a],[f_b, r_b]) => {
        let x = r_a;
        while ( x % f_b != r_b)
            x += f_a
        return [f_a * f_b, x]
    })

    console.log(answer[1])

    // for (t =t; !all_divisible; t+= max_factor){
    //     all_divisible = true
    //     for (let i = 0; i< factors.length; i++){
    //         if ((t + remainders[i]) % factors[i] != 0){
    //             all_divisible = false
    //             break;
    //         }
    //     }
    // }
    // console.log(t)
});