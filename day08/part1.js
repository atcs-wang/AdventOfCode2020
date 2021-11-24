// https://adventofcode.com/2020/day/8

// https://stackoverflow.com/questions/3422458/unpacking-array-into-separate-variables-in-javascript

const fs = require('fs');



class Instruction {

    constructor(data_str) {
        let data_list = data_str.split(' ', 2)
        this.operation = data_list[0];
        this.argument = Number(data_list[1])
        this.hasRun = false 
    }

    run(registers) {
        this.hasRun = true
        if (this.operation == 'jmp'){
            registers.pc += this.argument;
        }
        else if (this.operation == 'acc') {
            registers.accumulator += this.argument;
            registers.pc++;
        }
        else if (this.operation == 'nop'){
            registers.pc++;
        }
    }

}

class Registers {
    constructor(){
        this.pc = 0
        this.accumulator = 0
    }

    toString(){
        return `Acc: ${this.accumulator} | PC: ${this.pc}`
    }
}


fs.readFile('day08/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/).filter(e => e != "").map(e => new Instruction(e))
    console.log(instructions)
    let registers = new Registers()

    while (!instructions[registers.pc].hasRun){
        instructions[registers.pc].run(registers)
    }

    console.log(`Registers at end: ${registers}`);

});
