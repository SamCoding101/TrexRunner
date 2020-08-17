var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var score=0;
var newImage;

var obstacles,obstaclesGroup,obs_image1,obs_image2,obs_image3,obs_image4,obs_image5,obs_image6;

var game_state="play";

var reset,reset2,resetImage1,resetImage2;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  obs_image1 = loadImage("obstacle1.png");
  obs_image2 = loadImage("obstacle2.png");
  obs_image3 = loadImage("obstacle3.png");
  obs_image4 = loadImage("obstacle4.png");
  obs_image5 = loadImage("obstacle5.png");
  obs_image6 = loadImage("obstacle6.png");

  resetImage1 = loadImage("gameOver.png");
  resetImage2 = loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50,width-70,20,50);
  trex.addAnimation("running", trex_running);
  // trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(width/2,height-20,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(width/2,height-10,width,10);
  invisibleGround.visible = false;
  console.log(ground.width);
  
  cloudsGroup=createGroup();
  obstaclesGroup=createGroup();
}

function draw() {
  background(180);
  
  if(game_state=="play"){
   score = score + Math.round(getFrameRate()/60); 
    
  if((keyDown("space")|| touches.length>0) && trex.y>100) {
   trex.velocityY = -10;
    touches=[];
  } 
  if (ground.x < 0){
    ground.x = ground.width/2;   
  }
    
  //spawn the clouds
  spawn_clouds();
  spawn_obstacles();  
    
  if(trex.isTouching(obstaclesGroup)){
   game_state="end";
    spawn_reset();
  }  
  }else if(game_state=="end"){
    ground.velocityX=0; 
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  text("score="+score,370,40);
 // console.log(getFrameRate());
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);
  
  if(mousePressedOver(reset2)){
     game_state="play"; 
  }
  drawSprites();
}

function spawn_clouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(width+10,height-100,40,10);
    cloud.addImage(cloudImage);
    cloud.y = Math.round(random(10,60));
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    cloud.lifetime=(width+10)/2;
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    }
}
function spawn_obstacles(){
 if(frameCount%70 === 0){
 obstacles=createSprite(width+10,height-30,20,40); 
 obstacles.velocityX=-4;
 var select= Math.round(random(1,6));
 switch(select){
     case 1:
     obstacles.addImage(obs_image1);
     break;
     case 2:
     obstacles.addImage(obs_image2);
     break;
     case 3:
     obstacles.addImage(obs_image3);
     break;
     case 4:
     obstacles.addImage(obs_image4);
     break;
     case 5:
     obstacles.addImage(obs_image5);
     break;
     case 6:
     obstacles.addImage(obs_image6);
     break;
     default:break;
 } 
  obstacles.lifetime=(width+10)/4;
  obstacles.scale=0.4;
   obstaclesGroup.add(obstacles);
 }
function spawn_reset(){
reset1=createSprite(width-190,height-20,20,20);
  reset2=createSprite(width-170,height+20,20,20);
  
  reset1.addImage(resetImage1);
  reset2.addImage(resetimage2);
}
