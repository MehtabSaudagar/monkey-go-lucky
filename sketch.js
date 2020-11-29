
var monkey , monkey_running,monk
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var PLAY=1;
var END=0;
var gameState=PLAY;
var survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monk=loadImage("monkey_0.png");
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400, 400);
  


  //creating monkey
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  monkey.addImage("stop",monk);
  // monkey.addImage(bananaImage)
   monkey.scale=0.1
  
  ground = createSprite(200,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);
    
  monkey.collide(ground);  
  
  
  //console.log(monkey.y);
  //monkey.debug=true;
  drawSprites();
    
  stroke("black");
  textSize(20);
  fill("black");
  
  text("Survival Time: "+ survivalTime, 20,80);
  text("Score: "+ score, 20,50)
  
  if (gameState===PLAY){
      if(ground.x<0) {
      ground.x=ground.width/2;
    }



      if(keyDown("space")&&monkey.y>310 ) {
        monkey.velocityY = -12;
      }
      monkey.velocityY = monkey.velocityY + 0.5;
      spawnFood();
      spawnObstacles();
      survivalTime=survivalTime+Math.ceil(frameRate()/60) 
      if(monkey.isTouching(FoodGroup)){  
      score=score+1;
        FoodGroup.destroyEach();
      }


      if(obstaclesGroup.isTouching(monkey)){

        gameState=END;
        textSize(25);
        monkey.changeImage("stop",monk);
        
        

      }
  }
  
  
  
  if(gameState===END){
    text("Game Over",160,180);
    text("Press r to restart",160,200);
    ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
    
    if(keyDown("r")){
      gameState=PLAY;
      score=0;
      monkey.changeAnimation("moving",monkey_running);
      obstaclesGroup.setLifetimeEach(0);
      FoodGroup.setLifetimeEach(0);
      monkey.y=350;
      survivalTime=0;
      
    }
    
  }
  
  
}



function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
    //add image to the obstacle 
    obstacle.addImage(obstaceImage);
    obstacle.scale=0.15;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
    obstacle.debug=true;
    obstacle.setCollider("circle",0,0,120)
  }
}
