
let canvas = document.getElementById("game-content");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let rightPressed
let leftPressed
let upPressed
let downPressed

let pOne = {
    posX : canvas.width/2,
    posY : canvas.height-30,
    pColor : '#999900',
    dX : 2,  //This is test movement   
    dY : -2, //This is test movement
    pRadius : 20
}
let playerMove = (obj) =>{
    if(rightPressed) {
        obj.posX+= 7;
        if(upPressed){
            obj.posY -= 7;
        }else if(downPressed){
            obj.posY += 7;
        }
    }
    else if(leftPressed) {
        obj.posX -= 7;
        if(upPressed){
            obj.posY -= 7;
        }else if(downPressed){
            obj.posY += 7;
        }        
    }else if(upPressed) {
         obj.posY-= 7;
     }
    else if(downPressed) {
        obj.posY += 7;
    }
}
let dPlayer = () =>{
    playerMove(pOne)
    ctx.beginPath();
    ctx.arc(pOne.posX, pOne.posY, pOne.pRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

let draw = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dPlayer();
        //requestAnimationFrame(draw);
}
setInterval(draw,10)
//draw();


let clickHandler = (e) => {
    console.log(e)
}


function keyDownHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = true;
    }else if(e.key == "w" || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if(e.key == "s" || e.key == "ArrowDown") {
        downPressed = true;
    }

}
function keyUpHandler(e) {
    if(e.key == "d" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = false;
    }else if(e.key == "w" || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if(e.key == "s" || e.key == "ArrowDown") {
        downPressed = false;
    }
}

document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("click",clickHandler,false);