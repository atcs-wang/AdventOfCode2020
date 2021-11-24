// https://adventofcode.com/2020/day/2

// Learning about objects: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

const fs = require('fs');
const TREE = '#'

// Using the Object Constructor function approach
function Map (data_str) {
    this.map = data_str.split(/\r?\n/).filter(e => e != "").map(str => str.split(''))
    this.height = this.map.length 
    this.width = this.map[0].length
    this.has_tree = function(r,c) {
        return this.map[r][c % this.width]  == TREE
    }
}


fs.readFile('day03/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    const map = new Map(data)
    let product = 1;
    [[1,1],[3,1],[5,1],[7,1],[1,2]].forEach(a => {
        let count = 0
        let SLOPE_RIGHT = a[0]
        let SLOPE_DOWN = a[1]
        for (let r = SLOPE_DOWN, c = SLOPE_RIGHT; r < map.height; r+= SLOPE_DOWN, c+= SLOPE_RIGHT){
            
            if (map.has_tree(r,c))
                count += 1
        }
        console.log(`Right ${SLOPE_RIGHT}, down ${SLOPE_DOWN}. ${count} Trees`)
        product *= count
    });
    console.log(`Product ${product}`)

});
