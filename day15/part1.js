const { setFlagsFromString } = require("v8")
const starting_nums = [7,14,0,17,11,1,2]
//
const num_lastTurn = new Map()

//handle first starting_nums.length turns
for (let turn = 1; turn < starting_nums.length; turn++ ){
    // console.log(`Turn ${turn}: ${starting_nums[turn-1]}`)
    num_lastTurn.set(starting_nums[turn-1],turn)
}

let last_num_said = starting_nums[starting_nums.length -1];

for (let turn = starting_nums.length + 1; turn <= 30000000; turn++){
    // console.log(`Turn ${turn -1}: ${last_num_said}`)
    //establish what to say this turn
    let this_turn_said = 0
    if (num_lastTurn.has(last_num_said)) { // last said wasn't new
        this_turn_said = turn - 1 - num_lastTurn.get(last_num_said) 
    } else { // last said was new 
        this_turn_said = 0
    }
    //record last turn's result
    num_lastTurn.set(last_num_said, turn - 1)
    last_num_said = this_turn_said
}

console.log(last_num_said)
