
let canvas = document.getElementById("game-content");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = 1024; // Set this information equal to the box parameters in the CSS. If it is different there will be a disconnect between the mouse click position and canvas position
ctx.canvas.height = 526;
let rightPressed
let leftPressed
let upPressed
let downPressed
let tempdx
let tempdy
let ms = 3

let clip = {
    round:"bullet",
    clipArr : []
};

let relMouseCord = (e) =>{
    let xy = [];
    xy.push((e.clientX - canvas.offsetLeft));
    xy.push((e.clientY - canvas.offsetTop));
    return xy;
}
// This is the player and the starting attributes
let pOne = {
    posX : canvas.width/2,
    posY : canvas.height/2,
    pColor : '#009900',
    pRadius : 20
}

// Testing bullet
// let bullet = {
//     x :pOne.posX,
//     y:pOne.posY,
//     dx : 0,
//     dy : 0
// }

class Projectile {
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    rad = 5;
    color = '#FF0000';
}


let playerMove = (obj) =>{
    if(rightPressed) {
        obj.posX+= ms;
        if(upPressed){
            obj.posY -= ms;
        }else if(downPressed){
            obj.posY += ms;
        }
        if(obj.posX + obj.pRadius > canvas.width){
            obj.posX = canvas.width - obj.pRadius
        }
    }
    else if(leftPressed) {
        obj.posX -= ms;
        if(upPressed){
            obj.posY -= ms;
        }else if(downPressed){
            obj.posY += ms;
        }        
    }else if(upPressed) {
         obj.posY-= ms;
     }
    else if(downPressed) {
        obj.posY += ms;
    }
    if(obj.posX - obj.pRadius < 0){
        obj.posX = 0 + obj.pRadius
    }
    if(obj.posY - obj.pRadius < 0){
        obj.posY = 0 + obj.pRadius
    }
    if(obj.posY + obj.pRadius > canvas.height){
        obj.posY = canvas.height - obj.pRadius
    }   
}
let dPlayer = () =>{
    playerMove(pOne)
    ctx.beginPath();
    ctx.arc(pOne.posX, pOne.posY, pOne.pRadius, 0, Math.PI*2);
    ctx.fillStyle = pOne.pColor;
    ctx.fill();
    ctx.closePath();
}
let dProjectile = () =>{
    if(clip.clipArr.length == 0){
        return;
    }

    // ctx.beginPath();
    // ctx.arc(bullet.x, bullet.y, 3, 0, Math.PI*2);
    // ctx.fillStyle = "#FF00FF";
    // ctx.fill();
    // ctx.closePath();

    for (i = 0; i < clip.clipArr.length; i++){
        ctx.beginPath();
        ctx.arc(clip.clipArr[i].x, clip.clipArr[i].y, clip.clipArr[i].rad, 0, Math.PI*2);
        ctx.fillStyle = clip.clipArr[i].color;
        ctx.fill();
        ctx.closePath();
        clip.clipArr[i].x += clip.clipArr[i].dx;
        clip.clipArr[i].y += clip.clipArr[i].dy;
    }

    // bullet.x += tempdx
    // bullet.y += tempdy
}

let draw = () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dPlayer();
    dProjectile();
        //requestAnimationFrame(draw);
}
setInterval(draw,10);
// YOU ARE HERE, YOU NEED TO ADD A CLASS EACH TIME THIS IS CALLED AND MAYBE DELETE THE OTHERS SO YOU DONT RUN OUT OF MEMORY?
let clickHandler = (e) => {
    console.log(e)// add an object when clicked     
    let relativeXY = relMouseCord(e);
    let rise = relativeXY[1] - pOne.posY;
    let run = relativeXY[0] - pOne.posX;
    let angle = Math.atan2(rise,run) 
    tempdx = Math.cos(angle) * 5
    tempdy = Math.sin(angle) * 5


    let bullet = new Projectile(pOne.posX,pOne.posY,tempdx,tempdy )

    clip.clipArr.push(bullet);


   
    bullet.x = pOne.posX
    bullet.y = pOne.posY
    


    pOne.pRadius--;

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