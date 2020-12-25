class TicTacToe {
    constructor() {
        this.inProgress = true;
        this.winner = null;
        this.currentTurn = TicTacToe.O;
        this.MovesMade = 0;
        this.totalWinsForO = 0;
        this.totalWinsForX = 0;
        this.cells = new Array(9).fill().map(x => new Cell());
        this.aiAvaliableMoves = new Array();

        // make a move to a user or ai
        this.makeMove = function(i) {
            if (this.inProgress && !this.cells[i].value) {
                this.cells[i].value = this.currentTurn;
                this.MovesMade++;
                this.checkForWinner();
                //if its the current turn for X its means it ai turn and calling the function
                this.currentTurn = (this.currentTurn === TicTacToe.O) ? TicTacToe.X : TicTacToe.O;
                if (this.currentTurn == TicTacToe.X) {
                    this.aiNextMove();
                }
            }

        }

        //checking for a winner
        this.checkForWinner = function () {
            const uwc = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];

            uwc.forEach((uwc) => {
                const [a, b, c] = uwc;

                const CellOne = this.cells[a];
                const CellTwo = this.cells[b];
                const CellThree = this.cells[c];

                if (CellOne.value && CellOne.value === CellTwo.value && CellOne.value === CellThree.value) {
                    this.inProgress = false;
                    this.winner = CellOne.value;

                    if (CellOne.value == TicTacToe.O) {
                        this.totalWinsForO++;
                    } else {
                        this.totalWinsForX++;
                    }
                    CellOne.isHighLighted = CellTwo.isHighLighted = CellThree.isHighLighted = true;
                }                 
              
            });

            if (this.MovesMade === this.cells.length) {
                this.inProgress = false;
            }

        }

        //for start a new Game by reset the values 
        this.newRound = function () {
            this.cells.length = 0;
            this.cells = new Array(9).fill().map(x => new Cell());
            this.inProgress = true;
            this.winner = null;
            this.currentTurn = TicTacToe.O;
            this.MovesMade = 0;
        }

        //ai do the move
        this.aiMove = function (i) {
            this.aiAvaliableMoves.length = 0;
            if (this.inProgress && !this.cells[i].value) {
                this.cells[i].value = this.currentTurn;
                this.MovesMade++;
                this.checkForWinner();
                this.currentTurn = (this.currentTurn === TicTacToe.O) ? TicTacToe.X : TicTacToe.O;
            } 

        }

        //trying to determine which cell is Empty 
        this.aiNextMove = function () {
            // empty the array for new Entry 
            this.aiAvaliableMoves.length = 0;
            for (var i = 0; i < this.cells.length; i++) {
                if (!this.cells[i].value) {
                    //new Entry for Empty cell
                    this.aiAvaliableMoves.push(i);
                }
                
            }
            //for (var i = 0; i < this.aiAvaliableMoves.length; i++) {
            //    console.log('array ' + this.aiAvaliableMoves[i]);
            //}

            let num = Math.floor((Math.random() * this.aiAvaliableMoves.length ));
            console.log('The Random ' + num);
           
            console.log(this.cells[this.aiAvaliableMoves[num]].value);
            console.log(this.aiAvaliableMoves.length);
            console.log(this.MovesMade);
            console.log('----------------------');
            this.aiMove(this.aiAvaliableMoves[num]);
          
        }
    };
}

//sleeping function not used just in case needed 
function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


// player 1 and 2 Values
TicTacToe.O = "O"; 
TicTacToe.X = "X";

//Each Cell Object
class Cell {
    constructor() {
        this.value = null;
        this.isHighLighted = false;
    }
}
