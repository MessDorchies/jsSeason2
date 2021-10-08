let c = document.getElementById("gameField");
let ctx = c.getContext("2d");
c.width = innerWidth - 20;
c.height = innerHeight -20;
let scoreCont = document.getElementById("score");

class Player{

    constructor(radius,color){
        this.x = c.width / 2;
        this.y = c.height;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Projectile {

    constructor(x,y,radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

class Enemie {
    constructor(x,y,radius, color, velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    move(){
        this.draw();
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
    }
}

const player = new Player(25,'red');
const projectiles = [];
const enemies = [];

function spawn(){
    setInterval(() => {
        let x = Math.random()*c.width;
        let y = 0;
        const radius = 10;
        const color = `hsl(${Math.random()*360},50%,50%)`;
        const angle = Math.atan2(c.height - y,c.width/2 - x);
        const velocity = {
            x : Math.cos(angle),
            y : Math.sin(angle)
        }
        enemies.push(new Enemie(x,y,radius,color,velocity))

    },1000)
}
let timeRemaining = 60;
let score = 0;
scoreCont.innerHTML = "Your current score : " + score;
let gameOn = true;
let life = 3;
function animate(){
    if(gameOn === true){
        requestAnimationFrame(animate);
    }
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillRect(0,0,c.width,c.height);
    player.draw();
    projectiles.forEach((projectile) => {
        projectile.move()
    });
    enemies.forEach((enemy,index) =>{
        enemy.move()
        const distance = Math.hypot(player.x - enemy.x, player.y - enemy.y);
        if((distance - enemy.radius - player.radius) < 1){
            life--;
            setTimeout(() => {
            enemies.splice(index,1)
            },0)
            if (life === 0){
                gameOn = false;
            }
        }
        projectiles.forEach((projectile, projIndex) => {
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if( (distance - enemy.radius - projectile.radius) < 1){
                score+=10;
                scoreCont.innerHTML = "Your current score : " + score;
                console.log(score);
                setTimeout(() => {
                    enemies.splice(index,1);
                    projectiles.splice(projIndex,1)
                }, 0)
            }
        })
    } );
}

window.addEventListener('click', (event) => {
    const angle = Math.atan2(event.clientY- c.height, event.clientX -c.width/2);
    const velocity = {
        x : Math.cos(angle)*4,
        y : Math.sin(angle)*4
    }
    projectiles.push(new Projectile(c.width/2, c.height, 5, 'yellow', velocity));
})
spawn();
animate();
