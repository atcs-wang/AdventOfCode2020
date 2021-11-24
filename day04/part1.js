// https://adventofcode.com/2020/day/2

// Learning about classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

const fs = require('fs');

const REQ_FIELDS = ['byr','iyr', 'eyr','hgt','hcl','ecl','pid']

// Using the Object class definition approach
// Treat like associative dictionaries
class Passport {
    
    constructor(data_str) {
        let list = []
        data_str.split(/\r?\n/).filter(e => e != "").forEach((line) =>  {
            list.push(...line.split(' '));
        },[])
        list.forEach((str) => {
            let field_data = str.split(":");
            this[field_data[0]] = field_data[1]
        })
    }

    isValid() {
        return REQ_FIELDS.reduce((isValid,field) => isValid && this.hasOwnProperty(field), true) 
    }
}



fs.readFile('day04/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let passports = data.split(/\r?\n\r?\n/).filter(e => e != "").map(e => new Passport(e))
    console.log(passports.length)
    console.log(`Valid Passports: ${passports.filter(p => p.isValid()).length}`);

});
