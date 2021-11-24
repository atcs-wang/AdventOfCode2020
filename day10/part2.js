// https://adventofcode.com/2020/day/10

// RecursioN! Memoization!

const { countReset } = require('console');
const fs = require('fs');



fs.readFile('day10/input.txt', 'utf8', function(err, data) {
    const adapters = new Set(data.split(/\r?\n/).filter(e => e != "").map(e => Number(e)))
    const goal = Math.max(...adapters)
    adapters.add(0)
    console.log(adapters)
    console.log(goal)
    const counts = new Map()

    const lenience = [1,2,3]
    function count_paths(start) {
        if (start == goal) return 1;
        if (!adapters.has(start)) return 0;
        if (counts.has(start))
            return counts.get(start)
        const count = lenience.reduce((s,b) => s + count_paths(start + b) , 0)
        counts.set(start, count)
        return count
    }
    console.log(counts)
    console.log(count_paths(0))
});
