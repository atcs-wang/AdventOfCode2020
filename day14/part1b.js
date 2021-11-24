// https://adventofcode.com/2020/day/14
// https://www.w3schools.com/js/js_bitwise.asp

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
//https://stackoverflow.com/questions/6798111/bitwise-operations-on-32-bit-unsigned-ints

// Learned JS doesn't properly handle 64-bit integers, especially with bitwise ops
// Gonna have to do it "by hand"!

const fs = require('fs');
const BITS = 32
class Mask {
    constructor(mask_str = "") {
        console.assert(mask_str.length == 36)
        this.mask_str = mask_str
    }

    apply(num) {
        const num_str = num.toString(2).padStart(36, '0')
        let new_num_str = ""
        for (var i = 0; i < 36; i++){
            if (this.mask_str[i] == '0' || this.mask_str[i] == '1') 
                new_num_str += this.mask_str[i];
            else // this.mask_str[i] == 'X'
                new_num_str += num_str[i]
        }
        return new_num_str
    }
}

function addBinaryStrings(a = "",b = ""){
    //split into 2 30-bit strings
    a = a.padStart(60,'0')
    b = b.padStart(60,'0')
    const a_upper = Number.parseInt(a.slice(0,30),2)
    const a_lower = Number.parseInt(a.slice(30,60),2)
    const b_upper = Number.parseInt(b.slice(0,30),2)
    const b_lower = Number.parseInt(b.slice(30,60),2)
    let lower_sum = (a_lower + b_lower).toString(2) 
    let carry = 0
    if (lower_sum.length > 30){
        lower_sum = lower_sum.slice(-30)
        carry = 1
    }
    return (a_upper + b_upper + carry).toString(2) + lower_sum.padStart(30,'0')
}

fs.readFile('day14/input.txt', 'utf8', function(err, data) {
       if (err) throw err;
    let instructions = data.split(/\r?\n/)

    let mask = new Mask("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    let mem = new Map()
    instructions.forEach(i =>{
        if (i.startsWith('mask')) {
            let [_, bits] = i.split(' = ')
            mask = new Mask(bits);
            console.log(mask)
        } else if (i.startsWith('mem')) {
            const addr_val = /^mem\[(\d+)\] = (\d+)$/.exec(i)
            mem.set(addr_val[1], mask.apply(Number.parseInt(addr_val[2], 10)))
        }

    });
    console.log(mem)
    let sum = "0".repeat(36);
    mem.forEach((value) => {
        sum = addBinaryStrings(sum, value)
    });
    console.log(sum)
});

