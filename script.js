const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restart = document.getElementById("restart");

const xScoreDisplay = document.getElementById("xScore");
const oScoreDisplay = document.getElementById("oScore");
const drawScoreDisplay = document.getElementById("drawScore");

let currentPlayer = "X";
let board = ["","","","","","","","",""];
let gameOver = false;

let xScore = 0;
let oScore = 0;
let drawScore = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach((cell,index)=>{

    cell.addEventListener("click",()=>{

        if(board[index]!=="" || gameOver){
            return;
        }

        board[index]=currentPlayer;
        cell.textContent=currentPlayer;

        if(checkWinner()){

            status.textContent="🎉 Player "+currentPlayer+" Wins!";

            if(currentPlayer==="X"){
                xScore++;
                xScoreDisplay.textContent=xScore;
            }
            else{
                oScore++;
                oScoreDisplay.textContent=oScore;
            }

            gameOver=true;
            highlightWinner();
            return;
        }

        if(board.every(cell=>cell!="")){

            status.textContent="🤝 It's a Draw!";
            drawScore++;
            drawScoreDisplay.textContent=drawScore;
            gameOver=true;
            return;
        }

        currentPlayer=currentPlayer==="X"?"O":"X";
        status.textContent="Player "+currentPlayer+" Turn";

    });

});

function checkWinner(){

    return winPatterns.some(pattern=>{

        const win=pattern.every(index=>board[index]===currentPlayer);

        if(win){
            pattern.forEach(index=>{
                cells[index].style.background="#00ff88";
                cells[index].style.color="black";
            });
        }

        return win;

    });

}

function highlightWinner(){

    cells.forEach(cell=>{
        cell.style.fontWeight="bold";
    });

}

restart.addEventListener("click",()=>{

    board=["","","","","","","","",""];
    currentPlayer="X";
    gameOver=false;

    cells.forEach(cell=>{
        cell.textContent="";
        cell.style.background="white";
        cell.style.color="black";
    });

    status.textContent="Player X Turn";

});