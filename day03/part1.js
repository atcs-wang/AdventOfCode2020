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
    let count = 0
    for (let i = 1; i < map.height; i++){
        if (map.has_tree(i, i * 3))
            count += 1
    }
    console.log(count)

});
