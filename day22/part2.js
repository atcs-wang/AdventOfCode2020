const fs = require('fs');

const [player1_text, player2_text] = fs.readFileSync('day22/input.txt', 'utf-8').split(/\r?\n\r?\n/)
const deck1 = player1_text.split(/:\r?\n/,2)[1].split(/\r?\n/).filter(e => e != "").map(Number);
const deck2 = player2_text.split(/:\r?\n/,2)[1].split(/\r?\n/).filter(e => e != "").map(Number);
//console.log(`Player 1's deck: ${deck1}`);
//console.log(`Player 2's deck: ${deck2}`);

let game_numbers = 1

function record(deck1, deck2){
    return deck1.join(",") + "-" + deck2.join(",")
}

/* return winner */
function play_game(deck1, deck2, this_game_number = game_numbers){
    const old_rounds = new Set()
    let rounds = 0
    while (deck1.length != 0 && deck2.length !=0){
        //console.log(`\n-- Round ${rounds} (Game ${this_game_number}) --`)
        //console.log(`Player 1's deck: ${deck1}`);
        //console.log(`Player 2's deck: ${deck2}`);

        const this_round = record(deck1, deck2)
        if (old_rounds.has(this_round)){
            //console.log(`Repeated round - Player 1 wins by default`);

            return 1;
        }
        old_rounds.add(this_round)

        rounds += 1

        const card1 = deck1.shift();
        const card2 = deck2.shift();
        //console.log(`Player 1 plays: ${card1}`);
        //console.log(`Player 2 plays: ${card2}`);
        

        if (deck1.length >= card1 && deck2.length >= card2){
            //console.log("Playing a sub-game to determine the winner...")
            game_numbers += 1
            const sub_game_winner = play_game(deck1.slice(0,card1),deck2.slice(0,card2));
            //console.log(`...anyway, back to game ${this_game_number}.`)
            if (sub_game_winner == 1){
                //console.log(`Player 1 wins round ${rounds} of game ${this_game_number}!`)
                deck1.push(card1, card2)
            }else {
                //console.log(`Player 2 wins round ${rounds} of game ${this_game_number}!`)
                deck2.push(card2, card1)
            }

        } else {
            if (card1 > card2){
                //console.log(`Player 1 wins round ${rounds} of game ${this_game_number}!`)
                deck1.push(card1, card2)
            }
            else {
                //console.log(`Player 2 wins round ${rounds} of game ${this_game_number}!`)
                deck2.push(card2, card1)
            }
    
        }
    }
    //console.log(`The winner of game ${this_game_number} is player ${(deck1.length > deck2.length ? 1 : 2)}!`)
    return (deck1.length > deck2.length) ? 1: 2; 
}



const winners_score = 
(play_game(deck1, deck2) == 1 ? deck1 : deck2).reduce(
    (pv, cv,ci, arr) => (arr.length - ci) * cv + pv 
, 0);
console.log(winners_score);