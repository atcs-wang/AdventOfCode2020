// https://adventofcode.com/2020/day/14
// https://www.w3schools.com/js/js_bitwise.asp

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach
//https://stackoverflow.com/questions/6798111/bitwise-operations-on-32-bit-unsigned-ints

const fs = require('fs');
const BITS = 32
class Mask {
    constructor(mask_str = "") {
        this.__AND = Number.parseInt(mask_str.replace(/X/g,'1'),2) //>>> 0 //makes sure the 0s happen
        this.__OR = Number.parseInt(mask_str.replace(/X/g,'0'),2) //>>> 0 //makes sure the 1s happen
    }

    apply(num) {
        return (((num & this.__AND) >>> 0) | this.__OR )>>> 0
    }
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
            mem.set(Number.parseInt(addr_val[1], 10), mask.apply(Number.parseInt(addr_val[2], 10)))
        }

    });
    // console.log(mem)
    let sum = 0;
    mem.forEach((value) => {
        sum += value
    });
    console.log(sum)
});

