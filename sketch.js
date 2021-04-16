// Make Your Own Game - 1
// Made By Shivanshu Pattnaik

// Sprites
// Edge Sprites
var edges;
// Object Sprites
var bg, earth, spaceship;
var earthLife1, earthLife2, earthLife3, spaceshipLife1, spaceshipLife2, spaceshipLife3;
// For counting how many times the asteroid is touching the player;
var num1 = 0, num2 = 0;
// Image Sprites
var bgImg, earthImg, spaceshipImg, laserImg, lifeImg, asteroidImg;
// Group Sprites
var laserGroup, asteroidGroup;
// Game State
var gameState = "play";

function preload() {

  earthImg = loadImage("img/earth.png");
  bgImg = loadImage("img/space.jpg");
  spaceshipImg = loadImage("img/space_ship.png");
  laserImg = loadImage("img/laser.png");
  asteroidImg = loadImage("img/asteroid.png");
  lifeImg = loadImage("img/life.png");

}

function setup() {

  createCanvas(1300, 600);

  edges = createEdgeSprites();

  laserGroup = createGroup();
  asteroidGroup = createGroup();

  bg = createSprite(650, 300, 2000, 1000);
  bg.addImage(bgImg);
  bg.scale = 1;
  bg.velocityX = -10;

  earth = createSprite(-130, 300, 200, 200);
  earth.addImage(earthImg);

  spaceship = createSprite(270, 300, 20, 20);
  spaceship.addImage(spaceshipImg);
  spaceship.scale = 0.4;

  // Lives
  spaceshipLife1 = createSprite(270, 40, 10, 10);
  spaceshipLife1.addImage(lifeImg);
  spaceshipLife1.scale = 0.1;
  
  spaceshipLife2 = createSprite(330, 40, 10, 10);
  spaceshipLife2.addImage(lifeImg);
  spaceshipLife2.scale = 0.1;
  
  spaceshipLife3 = createSprite(390, 40, 10, 10);
  spaceshipLife3.addImage(lifeImg);
  spaceshipLife3.scale = 0.1;

  earthLife1 = createSprite(770, 40, 10, 10);
  earthLife1.addImage(lifeImg);
  earthLife1.scale = 0.1;
  
  earthLife2 = createSprite(830, 40, 10, 10);
  earthLife2.addImage(lifeImg);
  earthLife2.scale = 0.1;
  
  earthLife3 = createSprite(890, 40, 10, 10);
  earthLife3.addImage(lifeImg);
  earthLife3.scale = 0.1;

}

function draw() {

  background("purple");

  if(gameState === "play") {
  
    spaceship.y = mouseY;
    spaceship.bounceOff(edges);
  
    if(mousePressedOver(bg)) {
      spawnLaser();
    }
  
    if(frameCount % 50 === 0) {
      spawnAsteroid();
    }
  
    if(laserGroup.isTouching(asteroidGroup)) {
      asteroidGroup.destroyEach();
      laserGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 0) {
      num1 = 1;
      spaceshipLife3.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 1) {
      num1 = 2;
      spaceshipLife2.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(spaceship) && num1 === 2) {
      num1 = 3;
      spaceshipLife1.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 0) {
      num2 = 1;
      earthLife3.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 1) {
      num2 = 2;
      earthLife2.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(asteroidGroup.isTouching(earth) && num2 === 2) {
      num2 = 3;
      earthLife1.visible = false;
      asteroidGroup.destroyEach();
    }
  
    if(num1 === 3 || num2 === 3) {
      gameState = "over";
    }
  }

  drawSprites();

  if(bg.x <= 340) {
    bg.x = width/2
  }

  if(gameState === "over") {
  
    spaceship.destroy();

    textSize(50);
    textFont("consolas");
    fill("white");
    text("GAME OVER", 500, 300);
    textSize(30);
    text("PLEASE RELOAD THE PAGE TO PLAY THE GAME AGAIN!", 250, 400);

  }

  // Text
  textSize(30);
  textFont("Verdana");
  fill("white");
  text("YOUR LIVES : ", 20, 50);
  text("EARTH LIVES : ", 500, 50);

}

function spawnLaser() {

  var laser = createSprite(420, spaceship.y, 30, 10);
  laser.addImage(laserImg);
  laser.scale = 0.04;
  laser.velocityX = 7;
  laser.lifetime = 130;

  laserGroup.add(laser);

}

function spawnAsteroid() {

  var asteroid = createSprite(1350, Math.round(random(50, 550)), 50, 50);
  asteroid.addImage(asteroidImg);
  asteroid.scale = 0.05;
  asteroid.velocityX = -25;

  asteroidGroup.add(asteroid);

}