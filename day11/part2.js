// https://adventofcode.com/2020/day/11

const fs = require('fs');
const {Board, NEIGHBORS} = require('./board.js');

function count_neighbors(r, c){

    return NEIGHBORS.reduce((sum, [dr,dc]) => {
        
        let nr = r+dr;
        let nc = c+dc;
        while (this.get(nr,nc) == Board.BLOCKED){
            nr += dr;
            nc += dc;
        }
        return sum + (Board.FILLED == this.get(nr, nc)? 1: 0)
        
    }, 0);
}

function update_spot(newLayout, r, c){
    const oldState = this.get(r,c);

    if(oldState == Board.EMPTY){
        newLayout[r][c] =   this.count_neighbors(r,c)  == 0 ? Board.FILLED: Board.EMPTY 
    } else if (oldState == Board.FILLED) {
        newLayout[r][c] =   this.count_neighbors(r,c)  >= 5 ? Board.EMPTY: Board.FILLED 
    } else // blocked 
        newLayout[r][c] = Board.BLOCKED

}


fs.readFile('day11/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const b = Board.fromString(data)
    b.count_neighbors = count_neighbors 
    b.update_spot = update_spot

    let last_b_str = b.toString()
    b.update()    
    while (last_b_str != b.toString()) {
        last_b_str = b.toString()
        console.log(`Generation : ${b.generation} Filled : ${b.count()}`)
        b.update()
    }
    // console.log(last_b_str)
});