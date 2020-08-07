var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudimage,cloud,cloudsgroup;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var gamestate,PLAY,END,count;
var gameover,gameoverimage,restart,restartimage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudimage=loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameoverimage = loadImage("gameOver.png")
  restartimage = loadImage("restart.png")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collide",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
 
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsgroup=new Group();
  
  count=0;
  
  obstaclesgroup=new Group();
  
  PLAY=1;
  END=0;
  gamestate=PLAY;
  
 gameOver = createSprite(300,100);
 restart = createSprite(300,150);
gameOver.addImage(gameoverimage);
gameOver.scale = 0.5;
restart.addImage(restartimage);
restart.scale = 0.5;

gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background("yellow");
  text("Score:"+count,30,30)
  console.log(trex.y)
  //trex.debug=true;
  
  if(gamestate === PLAY){
     ground.velocityX = -2;
  if(keyDown("space") && (trex.y>161)){
    trex.velocityY = -12;
    }
    
    trex.velocityY = trex.velocityY + 0.8
    
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    
    count = count + Math.round(frameRate()/60);
    
    if(trex.isTouching(obstaclesgroup)){
       gamestate=END;
       }
  spawnClouds();
  spawnObstacles();
  }
    
  
  if(gamestate===END){
    ground.velocityX=0;
    trex.velocityY = 0;
    obstaclesgroup.setVelocityXEach(0);
    cloudsgroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("trex_collide",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesgroup.setLifetimeEach(-1);
    cloudsgroup.setLifetimeEach(-1);
    gameOver.visible=true;
    restart.visible=true;
    
    if (mousePressedOver(restart)){
    restart1();
  }
    
  }
  
  
  
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,140,40,10);
    cloud.y = Math.round(random(110,130));
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 600/3;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsgroup.add(cloud);
  }
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX =-(8 + count/100);
    
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
        
        case 1:obstacle.addImage(obstacle1);
        break;
        
        case 2:obstacle.addImage(obstacle2);
        break;
        
        case 3:obstacle.addImage(obstacle3);
        break;
        
        case 4:obstacle.addImage(obstacle4);
        break;
        
        case 5:obstacle.addImage(obstacle5);
        break;
        
        case 6:obstacle.addImage(obstacle6);
        break;
        
        default:break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 90;
    //add each obstacle to the group
    obstaclesgroup.add(obstacle);
  }
}

function restart1(){
    count=0;
    obstaclesgroup.destroyEach();
    cloudsgroup.destroyEach();
    gameOver.visible=false;
    restart.visible=false;
    
trex.changeAnimation("running", trex_running);
  gamestate= PLAY;
    
  }