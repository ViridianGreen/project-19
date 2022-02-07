var bg, gummy,ground,sugarplum;
var heartGroup, candycaneGroup,starGroup;
var score,life,heartCount;
var restart = 0;
score = 0;
life = 3;
heartCount = 1;
var gamestate = start;

function preload(){
    bgImg = loadImage("bg2.jpg")
    bg2Img = loadImage("bg21.jpg")
    gummyImg = loadAnimation("gum.png","gummy.png");
    gumImg = loadAnimation("gum.png")
    candycaneImg = loadImage("candycane.png");
    heartImg = loadImage("heart.png");
    sugarplum = loadSound("sugarplum.mp3");
    starImg = loadImage("star.png");
    startImg = loadImage("start.png");
    gameOverImg = loadImage("gameOver.png");
    lifeImg = loadImage("life.png");
    boostImg = loadImage("boost.png");

    starSound = loadSound("starSound.mp3");
    lifeSound = loadSound("life.mp3");
    loseSound = loadSound("lose.mp3");
    heartSound = loadSound("heart.mp3")

    heartGroup = new Group();
    candycaneGroup = new Group();
    starGroup = new Group();
}

function setup() {
 bg = createSprite(825,280);
 bg.scale = 0.86
bg.addImage(bgImg);
bg2 = createSprite(2470,280);
bg2.scale = 0.86
bg2.addImage(bg2Img);

sugarplum.loop()

ground = createSprite(windowWidth/2,windowHeight-30,windowWidth,40);
ground.visible = false;

gummy = createSprite(130,520,20,20);
gummy.addAnimation("jumping",gumImg);
gummy.addAnimation("gummy",gummyImg);

gummy.scale = 0.5;

topBoundary = createSprite(windowWidth/2,10,windowWidth,20);
topBoundary.visible = false;

start = createSprite(windowWidth/2,windowHeight/2);
start.addImage(startImg);

gameOver = createSprite(windowWidth/2,windowHeight/2);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.5
gameOver.visible = false;


}

function draw() {
    createCanvas(windowWidth,windowHeight);

  gummy.collide(ground);
  gummy.collide(topBoundary)

 

  if(mousePressedOver(start) || (keyDown("UP_ARROW"))){
      gamestate = "play"
      gummy.visible = true;
      gameOver.visible = false;
      life = 3;
      score = 0;
      heartCount = 1;
  }

if(gamestate == "play"){
    start.visible = false;
  spawnCandycane()
  spawnheart()
  spawnStars()
    
    if(keyDown("space") && gummy.y>=330 && frameCount%4 == 0){
        gummy.velocityY = -20 ;
       } 
if(gummy.y>450){
    gummy.changeAnimation("gummy",gummyImg)
}
if(gummy.y<450){
    gummy.changeAnimation("jumping",gumImg)
}
     
    gummy.velocityY += 0.5;
       

   bg.velocityX = -3;
   bg2.velocityX = -3;
  if(bg.x<-810){
      bg.x=2470
  }
  if(bg2.x<-810){
      bg2.x = 2470
  }


  if(gummy.isTouching(heartGroup)){
      heartGroup.destroyEach();
      score+=10;
      heartCount+=1;
      lifeSound.play()
  }

  if(gummy.isTouching(candycaneGroup)){
    life-=1;
    candycaneGroup.destroyEach()
    gummy.y = 100;
    gummy.x = 130;
}
 
if(gummy.isTouching(starGroup)){
    starGroup.destroyEach();
    starSound.play()
 gummy.velocityX = 50;
 score+=1000;
 var boost = createSprite(windowWidth/2,windowHeight/2);
 boost.addImage(boostImg);
 boost.lifetime = 20;
}
if(gummy.x>825){
    gummy.x=130
    gummy.y = 100;
    gummy.velocityX = 0;
    gummy.velocityY = -20;
}

if(frameCount%5 == 0){
    score+=5;
}
if(heartCount % 6 === 0){
    life+=1;
    heartCount = 1;
    var life1 = createSprite(windowWidth/2,windowHeight/2);
 life1.addImage(lifeImg);
 life1.lifetime = 20;
 heartSound.play()
}

if(life == 0){
    gamestate = "end";
    end()
    loseSound.play()
    
}

  if(score>5000 && score<7000){
    bg.velocityX -= 5;
    bg2.velocityX -=5;

    }
    if(score>7000){
        bg.velocityX -= 5;
        bg2.velocityX -=5;
    
        }

}


drawSprites()

textSize(22);
stroke(0)
fill(0);
text("Score: "+score+"\nLives: "+life,1150,30)
}




function spawnCandycane(){
    if(frameCount%100 === 0){
        var candycane = createSprite(Math.round(random(250,800)),500);
        candycane.addImage(candycaneImg);
        candycane.scale = 0.16
        candycane.lifetime = 300;
        candycane.velocityX = -4;
        if(score>5000 && score<7000){
            candycane.velocityX = -9;
         }
         if(score>7000){
            candycane.velocityX = -14;
         }
        candycaneGroup.add(candycane);
        candycaneGroup.collide(ground)
       
    }
}

function spawnheart(){
    if(frameCount%120 === 0){
        var heart = createSprite(Math.round(random(250,800)),Math.round(random(100,windowHeight/4)));
        heart.lifetime = 300;
        heart.addImage(heartImg)
        heart.scale = 0.15
        heart.velocityX  = -4;
        if(score>5000 && score<7000){
            heart.velocityX = -9;
         }
         if(score>7000){
            heart.velocityX = -14;
         }
        heart.setCollider("circle",0,0,30)
        heart.debug = false;
        heartGroup.add(heart);
        
    }
}

function spawnStars(){
    if(frameCount%180 === 0){
    var star = createSprite(Math.round(random(250,800)),Math.round(random(100,windowHeight/4)));
    star.lifetime = 300;
    star.addImage(starImg)
    star.scale = 0.15
    star.velocityX  = -4;
    if(score>5000 && score<7000){
        star.velocityX = -9;
     }
     if(score>7000){
        star.velocityX = -14;
     }
    star.setCollider("circle",0,0,30)
    star.debug = false;
    starGroup.add(star)}
}

function end(){
    
    gummy.visible = false;
    gameOver.visible = true;
    bg.velocityX = 0;
    bg2.velocityX = 0;
    score = 0;
    starGroup.destroyEach();
    candycaneGroup.destroyEach()
    heartGroup.destroyEach()
}

function reset(){
    if(keyDown("UP_ARROW")){
    gamestate = "play"
    bg.velocityX = -3;
    bg2.velocityX = -3;
    spawnCandycane()
    spawnStars()
    spawnheart()}
}