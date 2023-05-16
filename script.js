const playBoard = document.querySelector(".playBoard");
const gameScoreEle=document.querySelector(".gameScore");
const scoreEle = document.querySelector(".score");
const highScoreEle = document.querySelector(".highScore");
const exitEle = document.querySelector('.word');
const timerEle = document.querySelector('.timer');
const buttonControlsEle = document.querySelectorAll(".buttonControls i");



let count=0;
let sec=59;
let cont=0;
let gameOver=false;
let foodX,foodY;
let wordX=10,wordY=10;
let snakebody=[
    {x:3,y:1},
    {x:2,y:1},
    {x:1,y:1}
]
let speedX=0,speedY=0;
let gameScore=0;
let setIntervalEle;


document.addEventListener('keydown', e=> {
    if (e.key=='ArrowRight' || e.key=='ArrowLeft' || e.key=='ArrowUp' || e.key=='ArrowDown'){
        const timer = setInterval(()=>{
            timerEle.innerHTML = 'Timer : '+sec;
            sec--;
            if (sec==-1){
                gameOver=true;
            }
        },1000)
    }
},{once: true})


let highScore = localStorage.getItem(".highScore") || 0;
highScoreEle.innerHTML = 'HighScore : '+highScore;

/*const leaderboard = () =>{
    let username=window.prompt('Ur Name?');
    highScore = localStorage.getItem(".highScore") || 0;
    highScoreEle.innerHTML = 'HighScore : '+highScore;
    leaderboardEle.innerHTML = ajAYusername;
    console.log(username,highScore);
}*/

const displayGameOver = () =>{
    clearInterval(setIntervalEle);
    alert('Game Over...');
    location.reload();
}

const randfood = () => {
    foodX = Math.floor((Math.random()*30)+1);
    foodY = Math.floor((Math.random()*30)+1);
    return foodX,foodY;
}
const snakeControls = (a) => {
    
    let keyData = a.key;
    if (keyData == "ArrowUp" && speedY!=1){
        cont=1;
        speedX = 0;
        speedY = -1;
    }
    else if (keyData == "ArrowDown" && speedY!=-1){
        cont=1;
        speedX = 0;
        speedY = 1;
    }
    else if (keyData == "ArrowRight" && speedX!=-1){
        cont=1;
        speedX = 1;
        speedY = 0;
    }
    else if (keyData == "ArrowLeft" && speedX!=1){
        cont=1;
        speedX = -1;
        speedY = 0;
    }
    

}
buttonControlsEle.forEach(button => button.addEventListener("click", () => snakeControls({ key: button.dataset.key })));



const startGame = () => {
    
    if (gameOver) return displayGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    for (let i = 0; i < snakebody.length; i++) {
        html += `<div class="snake" style="grid-area: ${snakebody[i].y} / ${snakebody[i].x}"></div>`;
    }
    if(cont){
        for (let i = snakebody.length-2 ; i >=0; i--) {
            snakebody[i+1]={...snakebody[i]};        
        }
        snakebody[0].x+=speedX;
        snakebody[0].y+=speedY;
}
     
    
    playBoard.innerHTML =html;
    if (snakebody[0].x == foodX && snakebody[0].y == foodY){
        randfood();
        gameScore++;
        if (gameScore >= highScore){
            highScore = gameScore;
        }
        localStorage.setItem('.highScore',highScore);
        scoreEle.innerHTML ='Score : '+gameScore;
        highScoreEle.innerHTML ='HighScore : '+highScore;
    }
    
    if (snakebody[0].x<=0 || snakebody[0].x>=31 || snakebody[0].y<=0 || snakebody[0].y>=31 ){
        gameOver=true;
        
    }
    return gameScore;
    
}  
randfood();
//leaderboard();
setIntervalEle=setInterval(startGame,130);
document.addEventListener('keydown',snakeControls);

