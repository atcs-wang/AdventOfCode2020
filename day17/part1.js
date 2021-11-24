const fs = require('fs')

const ON = 1
const OFF = 0

// hexagons - Array[Array[int]]
class CubeGrid {
    constructor(){
        this._grid = Array();
        this.max_x = 0
        this.min_x = 0
        this.max_y = 0
        this.min_y = 0
        this.max_z = 0
        this.min_z = 0
    }

    get(x, y, z){
        if (this._grid[x] === undefined || this._grid[x][y] === undefined || this._grid[x][y][z] === undefined){
            return OFF;
        }
        return this._grid[x][y][z];
    }

    set(x,y,z,val){
        if (this.get(x,y,z) === val)
            return
        if (val === ON){
            if (this._grid[x] === undefined) 
                this._grid[x] = Array()
            if (this._grid[x][y] === undefined) 
                this._grid[x][y] = Array()

            this.max_x = Math.max(this.max_x, x);
            this.min_x = Math.min(this.min_x, x);
            this.max_y = Math.max(this.max_y, y);
            this.min_y = Math.min(this.min_y, y);
            this.max_z = Math.max(this.max_z, z);
            this.min_z = Math.min(this.min_z, z);
        }
        this._grid[x][y][z] = val;

    }

    * iterate_range(){
        for (let x = this.min_x - 1; x <= this.max_x + 1; x++){
            for (let y = this.min_y - 1; y <= this.max_y + 1; y++) {
                for (let z = this.min_z - 1; z <= this.max_z + 1; z++) {
                    yield [x,y,z];
                }
            }
        }
    }

    
    static fromString(data_str) {
        const data = data_str.split(/\r?\n/).filter(e => e != "").map(e => e.split(''))
        console.log(data)
        const newBoard = new CubeGrid();
        for (var r = 0; r < data.length; r++){
            for (var c = 0; c < data[r].length; c++){
                newBoard.set(r,c,0, (data[r][c] == '#') ? ON : OFF)
            }
        }
        return newBoard
    }

    print(){
        for (let z = this.min_z ; z <= this.max_z; z++) {
            console.log(`z=${z}`);
            for (let x = this.min_x; x <= this.max_x ; x++){
                let s = ""
                for (let y = this.min_y ; y <= this.max_y ; y++) {
                    s += this.get(x,y,z) == ON ? '#':'.';
                }
                console.log(s);
            }    
        }

    }

}

const NEIGHBORS = []
for (let x = -1; x <=  1; x++){
    for (let y = -1; y <=  1; y++) {
        for (let z = -1; z <=  1; z++) {
            if (x != 0 || y != 0 || z != 0)
                NEIGHBORS.push([x,y,z]);
        }
    }
}


// const NEIGHBORS = [
//     [-1,-1,-1],[-1,0,-1],[-1,1,-1],
//     [ 0,-1,-1],[ 0,0,-1],[ 0,1,-1],
//     [ 1,-1,-1],[ 1,0,-1],[ 1,1,-1],
//     [-1,-1,0],[-1,0,0],[-1,1,0],
//     [ 0,-1,0],         [ 0,1,0],
//     [ 1,-1,0],[ 1,0,0],[ 1,1,0],
//     [-1,-1,1],[-1,0,1],[-1,1,1],
//     [ 0,-1,1],[ 0,0,1],[ 0,1,1],
//     [ 1,-1,1],[ 1,0,1],[ 1,1,1]
// ]
console.log(NEIGHBORS)

let cubegrid = CubeGrid.fromString(fs.readFileSync('day17/sampleinput.txt', 'utf-8'));


function countNeighbors(grid, x,y,z) {
    return NEIGHBORS.map(([dx,dy,dz]) => grid.get(x + dx, y + dy, z + dz)).reduce((a,b) => a + b)
}
cubegrid.print()
for (let i = 1; i <= 6; i++){
    //update rules 
    const newgrid = new CubeGrid();
    let sum = 0;
    for (const [x,y,z] of cubegrid.iterate_range()){
        // console.log([x,y,val]);
        const neighbors = countNeighbors(cubegrid, x,y,z);
        const val = cubegrid.get(x,y,z);
        const newval = (val === ON) ? ((neighbors === 2 || neighbors === 3) ? ON: OFF) : (neighbors === 3 ? ON : OFF);
        newgrid.set(x,y,z,newval);
        sum += newval;
    } 
    console.log(`Day ${i}: ${sum}`);

    cubegrid = newgrid;
    cubegrid.print()
}
