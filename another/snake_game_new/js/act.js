$(document).ready(function() {

	//--create canvas--
 	var canvas = $("#canvas")[0];
 	var ctx = canvas.getContext("2d"); 
 	var w = $("#canvas").width();
 	var h = $("#canvas").height();

 	var cell_size = 15;
 	var direction;

 	



 	//--create snake--
 	var snake_array = [];
	function create_snake(num) {
		var snake_size = num;
		for(var i = snake_size-1; i >=0; i--) {
			snake_array.push({x:i, y:0});
		}
	}

	
	
	function init() {
		direction = 'right';
		create_snake(5);

	}

	init();

//direction in which snake would go
	


	function paint_canvas() {
		ctx.fillStyle = "#fff";
	 	ctx.fillRect(0,0,w,h);
	 	ctx.strokeStyle = "#000";
	 	ctx.strokeRect(0,0,w,h);
	}

	

	//--paint snake--
	function paint_snake() {
	 	paint_canvas();		
		var nx = snake_array[0].x;
 		var ny = snake_array[0].y;

		switch (direction) {
 			case 'right':
 				nx++;
 				break;
 			case 'left':
 				nx--;
 				break;
 			case 'up':
 				ny++;
 				break;
 			case 'down':
 				ny++;
 				break;		
 			default:
 				nx++;
 				break;
 		}
	

 		var tail = snake_array.pop();
		tail.x = nx; tail.y = ny;

		snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			ctx.fillStyle = "blue";
			ctx.fillRect(c.x*cell_size, c.y*cell_size,cell_size,cell_size);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*cell_size, c.y*cell_size,cell_size,cell_size);
		}

	}





	var game_loop = setInterval(paint_snake,100);



});