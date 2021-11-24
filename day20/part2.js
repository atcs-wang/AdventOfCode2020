const { timeLog } = require('console');
const fs = require('fs');

const BLACK = '#' 
const WHITE = '.'

//orientations
const UP = 0
const DOWN = 1 //flipped around the x = y axis
const ORIENTATIONS = [UP, DOWN]
//rotations (ccwise)
const DEG_0 = 0
const DEG_90 = 1
const DEG_180 = 2
const DEG_270 = 3
const ROTATIONS = [DEG_0, DEG_90, DEG_180, DEG_270]
//sides
const LEFT = 0
const TOP = 1
const RIGHT = 2
const BOTTOM = 3

class Tile{
    constructor(str){
        const str_list = str.split(/\r?\n/)
        this.id = Number(/Tile (\d+):/.exec(str_list[0])[1]);
        let cwise_sides = [[],[],[],[]]
        const n = str_list.length - 1
        for (let i = 0; i < n; i++){
            cwise_sides[0].push(str_list[n-i][0]) // left
            cwise_sides[1].push(str_list[1][i]) // top
            cwise_sides[2].push(str_list[i+1][n-1]) // right
            cwise_sides[3].push(str_list[n][n-1-i]) // bottom
        }

        //convert sides to simple numbers NVM
        // cwise_sides = cwise_sides.map( l => l.map(e => e == BLACK ? '1':'0'))
        let ccwise_sides = cwise_sides.map(l => l.slice().reverse()).reverse()
        // cwise_sides = cwise_sides.map(l => Number.parseInt(l.join(''),2))
        // ccwise_sides = ccwise_sides.map(l => Number.parseInt(l.join(''),2))
        cwise_sides = cwise_sides.map(l => l.join(''))
        ccwise_sides = ccwise_sides.map(l => l.join(''))
        this._sides = [cwise_sides, ccwise_sides]
    }

    get_side(side, rotation = DEG_0, orientation = UP){
        return this._sides[orientation][(rotation + side) % 4]
    }

    get_reversed_side(side, rotation = DEG_0, orientation = UP){
        return this._sides[orientation === UP ? DOWN : UP][3 - (rotation + side) % 4]
    }
}
class Placed_Tile {
    constructor (tile, rotation, orientation) {
        console.assert(ROTATIONS.includes(rotation), "invalid rotation")
        console.assert(ORIENTATIONS.includes(orientation), "invalid orientation")
        this.tile = tile;
        this.rotation = rotation;
        this.orientation = orientation;
    }

    get_side(side){
        return this.tile.get_side(side,this.rotation,this.orientation)
    }

    get_reversed_side(side){
        return this.tile.get_reversed_side(side,this.rotation,this.orientation)
    }

    toString(){
        return (`\t${this.tile.id}: o${this.orientation} r${this.rotation} (${this.get_side(LEFT)} ${this.get_side(TOP)} ${this.get_side(RIGHT)} ${this.get_side(BOTTOM)})\n`);
    }
}



const tiles = fs.readFileSync("day20/input.txt", "utf-8").split(/\r?\n\r?\n/).map(e => new Tile(e));
// console.log(tiles)
const dimension = Math.sqrt(tiles.length) 


function get_all_unplaced_tiles(placed_tiles = []){
    return tiles.filter( tile => placed_tiles.every(pt => pt.tile !== tile));
}

// const placed_tiles = []
// const unused_tiles = new Set(tiles)

function try_place_next_tile(placed_tiles = []) {
    const n = placed_tiles.length 
    //return full placed_tiles if successful
    if (n == tiles.length)
        return placed_tiles;

    // attempt to place another tile from unused_tiles


    //try all remaining tiles in every orientation and rotation for the next spot
    for (let tile of get_all_unplaced_tiles(placed_tiles)){
        for (let orientation of ORIENTATIONS){
            for (let rotation of ROTATIONS) {
                //Check to see if tile fits
                const pt = new Placed_Tile(tile, rotation, orientation);
                
                //check (failed) match with left 
                if (!(n % dimension == 0 || pt.get_side(LEFT) == placed_tiles[n-1].get_reversed_side(RIGHT)))
                    continue; 
                //check match with above
                if (! (n < dimension || pt.get_side(TOP) == placed_tiles[n - dimension].get_reversed_side(BOTTOM)) )
                    continue;
                // match! Try continuing
                placed_tiles.push(pt)
                // console.log(`${placed_tiles}`)
                // try next tile 
                const result = try_place_next_tile(placed_tiles);
                // successful result found? Yay!
                if (result !== undefined)
                    return result
                // didn't work, remove tile and try next
                placed_tiles.pop()
                
            }
        }
    }

    //if all options exhausted and no result found, return undefined (failed configuration)
    return undefined
}


const solution = try_place_next_tile()

console.log(solution)
console.log(solution[0].tile.id * solution[dimension - 1].tile.id * solution[dimension *(dimension - 1)].tile.id * solution[dimension * dimension - 1].tile.id)