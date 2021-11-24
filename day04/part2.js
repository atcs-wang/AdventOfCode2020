// https://adventofcode.com/2020/day/2

// Learning about classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// Learning about regexes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

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

    allRequiredPresent() {
        return REQ_FIELDS.reduce((isValid,field) => isValid && this.hasOwnProperty(field), true) 
    }
    allRequiredValid() {
        
        if (!( 
            /^\d{4}$/.test(this.byr) && /^\d{4}$/.test(this.iyr) && /^\d{4}$/.test(this.eyr) &&
            (Number(this.byr) >= 1920 &&  Number(this.byr) <= 2002) &&
            (Number(this.iyr) >= 2010 &&  Number(this.iyr) <= 2020) &&
            (Number(this.eyr) >= 2020 &&  Number(this.eyr) <= 2030) 
        ))
            return false;
        
        if (!/^\d{2,}(?:in)|(?:cm)$/.test(this.hgt))
            return false;

        const hgt_tag = this.hgt.slice(-2) 
        const hgt_num = Number(this.hgt.slice(0,-2))
        if (hgt_tag == "cm"){
            if (! (hgt_num >= 150 && hgt_num <= 193))
                return false  
        }else if (hgt_tag == "in"){
            if (! (hgt_num >= 59 && hgt_num <= 76))
                return false 
        }else 
            return false
        
        if (!/^\#[0-9a-f]{6}$/.test(this.hcl))
            return false
        
        if (!['amb','blu','brn','gry', 'grn', 'hzl', 'oth'].includes(this.ecl))
            return false
        
        if (!/^\d{9}$/.test(this.pid))
            return false
        
        return true
    }
}



fs.readFile('day04/input.txt', 'utf8', function(err, data) {
    if (err) throw err;
    let passports = data.split(/\r?\n\r?\n/).filter(e => e != "").map(e => new Passport(e))
    console.log(passports.length)
    let valid = passports.filter(p => p.allRequiredPresent() && p.allRequiredValid())
    console.log(`Valid Passports: ${valid.length}`);

});
