var canvas;
var canvasContext; 
var ballW = 20; // 20px x 20px
var ballH = 20;
var ballX;
var ballY;

function initializeBallCoordinates() {
    ballX = (canvas.width - ballW) / 2;
    ballY = (canvas.height - ballH) / 2;
}

window.onload = function(){
    canvas =  document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    initializeBallCoordinates();

    var fps = 10; 
    console.log("am intrat")
    drawRectangle();
    //setInterval(drawRectangle, 1000 / fps); /// 1000ms = 1s
}

function drawRectangle(){
    
    console.log("desenez....");
    ballX = ballX + 10;
    console.log(ballX, ballY)
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    canvasContext.fillStyle = 'red';
    //canvasContext.fillRect(ballX, ballY, ballW, ballH);
    canvasContext.arc(ballX, ballY, 20, 0, 2 * Math.PI);
    if (ballX >= 800)
        ballX = -50;
    canvasContext.beginPath();
    canvasContext.arc(100, 75, 50, 0, 2 * Math.PI);
    canvasContext.stroke();
}

