// Creates a snowstorm on a canvas

function startSnowstorm() {
	var canvas = document.getElementById("home-canvas_snowstorm");
	var ctx = canvas.getContext("2d");
	
	var mp = 300;
	var particles = [];
	
	var W = window.innerWidth;
	var H = window.innerHeight;

	canvas.width = W;
	canvas.height = H;	

	for(var i = 0; i < mp; i++)
	{
		particles.push({
			x: Math.random()*W,      //x-coordinate
			y: Math.random()*H,      //y-coordinate
			r: Math.random()*2+0.5,  //radius
			d: Math.random()*mp      //density
		});
	}
	
	// Draw the snowflakes
	function draw()
	{	
		ctx.clearRect(0,0,W,H);
		ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
		ctx.beginPath();
		for(var i = 0; i < mp; i++)
		{
			var p = particles[i];
			ctx.moveTo(p.x, p.y);
			ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
		}
		ctx.fill();
		update();
	}

	var angle = 0;
	function update(){
		angle += 0.01;
		for(var i = 0; i < mp; i++){
			var p = particles[i];
			p.x += Math.sin(angle) * 5;
			p.y += Math.cos(angle + p.d) + 1 + p.r;
			
			if(p.x > W+5 || p.x < -5 || p.y > H){
				if(i%3 > 0){
					particles[i] = {x:Math.random()*W,y:-10,r:p.r,d:p.d};
				}
				else{
					if(Math.sin(angle) > 0){
						particles[i] = {x:-5,y:Math.random()*H,r:p.r,d:p.d};
					}
					else{
						particles[i] = {x:W+5,y:Math.random()*H,r:p.r,d:p.d};
					}
				}
			}
		}
	}
	
	setInterval(draw,33);
};
