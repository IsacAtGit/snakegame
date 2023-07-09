let gameboard=document.getElementById("gameboard")
const context=gameboard.getContext('2d')
const score=document.getElementById("score")
let width=gameboard.width
let height=gameboard.height
const unit=25;//width and height of food
let foodx=0;
let foody=0;
let xvel=unit;
let yvel=0;
let btnvalue=0;
const left= 37
const up=38
const right=39
const down=40
let active=false;
let started=false;
 let scoreval=0
let snake=[
    // {x:75,y:0},
    // {x:50,y:0},
    // {x:25,y:0},
    // {x:0,y:0}, // first square start
    {x:unit*3,y:0},
    {x:unit*2,y:0},
    {x:unit,y:0},
    {x:0,y:0}, // first square start
]
window.addEventListener('keydown',keypress)
startgame();
function startgame(){
   context.fillStyle="#212121";
   //xstart,ystart,width,height
   context.fillRect(0,0,width,height)
   createfood();//choose random x and y
//    displayfood();//by the random x anfd y display
//    drawsnake();
//    movesnake(); all are commente bcz to put it into timer
                //if we call it another ttime it add on board but existing color not clear
                //so need to clear board by calling the function draw and move multiple times
                //by timer
    tick();
    keypress();
}
function clearboard(){
    context.fillStyle="#212121";
   context.fillRect(0,0,width,height)
}
function createfood(){
   foodx=Math.floor(Math.random()*width/unit)*unit // to get multiple of 50 less than 500
   foody=Math.floor(Math.random()*height/unit)*unit
}
function displayfood() {
    context.fillStyle="red"
   context.fillRect(foodx,foody,unit,unit) //all are multiple of 25 unit square 
}

function drawsnake() {
    context.fillStyle="yellow"
    context.strokeStyle="black"
    snake.forEach(e => {
        context.fillRect(e.x,e.y,unit,unit) 
        context.strokeRect(e.x,e.y,unit,unit) //draw stroke
    });

}

function movesnake(){
  const head={x:snake[0].x+xvel,
               y:snake[0].y+yvel} //adding head and removing bottom for move ment
     snake.unshift(head)
     if(snake[0].x==foodx && snake[0].y==foody ){
        scoreval++
        score.textContent=scoreval
        createfood();
     }
     else{
        snake.pop()
     }
    
}

function tick(){
    if(active){
        setTimeout(()=>{
            clearboard();
             displayfood();
             movesnake();
             drawsnake();
             gameover();
             tick()
          },200)
    }
    else if(!active && !started){
        clearboard()
        context.font="bold 50px serif"
        context.fillStyle="white"
        context.textAlign="center"
        context.fillText("Press Start!!",width/2,height/2)
    }
    else {
        clearboard()
        context.font="bold 50px serif"
        context.fillStyle="white"
        context.textAlign="center"
        context.fillText("Game Over!!",width/2,height/2)
    }
  
}

function keypress(event){
    console.log(event)
     

     switch (true) {
        case (event.keyCode==left &&xvel!=unit):
               xvel=-unit
               yvel=0;
            break;
            case (event.keyCode==right &&xvel!=-unit):
                xvel=unit
                yvel=0;
             break;
             case (event.keyCode==up && yvel!=unit):
                xvel=0
                yvel=-unit;
             break;
             case (event.keyCode==down && yvel!=-unit):
                xvel=0
                yvel=unit;
             break;
        default:
            break;
     }
}
function gameover(){
    switch (true) {
        case (snake[0].x<0):
               active=false
            break;
            case (snake[0].x>=width):
                active=false
             break;
             case (snake[0].y<0):
                active=false
             break;
             case (snake[0].y>=height):
                active=false
             break;
    
        default:
            break;
    }
}

function upbtn(){

    btnvalue=38;
    if(btnvalue==up && yvel!=unit){
        xvel=0
    yvel=-unit;
    }
    
    
}
function downbtn(){
    btnvalue=40;
    if(btnvalue==down && yvel!=-unit){
        xvel=0
    yvel=unit;
    }
   
}
function rightbtn(){
    btnvalue=39;
    if(btnvalue==right && xvel!=-unit){
        xvel=unit
        yvel=0;
    }
}
function leftbtn(){
    btnvalue=37;
    if(btnvalue==left && xvel!=unit){
        xvel=-unit
        yvel=0;
    }
}

function startbtn(){
    if(!started){
        active=true
       started=true
       tick()
    }
    else{
        window.location.reload()
    }
   
}