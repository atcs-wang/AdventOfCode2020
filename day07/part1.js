// https://adventofcode.com/2020/day/7

// https://stackoverflow.com/questions/3422458/unpacking-array-into-separate-variables-in-javascript

const fs = require('fs');



class Bag {
    static bagTypes = new Map()

    constructor(data_str) {
        console.log(data_str)
        let data_list = data_str.slice(0, -1).replace(/ bags*/g,'').split(' contain ', 2)
        console.log(data_list)        
        this.bagType = data_list[0];
        Bag.bagTypes.set(this.bagType, this)

        this.carryableBagTypes = [];
        this.carryableBagCounts = [];
        if (data_list[1] != 'no other')
            data_list[1].split(", ").forEach(element => {
                let c = element.split(' ', 1)
                this.carryableBagCounts.push(Number(c))
                this.carryableBagTypes.push(element.slice(c.length + 1))            
            });        
    }

    contains(bagType) {
        // console.log(`Does ${this.bagType} contain ${bagType}`)
        // console.log(this.carryableBagTypes)

        if (this.carryableBagTypes.includes(bagType))
            return true;
        
        return this.carryableBagTypes.reduce((cancarry, b) => cancarry || Bag.bagTypes.get(b).contains(bagType), false) 
    }

}



fs.readFile('day07/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    data.split(/\r?\n/).filter(e => e != "").forEach(e => new Bag(e))

    console.log(Bag.bagTypes)
    let containingBags = Array.from(Bag.bagTypes.values()).filter(b => b.contains('shiny gold'))
    console.log(`Number of holders: ${containingBags.length}`);

});
