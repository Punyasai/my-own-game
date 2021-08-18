class Boat{
    constructor(x, y,width,height,boatPos,boatAnimation) {
        var options = {
            restitution:0.8,
            friction:1.0,
            density:1.0,
        }
        this.body = Bodies.rectangle(x, y,width,height,options);
        this.width=width;
        this.height=height;
        this.boatPos=boatPos;
        this.Animation=boatAnimation;
        this.image = loadImage("assets/boat.png");
        World.add(world, this.body);
          
      }

      remove(index){
        Matter.World.remove(world,boats[index].body);
        boats.splice(index,1);

      }

      animate(){
        this.speed+=0.05%1.1;
      }
      
      display(){
        var angle = this.body.angle;
        var index = floor(this.speed%this.Animation.length);
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.Animation[index], 0, this.boatPos, this.width, this.height);
        pop();
      }
}