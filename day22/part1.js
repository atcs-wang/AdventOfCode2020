const fs = require('fs');

const [player1_text, player2_text] = fs.readFileSync('day22/input.txt', 'utf-8').split(/\r?\n\r?\n/)
const deck1 = player1_text.split(/:\r?\n/,2)[1].split(/\r?\n/).filter(e => e != "").map(Number);
const deck2 = player2_text.split(/:\r?\n/,2)[1].split(/\r?\n/).filter(e => e != "").map(Number);
console.log(`Player 1's deck: ${deck1}`);
console.log(`Player 2's deck: ${deck2}`);
let rounds = 0
while (deck1.length != 0 && deck2.length !=0){

    rounds += 1
    console.log(`\n-- Round ${rounds} --`)
    console.log(`Player 1's deck: ${deck1}`);
    console.log(`Player 2's deck: ${deck2}`);
    const card1 = deck1.shift();
    const card2 = deck2.shift();
    console.log(`Player 1 plays: ${card1}`);
    console.log(`Player 2 plays: ${card2}`);
    
    if (card1 > card2){
        console.log('Player 1 wins the round!')
        deck1.push(card1, card2)
    }
    else{
        console.log('Player 2 wins the round!')
        deck2.push(card2, card1)
    }
}

const winners_score = 
(deck1.length > deck2.length ? deck1 : deck2).reduce(
    (pv, cv,ci, arr) => (arr.length - ci) * cv + pv 
, 0);
console.log(winners_score);