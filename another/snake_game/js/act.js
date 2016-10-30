$(document).ready(function() {
 	//canvas stuff

 	var canvas = $("#canvas")[0];
 	var ctx = canvas.getContext("2d");
 	var w = 540;
 	var h = 540;
 	var cw = 15;
 	var d;
 	var snake_array;
 	var food;
 	var score;
 	var game_loop;
 	var timing;
 	function init() {
 		$("#message").css("display","none");
 		timing=250;
 		d = "right";
 		create_snake();
 		create_food();
 		score = 1;
 		if(typeof game_loop != "undefined")
 			clearInterval(game_loop);
 		game_loop = setInterval(paint,timing);
 	}

 	init();

 	function lose() {
 		clearInterval(game_loop);
 		$("#message").css("display","block");
 		$("#again").on("click", init);
 	}
 
 	function create_snake() {
 		var length = 5;
 		snake_array = [];

 		for(var i = length-1; i >=0; i--) {
 			snake_array.push({x:i, y:0});
 		}
 	}
 	

 	function paint() {
 		ctx.fillStyle = "#ffffff";
	 	ctx.fillRect(0,0,w,h);
	 	ctx.strokeStyle = "#000";
	 	ctx.strokeRect(0,0,w,h);

 		var nx = snake_array[0].x;
 		var ny = snake_array[0].y;
 		

 		if(d == "right") nx++;
 		else if(d == "left") nx--;
 		else if(d == "up") ny --;
 		else if(d == "down") ny++;

 		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || 
 			check_collision(nx,ny,snake_array)) {

 			snake_array.unshift(nx,ny);
 			for(var i = 0; i < snake_array.length; i++) {
 			var c = snake_array[i];
 			ctx.fillStyle = "#e25178";
 			ctx.fillRect(c.x*cw,c.y*cw,cw,cw);
 			ctx.strokeStyle = "#912e48";
 			ctx.strokeRect(c.x*cw,c.y*cw,cw,cw);
 			}
 			lose();

 		}


 		if(nx == food.x && ny == food.y) {
 			var tail = {x:nx, y: ny};
 			create_food();
 			score++;
 			clearInterval(game_loop);
 			if(timing > 40) timing -= 20;
 			
 			game_loop = setInterval(paint,timing);

 		} else {
 			var tail = snake_array.pop();
 			tail.x = nx; tail.y = ny;
 		}

 		
 		

 		snake_array.unshift(tail);



 		for(var i = 0; i < snake_array.length; i++) {
 			var c = snake_array[i];
 			ctx.fillStyle = "#e25178";
 			ctx.fillRect(c.x*cw,c.y*cw,cw,cw);
 			ctx.strokeStyle = "#912e48";
 			ctx.strokeRect(c.x*cw,c.y*cw,cw,cw);
 		}


 		paint_cell(food.x,food.y);

 		var score_text = "Score: " + score;
 		ctx.fillStyle = "#e25178";
 		ctx.font = "20px Arial";
 		ctx.fillText(score_text,5,h-5);
 		
 	}




 	$(document).keydown(function(e) {
 		var key = e.which;
 		
 			if(key == "38" && d!= "down") d = "up";
 			else if(key == "40" && d!="up") d = "down";
 			else if(key == "37" && d!="right") d = "left";
 			else if(key == "39" && d!="left") d = "right";
 		
 		
 		
 	});

 	

 	function check_collision(x,y,array) {
 		for(var i = 0; i < array.length; i++) {
 			if(array[i].x == x && array[i].y == y) {
 				return true;
 			}
 		}

 		return false;
 	}

 	function create_food() {
 		food = {
 			x:Math.round(Math.random()*(w-cw)/cw),
 			y:Math.round(Math.random()*(h-cw)/cw)
 		};
 		
 	}

 	function paint_cell(x,y) {
 		ctx.fillStyle = "#e25178";
 		ctx.fillRect(x*cw,y*cw,cw,cw);
 		ctx.strokeStyle = "#912e48";
 		ctx.strokeRect(x*cw,y*cw,cw,cw);
 	}

 	


});