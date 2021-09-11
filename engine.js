var canvas;
var canvasContext; 
var ballX;
var ballY;
const BALL_RADIUS = 20;
var ballSpeedX = 5; 
var ballSpeedY = 5;
const FPS = 288;

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
var paddleY;
var paddleX;

function initializeBallCoordinates() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function initializePaddleCoordinates(){
    paddleY = canvas.height / 2 - (PADDLE_HEIGHT / 2);
    paddleX = 10;
}

window.onload = function(){
    canvas =  document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    initializeBallCoordinates();
    initializePaddleCoordinates();
    
    setInterval(showEverything, 1000 / FPS); /// 1000ms = 1s
    
    canvas.addEventListener('mousemove', 
        function(evt){
            var mousePos = calculateMousePosition(evt);
            paddleY = mousePos.y - PADDLE_HEIGHT / 2;
        })
}

function calculateMousePosition(evt){
    /// This function calculates the current cursor position and returns it by 2 coordinates (x, y) which are integers
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


function checkIfPaddleHit(){
    /// The function checks if the ball hits the paddle
    if (!(paddleX + PADDLE_WIDTH / 2 == ballX - BALL_RADIUS / 2))
        return false;
    if(!(ballY >= paddleY && ballY <= paddleY + PADDLE_HEIGHT))
        return false;
    return true;
}

function recalculateBallCoordinates(){
    /// The function recalculates the ball coordinates after it hits the walls or the paddles
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if(checkIfPaddleHit()) {
        direction = -(ballSpeedX / Math.abs(ballSpeedX))
        ballSpeedX = Math.floor(Math.random() + 5);
        ballSpeedX *= direction;
        ballX = paddleX + PADDLE_WIDTH + BALL_RADIUS / 2;
        console.log("BALL HIT!")
        return
    }
    // hits the right wall
    if (ballX + BALL_RADIUS / 2 > canvas.width) {
        direction = -(ballSpeedX / Math.abs(ballSpeedX));
        ballSpeedX = Math.floor((Math.random()) + 5);
        ballSpeedX *= direction;
        ballX = canvas.width - BALL_RADIUS / 2;
    }

    // hits the left wall
    if (ballX - BALL_RADIUS / 2 < 0) {
        ballX = BALL_RADIUS;
        direction = -(ballSpeedX / Math.abs(ballSpeedX));
        ballSpeedX = Math.floor((Math.random()) + 5)
        ballSpeedX *= direction;
    }

    // hits the top 
    if(ballY + BALL_RADIUS / 2 > canvas.height){
        direction = -(ballSpeedY / Math.abs(ballSpeedY));
        ballSpeedY = Math.floor((Math.random()) + 5)
        ballSpeedY *= direction;
        ballY = canvas.height - BALL_RADIUS / 2;
    }

    //hits the bottom
    if(ballY - BALL_RADIUS / 2  < 0){
        direction = -(ballSpeedY / Math.abs(ballSpeedY));
        ballSpeedY = Math.floor((Math.random()) + 5)
        ballSpeedY *= direction;
        ballY = BALL_RADIUS / 2;
    }
}

function drawPaddle(){
    // the function draws the player's paddle
    canvasContext.fillStyle = 'white'
    canvasContext.fillRect(paddleX, paddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawElements(){
    // the functions draws all the elements in their current places
    drawBackground();
    drawPaddle();
    colorCircle(ballX, ballY, BALL_RADIUS, 'white')
}

function drawBackground(){
    // This function draws the background of the game
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
}

function colorCircle(centerX, centerY, radius, color){
    // This function draws the ball 
    // Parameters:  centerX - integer
    //              centerY - integer
    //              radius - integer
    //              color - string
    canvasContext.beginPath();
    canvasContext.fillStyle = color
    canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI)
    canvasContext.fill();
}

