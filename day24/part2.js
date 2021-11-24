const fs = require('fs')

const BLACK = 1
const WHITE = 0

// hexagons - Array[Array[int]]
class HexGrid {
    constructor(){
        this._grid = Array();
        this.max_r = 0
        this.min_r = 0
        this.max_c = 0
        this.min_c = 0
    }

    get(r, c){
        if (this._grid[r] === undefined || this._grid[r][c] === undefined){
            return WHITE;
        }
        return this._grid[r][c];
    }

    set(r,c, val){
        if (this.get(r,c) === val)
            return
        if (this._grid[r] === undefined) 
            this._grid[r] = Array()
        this._grid[r][c] = val;
        if (val == BLACK){
            this.max_r = Math.max(this.max_r, r);
            this.min_r = Math.min(this.min_r, r);
            this.max_c = Math.max(this.max_c, c);
            this.min_c = Math.min(this.min_c, c);    
        }
    }

    * iterate_range(){
        for (let r = this.min_r - 1; r <= this.max_r + 1; r++){
            for (let c = this.min_c - 1; c <= this.max_c + 1; c++) {
                yield [r,c, this.get(r,c)];
            }
        }
    }
}

const DIRECTIONS = new Map([
    ['e',[0,1]],
    ['w',[0,-1]],
    ['ne',[1,0]],
    ['nw',[1,-1]],
    ['se',[-1,1]],
    ['sw',[-1,0]]
])
const DIRECTIONS_COORDS = [...DIRECTIONS.values()]
console.log(DIRECTIONS_COORDS)
const direction_regex = /[ns]*[ew]/g

function parseDirections_to_coord(dir_str){
    return dir_str.match(direction_regex).map(e => DIRECTIONS.get(e)).reduce(([r,c],[dr,dc]) => [r + dr, c + dc],[0,0]);
}

const coords = fs.readFileSync('day24/input.txt', 'utf-8').split(/\r?\n/g).filter(e=> e != "").map(parseDirections_to_coord)

let hexgrid = new HexGrid();
//initial flips
coords.forEach(([r,c]) => {
    hexgrid.set(r,c, hexgrid.get(r,c) === WHITE ? BLACK:WHITE )
})

console.log(coords.map(([r,c]) => hexgrid.get(r,c)).reduce((s,a) => s + a,0));


function countNeighbors(grid, r,c) {
    return DIRECTIONS_COORDS.map(([dr,dc]) => grid.get(r + dr, c + dc)).reduce((a,b) => a + b)
}

for (let i = 1; i <= 101; i++){
    //update rules 
    const newgrid = new HexGrid();
    let sum = 0;
    for (const [r,c, val] of hexgrid.iterate_range()){
        // console.log([r,c,val]);
        const neighbors = countNeighbors(hexgrid, r,c);
        const newval = (val === BLACK) ? ((neighbors === 0 || neighbors > 2) ? WHITE: BLACK) : (neighbors === 2 ? BLACK : WHITE);
        newgrid.set(r,c, newval);
        sum += newval;
    } 
    console.log(`Day ${i}: ${sum}`);

    hexgrid = newgrid;
}
