
let canvas = document.getElementById("game-content");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = 1024; // Set this information equal to the box parameters in the CSS. If it is different there will be a disconnect between the mouse click position and canvas position
ctx.canvas.height = 526;
let rightPressed
let leftPressed
let upPressed
let downPressed

let clip = [4,5,6];

// let mousePos = {
//     x : 0,
//     y : 0
// }

let relMouseCord = (e) =>{
    let xy = [];
    xy.push((e.clientX - canvas.offsetLeft));
    xy.push((e.clientY - canvas.offsetTop));
    return xy;
}

console.log(window)

let pOne = {
    posX : canvas.width/2,
    posY : canvas.height/2,
    pColor : '#999900',
    dX : 2,  //This is test movement   
    dY : -2, //This is test movement
    pRadius : 20
}


let bullet = {
    x :pOne.posX,
    y:pOne.posY,
    dx : 2,
    dy : 5
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
let dProjectile = () =>{
    if(clip.length == 0){
        return;
    }
    ctx.beginPath();
    ctx.arc(xyarr[0], xyarr[1], 3, 0, Math.PI*2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();

    bullet.x += bullet.dx
    bullet.y += bullet.dy
}

let draw = () =>{
   // ctx.clearRect(0, 0, canvas.width, canvas.height);
    dPlayer();
   // dProjectile();
        //requestAnimationFrame(draw);
}
setInterval(draw,10)
//draw();


let clickHandler = (e) => {
    console.log(e)// add an object when clicked     
    let relativeXY = relMouseCord(e);
    // let rise = relativeY - pOne.posY;
    // let run = relativeX - pOne.posY;

    //console.log(getMousePos(ctx,e))
    ctx.beginPath();
    ctx.arc(relativeXY[0], relativeXY[1], 3, 0, Math.PI*2); // do math to find propper x y of mouse on the canvas
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
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