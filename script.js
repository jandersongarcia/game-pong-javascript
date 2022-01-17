var canvas = document.getElementById("canvas")
var container = canvas.getContext("2d")

container.fillStyle = "#8b8b8b"
container.font = "20px Consolas"

var playing = true

var player1 = {
    px: 50,
    py: 260,
    tx: 30,
    ty: 200,
    dir: 0
}

var player2 = {
    px: 1200,
    py: 260,
    tx: 30,
    ty: 200,
    dir: 4
}

var ball = {
    px: 1280/2 - 15,
    py: 720/2 - 15,
    tx: 30,
    ty: 30,
    dir: 8,
    diry: 2
}

var pts1 = 0
var pts2 = 0

document.addEventListener("keydown", function(e){
    if (e.keyCode === 87){
        player1.dir = -8
    }
    else if (e.keyCode === 83){
        player1.dir = 8
    }
})

document.addEventListener("keyup", function(e){
    if (e.keyCode === 87 || e.keyCode === 83){
        player1.dir = 0
    }
})

function gameOver(){
    if (pts1 >= 5 || pts2 >= 5){
        playing = false
    }
}

function movePlayer(){
    if (player1.py < 0){
        player1.py = 0
    }
    else if (player1.py > 520){
        player1.py = 520
    }

    if (player2.py < 0){
        player2.dir *= -1
    }
    else if (player2.py > 520){
        player2.dir *= -1
    }

    player1.py += player1.dir
    player2.py += player2.dir
}

function draw(){
    container.fillRect(player1.px, player1.py, player1.tx, player1.ty)
    container.fillRect(player2.px, player2.py, player2.tx, player2.ty)
    container.fillRect(ball.px, ball.py, ball.tx, ball.ty)
    container.fillText("Score 1: " + pts1,200,50)
    container.fillText("Score 2: " + pts2,1000,50)
}

function drawWin(){
    container.clearRect(0,0,1800,720)
    container.font = "40px Consolas"
    container.fillText("Score 1: " + pts1,100,345)
    container.fillText("Score 2: " + pts2,1000,345)
}

function moveBall(){
    ball.px += ball.dir
    ball.py += ball.diry

    if( ball.py < 0){
        ball.diry *= -1
    }
    else if (ball.py > 690){
        ball.diry *= -1
    }
}

function colision(){
    if(ball.py + ball.ty >= player2.py && ball.py <= player2.py + player2.ty && ball.px >= player2.px - player2.tx) {
        ball.dir *= -1
    } else if (ball.py + ball.ty >= player1.py && ball.py <= player1.py + player1.ty && ball.px <= player1.px + player1.tx){
        ball.dir *= -1
    }
}

function points(){
    if(ball.px < -100){
        ball.px = 625
        ball.py = 345
        ball.dir *= -1
        pts2 += 1
    }
    else if (ball.px > 1380){
        ball.px = 625
        ball.py = 345
        ball.dir *= -1
        pts1 += 1
    }
}

function Main(){
    if (playing){
        container.clearRect(0,0,1800,720)
        draw()
        moveBall()
        movePlayer()
        colision()
        points()
        gameOver()
    }
    else {
        drawWin()
    }
    
}

setInterval(Main, 10);