const fs = require('fs')

const ON = 1
const OFF = 0

class HyperCubeGrid {
    constructor(){
        this._grid = Array();
        this.max_x = 0
        this.min_x = 0
        this.max_y = 0
        this.min_y = 0
        this.max_z = 0
        this.min_z = 0
        this.max_w = 0
        this.min_w = 0
    }

    get(x, y, z, w){
        if (this._grid[x] === undefined || this._grid[x][y] === undefined || this._grid[x][y][z] === undefined || this._grid[x][y][z][w] === undefined){
            return OFF;
        }
        return this._grid[x][y][z][w];
    }

    set(x,y,z,w,val){
        if (this.get(x,y,z,w) === val)
            return
        if (this._grid[x] === undefined) 
            this._grid[x] = Array()
        if (this._grid[x][y] === undefined) 
            this._grid[x][y] = Array()
        if (this._grid[x][y][z] === undefined) 
            this._grid[x][y][z] = Array()
        this._grid[x][y][z][w] = val;
        if (val == ON){
            this.max_x = Math.max(this.max_x, x);
            this.min_x = Math.min(this.min_x, x);
            this.max_y = Math.max(this.max_y, y);
            this.min_y = Math.min(this.min_y, y);
            this.max_z = Math.max(this.max_z, z);
            this.min_z = Math.min(this.min_z, z);
            this.max_w = Math.max(this.max_w, w);
            this.min_w = Math.min(this.min_w, w);
        }
    }

    * iterate_range(){
        for (let x = this.min_x - 1; x <= this.max_x + 1; x++){
            for (let y = this.min_y - 1; y <= this.max_y + 1; y++) {
                for (let z = this.min_z - 1; z <= this.max_z + 1; z++) {
                    for (let w = this.min_w - 1; w <= this.max_w + 1; w++) {
                        yield [x,y,z,w];
                    }
                }
            }
        }
    }

    
    static fromString(data_str) {
        const data = data_str.split(/\r?\n/).filter(e => e != "").map(e => e.split(''))
        console.log(data)
        const newBoard = new HyperCubeGrid();
        for (var r = 0; r < data.length; r++){
            for (var c = 0; c < data[r].length; c++){
                newBoard.set(r,c,0,0, data[r][c] == '#' ? ON : OFF)
            }
        }
        return newBoard
    }

    print(){
        for (let w = this.min_w ; w <= this.max_w; w++) {
            for (let z = this.min_z ; z <= this.max_z; z++) {
                console.log(`z=${z}, w=${w}`);
                for (let x = this.min_x; x <= this.max_x ; x++){
                    let s = ""
                    for (let y = this.min_y ; y <= this.max_y ; y++) {
                        s += this.get(x,y,z,w) == ON ? '#':'.';
                    }
                    console.log(s);
                }    
            }
        }

    }

}

const NEIGHBORS = []
for (let x = -1; x <=  1; x++){
    for (let y = -1; y <=  1; y++) {
        for (let z = -1; z <=  1; z++) {
            for (let w = -1; w <= 1; w++) {
                if (x != 0 || y != 0 || z != 0 || w != 0)
                    NEIGHBORS.push([x,y,z,w]);
            }
        }
    }
}

console.log(NEIGHBORS.length)

let cubegrid = HyperCubeGrid.fromString(fs.readFileSync('day17/input.txt', 'utf-8'));

function countNeighbors(grid, x,y,z,w) {
    return NEIGHBORS.map(([dx,dy,dz,dw]) => grid.get(x + dx, y + dy, z + dz, w + dw)).reduce((a,b) => a + b)
}

cubegrid.print()
for (let i = 1; i <= 6; i++){
    //update rules 
    const newgrid = new HyperCubeGrid();
    let sum = 0;
    for (const [x,y,z,w] of cubegrid.iterate_range()){
        // console.log([x,y,val]);
        const neighbors = countNeighbors(cubegrid, x,y,z,w);
        const val = cubegrid.get(x,y,z,w);
        const newval = (val === ON) ? ((neighbors === 2 || neighbors === 3) ? ON: OFF) : (neighbors === 3 ? ON : OFF);
        newgrid.set(x,y,z,w,newval);
        sum += newval;
    } 
    console.log(`Day ${i}: ${sum}`);

    cubegrid = newgrid;
    // cubegrid.print()
}
