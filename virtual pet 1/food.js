class Food {
    constructor() {
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        this.lastFed;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    getFedTime(latFed) {
        this.lastFed = lastFed;
    }

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock = this.foodStock-1;
        }
    }

    getFoodStock() {
        return this.foodStock;
    }

    
        
    

    display() {
        var x=80, y=100;

        imageMode(LEFT)
        image(this.image,320,320,70,70);

        if(this.foodStock!=0) {
            for(var i=0;i<this.foodStock;i++) {
                if(i%10==0) {
                    x=80;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }

        if(lastFed>=12) {
            text("Last Feed : "+lastFed%12 + " PM", 350,30);
          }else if(lastFed==0) {
            text("Last Feed : 12 AM",300,30);
          }else{
            text("Last Feed : "+lastFed + " AM",300,30);
          }
          
        
    }
}