const NEIGHBORS = [ [-1,-1],[-1,0],[-1,1],
                    [ 0,-1],       [ 0,1],
                    [ 1,-1],[ 1,0],[ 1,1]]


class Board {

    generation = 0;

    static EMPTY = 'L';
    static FILLED = '#';
    static BLOCKED = '.'; 
    static VALID_FILLS = new Set([Board.EMPTY, Board.FILLED, Board.BLOCKED])

    constructor (rows, columns) {
        this.columns = columns
        this.rows = rows
        this.layout = Array(rows).fill().map(e => Array(columns).fill(Board.EMPTY))
    }

    static fromString(data_str) {
        const data = data_str.split(/\r?\n/).filter(e => e != "").map(e => e.split(''))
        
        const newBoard = new Board(data.length, data[0].length)
        for (var r = 0; r < newBoard.rows; r++){
            for (var c = 0; c < newBoard.columns; c++){
                newBoard.set(r,c,data[r][c])
            }
        }
        return newBoard
    }

    set(r, c, fill) {
        // assert (Board.VALID_FILLS.has(fill))
        if (this.layout[r] != undefined)
            this.layout[r][c] = fill
    }

    get(r,c){
        if (this.layout[r] == undefined)
            return undefined
        return this.layout[r][c]
    }

    update(){

        const newLayout = Array(this.rows).fill().map(e => Array(this.columns).fill(Board.EMPTY))

        // custom rules later.
        for (var r = 0; r < this.rows; r++){
            for (var c = 0; c < this.columns; c++){
                this.update_spot(newLayout, r,c)
            }
        }
        this.layout = newLayout
        this.generation++;
    }


    toString(){
        return this.layout.map(e => e.join('') ).join('\n')
    }

    count(fill = Board.FILLED){
        return this.layout.reduce((sum, row) => sum + row.reduce((s,e) => s + (e == fill ? 1 : 0), 0),0)
    }

        
    count_neighbors(r, c){
        return NEIGHBORS.reduce((sum, [dr,dc]) => sum + (Board.FILLED == this.get(r+dr,c+dc) ? 1: 0), 0);
    }

    update_spot(newLayout, r, c){
        const oldState = this.get(r,c);

        if(oldState == Board.EMPTY){
            newLayout[r][c] =   this.count_neighbors(r,c)  == 0 ? Board.FILLED: Board.EMPTY 
        } else if (oldState == Board.FILLED) {
            newLayout[r][c] =   this.count_neighbors(r,c)  >= 4 ? Board.EMPTY: Board.FILLED 
        } else // blocked 
            newLayout[r][c] = Board.BLOCKED

    }
}

module.exports = {
    Board: Board,
    NEIGHBORS: NEIGHBORS
 }