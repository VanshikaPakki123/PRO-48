var lives = 3;
var gameState = "start"
var score = 0;
var count = 0;
var AlienAnimation
var Apple_img 
var Jungle_img
var Plant1_img
var Plant2_img

//loading the images
function preload()
{

  AlienAnimation = loadAnimation("images/alien_01.png", "alien_02.png", "alien_03.png", "alien_04.png","alien_05.png","alien_06.png",
  "alien_07.png","alien_08.png","alien_09.png","alien_10.png","alien_11.png","alien_12.png","alien_13.png");

  Plant1_img = loadImage("images/plant1.png");
  Plant2_img = loadImage("images/plant2.png");

  Apple_img = loadImage("images/apple.png");

  Jungle_img = loadImage("images/jungle.png");
}

function setup()
{
  //creating the canvas
  createCanvas(1200, 600);

  //creating the background
  wall = createSprite(300, 250, 600, 500);
  wall.addImage(Jungle_img);

  //creating thr ground 
  ground = createSprite(300, 480, 600, 50);
  ground.visible = false;

  //creating the alien
  Alien = createSprite(20, 385, 20, 60);
  Alien.addAnimation("running",AlienAnimation);

  obstaclesGroup = createGroup();
  coinsGroup = createGroup();
  button = createSprite(400, 350, 100, 60)
  button.addImage("play", play);
  button.scale = 0.3;
  bricksGroup = createGroup();
  gameOver.scale = 0.5;
  gameOver.visible = false;

}

function draw() {
  //background("black");
  createEdgeSprites();
  
  if (gameState == "start") 
  {
    background("black");
    console.log("my game starts")
    Alien.visible = false;
    wall.visible = false;
    button.visible = true;
    Alien.depth = wall.depth+1

    obstaclesGroup.setVisibleEach(false);
    fill("white");
    textSize(20);
    text(" Welcome to the Alien Game By Vanshika !", 70, 46);
    text("Click on the button below to start", 60, 80);

     if (mousePressedOver(button)) {
      gameState = "play";
     }
   }

  if (gameState == "play") {
    button.visible = false;
    mario.visible = true;
    
    obstaclesGroup.setVisibleEach(true);
    wall.visible = true;
    wall.velocityX = -3;

    //making infinitely scrolling background
    if (wall.x < 0) {
      wall.x = 400;
    }

    //make Alien stay inside the screen
    if (Alien.x < 0) {
      Alien.x = 20
    }

    obstacles();
    spawnPlants();
    coins();

    Alien.displace(PlantsGroup);
  }

  if (gameState == "end") {
    wall.velocityX = 0;
    obstaclesGroup.setVisibleEach(false);
    obstaclesGroup.setVelocityXEach = 0;
    PlantsGroup.setVisibleEach(false);
    PlantsGroup.setVelocityXEach = 0;
    PlantsGroup.destroyEach()
    PlantsGroup.destroyEach()
    
    button.visible = false;
    ground.velocityX = 0
    wall.visible = false;
  }

  if (keyDown(UP_ARROW)) {
    Alien.velocityY = -9;
    Alien.velocityX = 0;
  }
  Alien.velocityY = Alien.velocityY + 0.8;
  Alien.collide(ground);

  for (var i = 0; i < obstaclesGroup.length; i++) {
    if (Alien.isTouching(obstaclesGroup.get(i))) {
      obstaclesGroup.get(i).destroy();
      lives = lives -1
      
    }
  }

  if (mousePressedOver(button2)) {
    reset();
  }

  if (wall.y < 0) {
    wall.y = 200;
  }
  for (var i = 0; i < ApplesGroup.length; i++) {
    if (Alien.isTouching(ApplesGroup.get(i))) {
      ApplesGroup.get(i).destroy();
      score = score + 2;
    }
  }

  drawSprites();

  // making the score
  textSize(20);
  fill("black");
  text("apples : " + score, 500, 20);
  text("lives"+lives,50,50)
}

function obstacles() {
  if (World.frameCount % 80 === 0) {
    var obstacle = createSprite(605, 450, 20, 20);
    //obstacle.debug = true;
    obstacle.addImage(Plant1_Img);
    obstacle.scale = 0.5;
    obstacle.velocityX = -4;
    obstaclesGroup.add(obstacle);

  }

}


function spawnPlants() {
  if (World.frameCount % 70 === 0) {
    var brick = createSprite(610, random(300, 500), 30, 30);
    brick.addImage(Plant2_Img);
    brick.velocityX = -2;

    PlantsGroup.add(planrs);
  }
}

function Apples() {
  if (World.frameCount % 100 === 0) {
    var apples = createSprite(610, random(200, 400), 30, 30);
    coin.addImage(Apple_Img);
    Apple.velocityX = -2;
    Apple.scale = 0.1;

    ApplesGroup.add(Apple);
    count = count + 1;
  }
}

function reset() {
  gameState = "start";
  console.log("reset")

  obstaclesGroup.setVisibleEach(false);
  PlantsGroup.setVisibleEach(false);
  Alien.visible = false
  AlienGroup.setVisibleEach(false);
  button2.visible=false;
  gameOver.visible = false;
  button.visible =true;
  lives = 3;
}