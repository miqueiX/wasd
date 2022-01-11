
var rex,rex_img;
var bordas;
var chao, chao_img;
var chaofalso
var nuvem,nuvem_img;
var obstaculo;
var pontuacao = 0;
var gruponuvem
var grupoobstaculo
var JOGAR = 1;
var FIM = 2;
var modojogo = JOGAR;
var rexcaiu
var restart, restart_img;
var gameover, gameover_img;
var checkpoint;
var die;
var jump;


function preload(){
  nuvem_img = loadImage("cloud.png");

  rex_img = loadAnimation("trex1.png","trex3.png", "trex4.png");
  
  rexcaiu = loadImage("trex_collided.png");

  chao_img = loadImage("ground2.png");
  
  obs1_img = loadImage("obstacle1.png");
  obs2_img = loadImage("obstacle2.png");
  obs3_img = loadImage("obstacle3.png");
  obs4_img = loadImage("obstacle4.png");
  obs5_img = loadImage("obstacle5.png");
  obs6_img = loadImage("obstacle6.png");

  gameover_img = loadImage("gameOver.png");
  restart_img = loadImage("restart.png");

die = loadSound("die.mp3");
jump = loadSound("jump.mp3");
checkpoint = loadSound("checkPoint.mp3");
}

function setup(){
  
  //var alemao = Math.round(random(1,10))
  //console.log(alemao)
  createCanvas(windowWidth,windowHeight);
  
 

  rex = createSprite(50,height-100,10,10);
  rex.debug = false;
  rex.setCollider("circle",0,0,30);
  //rex.setCollider("circle",140,0,30);
  rex.addAnimation("running",rex_img);
  rex.addImage("morreu",rexcaiu);
  rex.scale = 0.5;
  
  chao = createSprite(width/2,height-10,width,10);
  chao.x = chao.width/2;
  chao.addImage(chao_img);
  bordas = createEdgeSprites();
 
  chaofalso = createSprite(width/2,height-4,width,10);
  chaofalso.visible = false; 
  
  gruponuvem = new Group();
  grupoobstaculo = new Group();

  gameover = createSprite(width/2,height/2 );
  gameover.addImage(gameover_img);
  restart = createSprite(width/2,height/2+40);
  restart.addImage(restart_img);

  


}

function draw(){
  background('white');

   
 //if(rex.isTouching (chao))
  
  
  
  //console.log(rex.y);

   
  //gravidade
  
  
  rex.collide(chaofalso);

 
  text("Pontos: "+ pontuacao,width/2+200,height/2+100);
  
  


  
  

  if(modojogo === JOGAR){
    if(touches.length>0 && rex.y> height-33                                 ){
      rex.velocityY = -15;
      jump.play();
      touches=[];
    }
    rex.velocityY = rex.velocityY + 1;

    chao.velocityX = -5 - pontuacao/100;
   
    pontuacao = pontuacao+Math.round(frameRate()/60);

    if(chao.x<0){
      chao.x = chao.width/2;
      
    }
    
    if(pontuacao%100 === 0 && pontuacao > 0){
       checkpoint.play();
    }


 


    
    crianuvem(); 

    obstaculos();

   if(rex.isTouching(grupoobstaculo)){
    //rex.velocityY = -10;
    //jump.play();
    modojogo = FIM;
    die.play();
    
   }
   gameover.visible = false;
   restart.visible = false;
  }

  else if(modojogo === FIM){
     chao.velocityX = 0;
     rex.changeAnimation("morreu");
     rex.velocityY = 0;
     grupoobstaculo.setVelocityXEach(0);
     gruponuvem.setVelocityXEach(0);
     grupoobstaculo.setLifetimeEach(-1);
     gruponuvem.setLifetimeEach(-1);
     gameover.visible = true;
     restart.visible = true;
     if (touches.length>0){
     modojogo = JOGAR;
     touches=[];
     reseta(); 
     }

  }


 drawSprites();
}

function crianuvem(){
if(frameCount%60 === 0){
  nuvem = createSprite(width+20,height-120,10,10);
  nuvem.y = Math.round(random(height-190,height-100));
  nuvem.velocityX = -3;
  nuvem.addImage("nuvem",nuvem_img);
  nuvem.scale = 0.5;
  rex.depth = nuvem.depth;
  rex.depth = rex.depth+1;
  nuvem.lifetime = width+22;
  gruponuvem.add(nuvem);
}
} 

function obstaculos(){
if(frameCount%60 === 0){
obstaculo = createSprite(width+20,height-15,width,10);
obstaculo.velocityX = -(5 + pontuacao/100);

var num = Math.round(random(1,6));
switch(num){
  case 1:obstaculo.addImage( obs1_img);
  break;
  case 2:obstaculo.addImage( obs2_img);
  break;
  case 3:obstaculo.addImage( obs3_img);
  break;
  case 4:obstaculo.addImage( obs4_img);
  break;
  case 5:obstaculo.addImage( obs5_img);
  break;
  case 6:obstaculo.addImage( obs6_img);
  break;
}
obstaculo.scale = 0.5;
obstaculo.lifetime = width+20;
grupoobstaculo.add(obstaculo);
}



} 
function reseta(){
grupoobstaculo.destroyEach();
gruponuvem.destroyEach();
pontuacao = 0;    
rex.changeAnimation("running",rex_img); 
           
};
