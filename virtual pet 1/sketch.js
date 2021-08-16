//Create variables here
var dog, happydog;
var foodS, foodStock;
var database;
var dogImg, happydogImg;
var milk, milk_Img;
var lastFed;
var foodObj, fedTime;
var changinggameStates, reading,gameStates;
var bedroomImg, washroomImg, gardenImg;
function preload()
{
	//load images here
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
  milk_Img = loadImage("images/Milk.png");
  bedroomImg = loadImage("virtual pet images/Bed Room.png");
  washroomImg = loadImage("virtual pet images/Wash Room.png");
  gardenImg = loadImage("virtual pet images/Garden.png");
}

function setup() {
	createCanvas(700, 500);
  database=firebase.database();
  
  foodObj = new Food();

  dog = createSprite(500,200);
  dog.scale = 0.2;
    dog.addImage(dogImg);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  })


  foodStock = database.ref('Food')
  foodStock.on("value",readStock)
  foodStock.set(20);

  feed = createButton("Feed the dog");
  feed.position(820,400);
  feed.mousePressed(feedDog);

  addFood = createButton("Add the Food");
  addFood.position(930,400);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46, 139, 87);



currentTime = hour();
if(currentTime==(lastFed+1)){
  update("Playing");
  background(gardenImg,550,500);
}else if(currentTime==(lastFed+2)){
  update("Sleeping");
  background(bedroomImg,550,500);
}else if(currentTime>(lastFed+2)&& currentTime<=(lastFed+4)){
  update("Bathing");
  background(washroomImg,550,500);
}else{
  update("Hungry");
  foodObj.display();
}


foodObj.display();

fedTime = database.ref('FeedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
})

console.log(lastFed);

  drawSprites();
  
  fill(255,255,254);
  textSize(15);
  
    textSize(20);
    fill("black");
    text("Food Remaining: " +foodS,500,30);
  
    if(gameState!="Hungry") {
      feed.hide();
      addFood.hide();
      dog.remove();
      }
}

function readStock(data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happydogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
    }
    function addFoods() {
      
      foodS++;
      database.ref('/').update({
        Food:foodS
      })
    }
function update(state){
  database.ref('/').update({
    gameState:state
  });
}

 