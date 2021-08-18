class Cannon{
    constructor(x, y, width, height,angle) {
        this.x=x;
        this.y=y;
        this.angle=angle;
        this.width = width;
        this.height = height;
        //this.cannonImage=loadImage("cannonball.png")

        }
      display(){
        if(keyIsDown(RIGHT_ARROW)&&this.angle<0.35)
      {
          this.angle+=0.02;
        }
        if(keyIsDown(LEFT_ARROW)&&this.angle>-1.45){
          this.angle-=0.02;
        }
      
        push();
        translate(this.x,this.y);
        rotate(this.angle);
        rect(-10, -20, this.width, this.height);
        pop();
        arc(this.x-30,this.y+90,140,190,PI,TWO_PI)

      }
}