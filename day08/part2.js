// https://adventofcode.com/2020/day/8

// Learning about "cloning" objects
// https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
// However, most of the above cloning methods don't work well with the EC6 class notation, as instance methods are not enumerable, and therefore 
// are not copied by quick-and-dirty cloning techniques. Instead, needed to make clone() methods.
// More cloning thoughts: https://stackoverflow.com/questions/728360/how-do-i-correctly-clone-a-javascript-object

const fs = require('fs');

//Used a queue-based DFS approach.
// Seems many others did recursive search
// Others bruteforce and checked it.

class Instruction {

    constructor(data_str) {
        let data_list = data_str.split(' ', 2)
        this.operation = data_list[0];
        this.argument = Number(data_list[1])
    }

    clone(){
        return new Instruction(`${this.operation} ${this.argument}`)
    }

}

//moved out of Instruction becase of early cloning issues, but actually, could be moved back now.
function run(instruction, registers) {
    if (instruction.operation == 'jmp'){
        registers.pc += instruction.argument;
    }
    else if (instruction.operation == 'acc') {
        registers.accumulator += instruction.argument;
        registers.pc++;
    }
    else if (instruction.operation == 'nop'){
        registers.pc++;
    }
    return registers
}


class Registers {
    constructor(pc = 0, acc = 0){
        this.pc = pc
        this.accumulator = acc
    }

    toString(){
        return `Acc: ${this.accumulator} | PC: ${this.pc}`
    }

    clone(){
        return new Registers(this.pc,this.accumulator);
    }
    
}

class SearchPath {
    constructor(registers = new Registers(), past_indexes = new Set(), hasEdited = false) {
        this.past_indexes = past_indexes
        this.registers = registers
        this.hasEdited = hasEdited
    }

    isTerminal(instructions){
        return this.registers.pc == instructions.length
    }

    toString() {
        return `${this.hasEdited}\n${this.registers}\n${this.instructions}`
    }

    getExtensions(instructions){
        let extensions = []
        //is dead end? Loops on self.
        if (! this.past_indexes.has(this.registers.pc)){
            const this_instruction = instructions[this.registers.pc]
            const new_past_indexes = new Set(this.past_indexes).add(this.registers.pc)

            // Result from executing the current command
            extensions.push(new SearchPath(run(this_instruction, this.registers.clone()), new_past_indexes, this.hasEdited)) 

            // if not yet tried editing:
            if (! this.hasEdited && this_instruction.operation != 'acc'){
                // If nop or jump, try result from editing 
                const altered_instruction = this_instruction.clone();
                console.log(altered_instruction)
                if (this_instruction.operation == 'nop'){
                    altered_instruction.operation = 'jmp';
                }
                else if (this_instruction.operation == 'jmp'){
                    altered_instruction.operation = 'nop';
                }
                extensions.push(new SearchPath(run(altered_instruction,this.registers.clone()), new_past_indexes, true)) 
            }
        }  
        // console.log(extensions)

        return extensions
    }
}

function DFS(path, instructions){
    const queue = [path]
    
    while (queue.length > 0) {
        const extend = queue.pop()
        // console.log(extend)
        if (extend.isTerminal(instructions))
            return extend
        queue.push(...extend.getExtensions(instructions)) 
    }
    return undefined
}

fs.readFile('day08/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/).filter(e => e != "").map(e => new Instruction(e))
    // console.log(instructions)
    let registers = new Registers()

    console.log(`Path : ${DFS(new SearchPath, instructions)}`);

});
