//Create variables here
var dog,happydog,dogimg,happydogimg,database,foods,foodstock
function preload()
{
  //load images here
  dogimg=loadImage("images/dogImg.png");
  happydogimg=loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  dog=createSprite(250,250,10,10);
  dog.addImage(dogimg,0);
  dog.scale=1/5;
  foodstock=database.ref('food');
  foodstock.on("value",readstock);
}


function draw() {  
  background(46,139,87);
    if(foods>0){
    if(keyWentDown(UP_ARROW)){
      writestock(foods);
      dog.addImage(happydogimg,1);
    }
    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogimg,0);
    }
  }
  drawSprites();
  //add styles here
  fill("red");
  textSize(25);
  text(foods,450,100);
  text("Press the up arrow to feed Mr. Hippo",50,50);
}

function readstock(data){
  foods=data.val();
}

function writestock(x){
  x=x-1
  database.ref("/").update({food:x});
}