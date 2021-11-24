// https://adventofcode.com/2020/day/8

// https://stackoverflow.com/questions/3422458/unpacking-array-into-separate-variables-in-javascript

const fs = require('fs');

const DIRECTIONS = ['E', 'N', 'W', 'S']

class Instruction {

    constructor(data_str) {
        this.operation = data_str.substring(0,1);
        this.argument = Number(data_str.substring(1))
    }

    run(ship) {
        let op = this.operation
        let arg = this.argument
        if (op == 'F') {
            for (var i =0 ; i < arg; i++){
                ship.north += ship.wp_north
                ship.east += ship.wp_east    
            }
        }
        if ( op == 'N'){
            ship.wp_north += arg;
        } else if (op == 'S'){
            ship.wp_north -= arg;
        } else if (op == 'E'){
            ship.wp_east += arg;
        } else if (op == 'W'){
            ship.wp_east -= arg;
        } else {
            if (op == 'R'){
                op = 'L'
                arg = 360 - arg
            } 
            if (op == 'L'){
                const l_turns = (arg / 90) % DIRECTIONS.length
                for (var i= 0; i < l_turns; i++){
                    const wp_north = ship.wp_north 
                    ship.wp_north = ship.wp_east
                    ship.wp_east = -wp_north 
                }
            }
        }

    }

}

class Ship {
    constructor(){
        this.north = 0
        this.east = 0

        this.wp_north = 1
        this.wp_east = 10
    }

    toString(){
        return `Facing ${this.direction}| North ${this.north} | East: ${this.east}`
    }
}


fs.readFile('day12/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let instructions = data.split(/\r?\n/).filter(e => e != "").map(e => new Instruction(e))
    console.log(instructions)
    let ship = new Ship()

    instructions.forEach(i => i.run(ship))

    console.log(`Ship at end: ${ship}`);
    console.log(`Manhattan: ${Math.abs(ship.north) + Math.abs(ship.east)}`)
});
