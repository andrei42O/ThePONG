var canvas;
var canvasContext; 
var ballX;
var ballY;
var ballRadius = 20;
var ballSpeedX = 5; 
var ballSpeedY = 5;


const PADDLEE_HEIGHT = 100;
var paddleY;
var paddleX;
const PADDLE_WIDTH = 10;

function initializeBallCoordinates() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function initializePaddleCoordinates(){
    paddleY = canvas.height / 2 - (PADDLEE_HEIGHT / 2);
    paddleX = 10;
}

window.onload = function(){
    canvas =  document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    initializeBallCoordinates();
    initializePaddleCoordinates();
    var fps = 288; 
    
    setInterval(showEverything, 1000 / fps); /// 1000ms = 1s
    
    canvas.addEventListener('mousemove', 
        function(evt){
            var mousePos = calculateMousePosition(evt);
            paddleY = mousePos.y - PADDLEE_HEIGHT / 2;
        })
}

function calculateMousePosition(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

function showEverything(){
    drawElements();
    recalculateBallCoordinates();
}

function recalculateBallCoordinates(){
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if (ballX + ballRadius / 2 > canvas.width) {
        direction = -(ballSpeedX / Math.abs(ballSpeedX));
        ballSpeedX = Math.floor((Math.random() * 5) + 5)
        ballSpeedX *= direction;
        ballX = canvas.width - ballRadius / 2;
    }
    if (ballX - ballRadius / 2 < 0) {
        ballX = ballRadius;
        direction = -(ballSpeedX / Math.abs(ballSpeedX));
        ballSpeedX = Math.floor((Math.random() * 5) + 5)
        ballSpeedX *= direction;
    }
    if(ballY + ballRadius / 2 > canvas.height){
        direction = -(ballSpeedY / Math.abs(ballSpeedY));
        ballSpeedY = Math.floor((Math.random() * 5) + 5)
        ballSpeedY *= direction;
        ballY = canvas.height - ballRadius / 2;
    }
    if(ballY - ballRadius / 2  < 0){
        direction = -(ballSpeedY / Math.abs(ballSpeedY));
        ballSpeedY = Math.floor((Math.random() * 5) + 5)
        ballSpeedY *= direction;
        ballY = ballRadius / 2;
    }
}

function drawPaddle(){
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(paddleX, paddleY, PADDLE_WIDTH, PADDLEE_HEIGHT);
}

function drawElements(){
    drawBackground();
    drawPaddle();
    colorCircle(ballX, ballY, ballRadius, 'white')
    //console.log(ballX, ballY);
}

function drawBackground(){
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function colorCircle(centerX, centerY, radius, color){
    canvasContext.beginPath();
    canvasContext.fillStyle = color
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    canvasContext.fill();
}

