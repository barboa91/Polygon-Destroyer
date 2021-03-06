
let canvas = document.getElementById("game-content");
let ctx = canvas.getContext("2d");
ctx.canvas.width  = 1024; 
ctx.canvas.height = 526;// Set this information equal to the box parameters in the CSS. If it is different there will be a disconnect between the mouse click position and canvas position


//Variables
// ██╗░░░██╗░█████╗░██████╗░██╗░█████╗░██████╗░██╗░░░░░███████╗░██████╗
// ██║░░░██║██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗██║░░░░░██╔════╝██╔════╝
// ╚██╗░██╔╝███████║██████╔╝██║███████║██████╦╝██║░░░░░█████╗░░╚█████╗░
// ░╚████╔╝░██╔══██║██╔══██╗██║██╔══██║██╔══██╗██║░░░░░██╔══╝░░░╚═══██╗
// ░░╚██╔╝░░██║░░██║██║░░██║██║██║░░██║██████╦╝███████╗███████╗██████╔╝
// ░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝╚═╝░░╚═╝╚═════╝░╚══════╝╚══════╝╚═════╝░

let gameOver = false;
let rightPressed
let leftPressed
let upPressed
let downPressed
let tempdx
let tempdy
let ms = 5
let mobs = []
let score = 0
let hScore = 0
let mostKilled = 0
let jer = new Image();
jer.src = "/images/jeremy.png"
let jerr = new Image();
jerr.src = "/images/jeremyred.png"
let angle




let pew1 = new Audio();
pew1.src = '/sounds/pew1.mp3'
let bang1 = new Audio();
bang1.src ='/sounds/bang.mp3'
// bang1.loop = true;



let audioarr = [pew1,bang1];
let audi = 0

let safe = true
spawnTime = 2000

let clip = {
    round:"bullet",
    clipArr : []
}
let pOne = {                                // This is the player and the starting attributes
    posX : canvas.width/2,
    posY : canvas.height/2,
    pColor : '#009900',
    pRadius : 20,
    mobsKilled : 0,
    hp : 100,
    attacked: false

}
class Projectile {                          //this is the class for projectile so that projectiles can be created
    constructor(x,y,dx,dy){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    rad = 5;
    color = 'red';
}

class Mob {
    constructor(shape, x, y, hp){
        this.shape = shape;
        this.x = x;
        this.y = y;
        this.hp = hp;
    }
    width = Math.floor(Math.random()*20 + 30);
    height = Math.floor(Math.random()*20 + 30);

