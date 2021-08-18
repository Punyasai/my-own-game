class Cannonball{
    constructor(x, y) {
        var options = {
            restitution:0.8,
            friction:1.0,
            density:1.0,
            isStatic:true
        }
        this.body = Bodies.circle(x, y, 40,options);
        this.radius = 40;
        this.image = loadImage("assets/cannonball.png");
        this.trajectory=[];
        World.add(world, this.body);
          
      }
      shoot(){
          var velocity=p5.Vector.fromAngle(cannon.angle);
          velocity.mult(20)
          Matter.Body.setVelocity(this.body,{x:velocity.x,y:velocity.y});
          Matter.Body.setStatic(this.body,false)


      }

      display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.radius, this.radius);
        pop();
        if(this.body.velocity.x>0 && this.body.position.x>300){
          var position=[this.body.position.x,this.body.position.y]
          this.trajectory.push(position);

        }
       
        for(var i=0;i<this.trajectory.length;i++){
          image(this.image,this.trajectory[i][0],this.trajectory[i][1],5,5)
        }
      }
}