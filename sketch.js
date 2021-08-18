const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var balls=[]
var boats=[];
var boatAnimation=[];

var engine, world;

function preload(){
    backgroundImg=loadImage("assets/background.gif");
    boatSpriteData=loadJSON("assets/boat/boat.json");
    boatSpriteSheet=loadImage("assets/boat/boat.png");

}


function setup(){
    var canvas = createCanvas(1200,600);
    engine = Engine.create();
    world = engine.world;
    tower= new Tower(150,350,160,330);
    ground=new Ground(0,height-1,width*2,1);
    cannon=new Cannon(180,110,100,50,-PI/3);

    var boatFrames = boatSpriteData.frames;
    for (var i = 0; i < boatFrames.length; i++) {
        var pos = boatFrames[i].position;
        var img = boatSpriteSheet.get(pos.x, pos.y, pos.w, pos.h);
        boatAnimation.push(img);
    }

    
}

function draw(){
    background(180);
    image(backgroundImg,0,0,width,height);
    Engine.update(engine);
    ground.display();

    showBoats();
    tower.display();
    cannon.display();

    for(var i=0;i<balls.length;i++){
        showCannonballs(balls[i],i);
        for(var j=0;j<boats.length;j++){
            if(balls[i]!==undefined && boats[j]!==undefined){
                var collision=Matter.SAT.collides(balls[i].body,boats[j].body);
                if(collision.collided){
                    boats[j].remove(j);
                    Matter.World.remove(world,balls[i].body);
                    balls.splice(i,1);
                    i--
                }
            }
        }
    }
}

function keyReleased(){
    if(keyCode===DOWN_ARROW){
        balls[balls.length-1].shoot();
    }

}

function showCannonballs(ball,index){
    ball.display();
    if(ball.body.position.x>=width || ball.body.position.y>=height-50){
        Matter.World.remove(world,ball.body);
        balls.splice(index,1)
    }
    
}

function showBoats() {
    if (boats.length > 0) {
        if ( boats.length < 4 && boats[boats.length - 1].body.position.x < width - 300 ) {
            var positions = [-130, -100, -120, -80];
            var position = random(positions);
            var boat = new Boat(width,height - 100, 200, 200, position,boatAnimation);
            boats.push(boat);
        }
        for (var i = 0; i < boats.length; i++) {
            Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
            boats[i].display();
            boats[i].animate();
        }
    } else {
            var boat = new Boat(width, height - 100, 200, 200, -100,boatAnimation);
            boats.push(boat);
    }
}

function keyPressed(){
    if(keyCode===DOWN_ARROW){
        cannonball=new Cannonball(cannon.x,cannon.y);
        cannonball.trajectory=[];
        Matter.Body.setAngle(cannonball.body,cannon.angle);
        balls.push(cannonball);
    
    }
    

}