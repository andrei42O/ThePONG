var canvas;
var canvasContext; 
var ballX;
var ballY;
var ballRadius = 20;
var ballSpeedX = 10; // right by default
var ballSpeedY = 5;

function initializeBallCoordinates() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

window.onload = function(){
    canvas =  document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    initializeBallCoordinates();
    var fps = 288; 

    setInterval(showEverything, 1000 / fps); /// 1000ms = 1s
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

function drawElements(){
    drawBackground();
    console.log(ballX, ballY);
    colorCircle(ballX, ballY, ballRadius, 'white')
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

