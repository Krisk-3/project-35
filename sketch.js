var balloon,balloonImg_moving,balloon2
var backImg
var database
var position

function preload(){
  backImg = loadImage ("images/Hot Air Ballon-01.png")
  balloon2 = loadImage ("images/Hot Air Ballon-04.png")
  balloonImg_moving = loadAnimation ("images/Hot Air Ballon-02.png","images/Hot Air Ballon-03.png","images/Hot Air Ballon-04.png")
}
function setup() {
  createCanvas(1800,800);
  database = firebase.database()
  balloon = createSprite(400, 500, 50, 50);
  balloon.addAnimation ("moving",balloonImg_moving)
  balloonpos = database.ref('balloon/height');
  balloonpos.on("value",readpos,showError);
}

function draw() {
  background(backImg);
  if(keyDown(LEFT_ARROW)){
    balloon.x = balloon.x -10;
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x = balloon.x +10;
  }
  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y -10;
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y = balloon.y +10;
  }


  if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.scale = balloon.scale -0.01
  }
  if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balloon.scale = balloon.scale +0.01
  }
  textSize(36)
  fill("black")
  text("Use arrow keys to move the balloon",100,100)
  
  drawSprites();
}

function readpos(data){
  height = data.val();
  balloon.x = height.x
  balloon.y = height.y
}

function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}