    dx = Math.floor(Math.random()*10) - 5;
    dy =  Math.floor(Math.random()*10) - 5;
    alive = true;
    attack = false;
    worth(){ return Math.floor((this.x * this.y)/1000) };
}

//Functions
// ███████╗██╗░░░██╗███╗░░██╗░█████╗░████████╗██╗░█████╗░███╗░░██╗░██████╗
// ██╔════╝██║░░░██║████╗░██║██╔══██╗╚══██╔══╝██║██╔══██╗████╗░██║██╔════╝
// █████╗░░██║░░░██║██╔██╗██║██║░░╚═╝░░░██║░░░██║██║░░██║██╔██╗██║╚█████╗░
// ██╔══╝░░██║░░░██║██║╚████║██║░░██╗░░░██║░░░██║██║░░██║██║╚████║░╚═══██╗
// ██║░░░░░╚██████╔╝██║░╚███║╚█████╔╝░░░██║░░░██║╚█████╔╝██║░╚███║██████╔╝
// ╚═╝░░░░░░╚═════╝░╚═╝░░╚══╝░╚════╝░░░░╚═╝░░░╚═╝░╚════╝░╚═╝░░╚══╝╚═════╝░
let gOver = () => {                         //This sends t/f if game is over or not
    if(pOne.hp < 1){
        return true
    }
}
let relMouseCord = (e) =>{                  //this gets the XY coordinates of the mouse relative to the player
    let xy = [];
    xy.push((e.clientX - canvas.offsetLeft));
    xy.push((e.clientY - canvas.offsetTop));
    return xy;
}
let playerMove = (obj) =>{                  //The function inspects keys press for movement
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
let dPlayer = () =>{                        //This draws the player 
    // ctx.beginPath();
    // ctx.arc(pOne.posX, pOne.posY, pOne.pRadius, 0, Math.PI*2);
    // ctx.fillStyle = pOne.pColor;
    // ctx.fill();
    // ctx.closePath();

    ctx.save();
    ctx.translate(pOne.posX,pOne.posY)
    ctx.rotate(angle);
    playerMove(pOne)

    ctx.drawImage(jer,-19, -20)
    ctx.restore();

}
let dProjectile = () =>{                    //This draws the projectiles from the player
    if(clip.clipArr.length == 0){
        return;
    }
    ctx.save();
    ctx.translate(pOne.posX,pOne.posY)
    ctx.rotate(angle);
    ctx.drawImage(jerr,-19, -20)
    ctx.restore();

    for (i = 0; i < clip.clipArr.length; i++){
        ctx.beginPath();
        ctx.arc(clip.clipArr[i].x, clip.clipArr[i].y, clip.clipArr[i].rad, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        clip.clipArr[i].x += clip.clipArr[i].dx;
        clip.clipArr[i].y += clip.clipArr[i].dy;
    }


}
let dMob = () =>{                           //This draws all the mobs
    
    for(i = 0; i < mobs.length; i++){
        if(mobs[i].alive){
            ctx.beginPath();
            ctx.lineWidth = "4";
            //ctx.strokeStyle = "green";
            ctx.rect(mobs[i].x, mobs[i].y, mobs[i].width, mobs[i].height );
            ctx.fillStyle = "yellow"
            ctx.fill();
            mobs[i].x += mobs[i].dx
            mobs[i].y += mobs[i].dy

        }
    }
}
let addMob = () =>{                         // This adds the mob to the list of creatures Need to fix adding mob too close to edge
    let randX = Math.floor(Math.random()*canvas.width);
    let randY = Math.floor(Math.random()*canvas.height);
    let nMob = new Mob("rectangle", randX, randY, 10);
    mobs.push(nMob);
}
let collisionMob = () =>{
    if(mobs.length == 0){
        return;
    }else {
        for(let i = 0; i < clip.clipArr.length; i++){
            for(let n = 0; n <mobs.length; n++){
                if((clip.clipArr[i].x > mobs[n].x && clip.clipArr[i].x <mobs[n].x + mobs[n].width) && (clip.clipArr[i].y > mobs[n].y && clip.clipArr[i].y <mobs[n].y + mobs[n].height ) ){
                    if(mobs[n].alive){
                        score += mobs[n].worth();
                        pOne.mobsKilled++;
                    }
                    mobs[n].alive = false;
                    return;
                }
            }
        }
    }

// sometimes they get stuck on the wall 

    for (let i = 0;i < mobs.length; i++){
        if(mobs[i].x+mobs[i].width > canvas.width || mobs[i].x < 0){
            mobs[i].dx =-1* mobs[i].dx;
        }
        if(mobs[i].y+mobs[i].height > canvas.height || mobs[i].y < 0){
            mobs[i].dy =-1* mobs[i].dy;
        }
    }

    safe = mobs.every(intersects);
    if(safe){
        pOne.attacked = false;
    }

    if(!safe && !pOne.attacked){
        pOne.hp -= 10;
        pOne.attacked = true;
        flashScreen();
    }






    //pOne.attacked = false;
}
let intersects = (mob) =>                   //Collision detection from Circle to Rectangle Borrowed from stack overflow
{
        if(!mob.alive){
            return true;
        }
        let circleDistancex = Math.abs(pOne.posX - (mob.x + mob.width/2) );
        let circleDistancey = Math.abs(pOne.posY - (mob.y + mob.height/2) );

        if (circleDistancex > (mob.width/2 + pOne.pRadius)) { return true; }
        if (circleDistancey > (mob.height/2 + pOne.pRadius)) { return true; }

        if (circleDistancex <= (mob.width/2)) { return false; } 
        if (circleDistancey <= (mob.height/2)) { return false; }

        let cornerDistance_sq = (circleDistancex - mob.width/2)^2 +
                                (circleDistancey - mob.height/2)^2;

        return !(cornerDistance_sq <= (pOne.pRadius^2));
    
}
let drawScore = () => {
    ctx.font = "16px Arial";
    ctx.fillStyle = "yellow";
    ctx.fillText("Score: "+ score, 8, 20);
    
    document.querySelector("#score").innerText =  `Score : ${score}`;
    ctx.fillText("Polys Destroyed: " + pOne.mobsKilled, 8, 40);
    document.querySelector("#mobs-destroyed").innerText =  `Polys Destroyed: ${pOne.mobsKilled}`;
    ctx.fillText("Hit Points : " + pOne.hp, 8, 60);
    document.querySelector("#hit-points").innerText =  `Hit Points : ${pOne.hp}`;
    score > hScore ? hScore = score : false;
    document.querySelector("#hscore").innerText =  `High Score : ${hScore}`;
    pOne.mobsKilled > mostKilled ? mostKilled = pOne.mobsKilled : false;
    document.querySelector("#most-destroyed").innerText =  `Most Destroyed: ${mostKilled}`;



}

let flashScreen = () =>{                    //This will flash screen red called when player is hit
    ctx.beginPath();
    ctx.lineWidth = "4";
    //ctx.strokeStyle = "green";
    ctx.rect(0, 0, canvas.width, canvas.height );
    ctx.fillStyle = "red"
    ctx.fill();
}

let draw = () =>{                           // MAIN FUNCTION IS DRAW THIS IS WHERE ALL THE ACTION HAPPENS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dPlayer();
    dMob();
    dProjectile();
    collisionMob();
    drawScore();
    if(gOver()){                            //If game is over clear screen and draw GO
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = "160px Arial";
        ctx.fillStyle = "red";

        ctx.fillText("GAME OVER", 30, 275);   

        return;
    }
    //setInterval(addMob,5000);

    requestAnimationFrame(draw)// This is the last thing that is called in the function so that it calls the draw function again
}

let startGame = async () =>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ms = 5
    mobs = []
    score = 0
    safe = true
    pOne.mobsKilled = 0
    pOne.hp = 100;
    gameOver = false

    draw();
    alert("Restarting");

}

//Event Listeners
// ███████╗██╗░░░██╗███████╗███╗░░██╗████████╗  ██╗░░░░░██╗░██████╗████████╗███████╗███╗░░██╗███████╗██████╗░░██████╗
// ██╔════╝██║░░░██║██╔════╝████╗░██║╚══██╔══╝  ██║░░░░░██║██╔════╝╚══██╔══╝██╔════╝████╗░██║██╔════╝██╔══██╗██╔════╝
// █████╗░░╚██╗░██╔╝█████╗░░██╔██╗██║░░░██║░░░  ██║░░░░░██║╚█████╗░░░░██║░░░█████╗░░██╔██╗██║█████╗░░██████╔╝╚█████╗░
// ██╔══╝░░░╚████╔╝░██╔══╝░░██║╚████║░░░██║░░░  ██║░░░░░██║░╚═══██╗░░░██║░░░██╔══╝░░██║╚████║██╔══╝░░██╔══██╗░╚═══██╗
// ███████╗░░╚██╔╝░░███████╗██║░╚███║░░░██║░░░  ███████╗██║██████╔╝░░░██║░░░███████╗██║░╚███║███████╗██║░░██║██████╔╝
// ╚══════╝░░░╚═╝░░░╚══════╝╚═╝░░╚══╝░░░╚═╝░░░  ╚══════╝╚═╝╚═════╝░░░░╚═╝░░░╚══════╝╚═╝░░╚══╝╚══════╝╚═╝░░╚═╝╚═════╝░

let mouseHandler = (e) =>{
    let relativeXY = relMouseCord(e);
    let rise = relativeXY[1] - pOne.posY;
    let run = relativeXY[0] - pOne.posX;
    angle = Math.atan2(rise,run) 
}
let clickHandler = (e) => {
     audioarr[audi].play();

    audi = (audi + 1) % 2;
    

    console.log(e)// add an object when clicked     
    let relativeXY = relMouseCord(e);
    let rise = relativeXY[1] - pOne.posY;
    let run = relativeXY[0] - pOne.posX;
    angle = Math.atan2(rise,run)    // This gets the angle from the player to where the mouse is
    tempdx = Math.cos(angle) * 5        // This sets the velocity of the projectile in the X direction
    tempdy = Math.sin(angle) * 5        // This sets the velocity of the projectile in the Y direction
    let bullet = new Projectile(pOne.posX,pOne.posY,tempdx,tempdy)

    // add a for loop for clip size || the problem is that once you get to the last bullet all of the others disappear maybe have alternating clips?
    if (clip.clipArr.length > 10){
        addMob();                           //ADDING MOB AFTER CLIP EMPTY
        clip.clipArr = [];
        clip.clipArr.push(bullet);

    }else clip.clipArr.push(bullet);
    //pOne.pRadius--;                  // This shrinks the ball every time that you shoot

    if(e.target.id == "restart"){
        startGame();
    }

}
let keyDownHandler = (e) =>{
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
let keyUpHandler = (e) =>{
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
document.addEventListener("mousemove",mouseHandler,false);



addMob(); // ADDING one mob for collision testing
setInterval(addMob,spawnTime);// add a mob every spawn time
//draw();// Need to call this to start the game

draw();

// Borrowed Hit Detection for circle and square with this from this stack overflow page https://stackoverflow.com/questions/401847/circle-rectangle-collision-detection-intersection