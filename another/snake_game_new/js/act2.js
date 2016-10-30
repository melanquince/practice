$(document).ready(function() {
	//create a canvas
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");

	//width and height of canvas
	var h = canvas.height;
	var w = canvas.width;

	// size of each cell on canvas
	var c_sz = 15;

	 // for string of the direction in which the snake need to go
	var direction;

	//colors
	var blue = "#2c71e0";
	var black_blue = "#1b53ad";
	var red = "#ed5d53";

	//for setInterval
	var game_loop; 

	//need for creating the snake, hold each coordinate of each part of the snake
	var snake_array = []; 
	var snake_array_last = [];
	//for determine size of the snake
	var snake_size = 5;

	//for random coordinates of the food
	var food_coordinates;

	//for score of the game
	var score;

	//for not allow press 2 keys at the same time 
	var press_acs = 1;

	function paint_canvas() {
		ctx.fillStyle = "#fff";
		ctx.fillRect (0,0,w,h);
		ctx.strokeStyle = "#000";
		ctx.strokeRect(0,0,w,h);
	}
	
	function create_snake() {
		for(var i = snake_size-1; i >=0; i-- ) {
			snake_array.push({x:i,y:0});
			snake_array_last.push({x:i,y:0});	
		}
	}

	//snake change the coordinates depend on a direction
	//also moving (delete the previous cell and add new)
	function move_snake(string) {
		var nx = snake_array[0].x;
 		var ny = snake_array[0].y;

		switch(string) {
			case 'up': ny--; break;
			case 'down': ny++; break;
			case 'right': nx++; break;
			case 'left': nx--; break;
			default: nx++; break;	
		}


		//eat food
		if(nx == food_coordinates.x && ny == food_coordinates.y) {
			make_food();
			draw_food();
			score++;
			snake_array.unshift({x:nx,y:ny});
		} else {
			snake_array.unshift({x:nx,y:ny});
			snake_array_last = [];
			snake_array_last.push(snake_array.pop());
			
		}
		
	}

	function draw_snake() {
		for(var i = 0; i < snake_array.length; i++) {
			var c = snake_array[i];
			if(i == 0) {
				ctx.fillStyle = black_blue;
			} else {
				ctx.fillStyle = blue;
			}
			ctx.fillRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
			ctx.strokeStyle = "white";
			ctx.strokeRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
		}
	}

	//if snake hit a boarder or itself
	function hit() {
		var nx = snake_array[0].x;
 		var ny = snake_array[0].y;
 		//hit border
		if(nx == -1 || ny == -1 || nx == w/c_sz || ny == h/c_sz) {
			lose();
		}

		//hit itself
		for(var i = 1; i < snake_array.length; i++) {
			if(snake_array[i].x == nx && snake_array[i].y == ny) {
				lose();
			}
		}
	}

	function make_food() {
		var cx = Math.round(Math.random()*(w-c_sz)/c_sz);
		var cy = Math.round(Math.random()*(h-c_sz)/c_sz);
		
		food_coordinates = {x:cx, y:cy};
		for(var i = 0; i < snake_array.length; i++) {
			if(snake_array[i] == food_coordinates) {
				make_food();
			}
		}
	}

	function draw_food() {
		var c = food_coordinates;
		ctx.fillStyle = red;
		ctx.fillRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
		ctx.strokeStyle = "white";
		ctx.strokeRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
	}

	function show_score() {
		ctx.font="18px Arial";
		ctx.fillStyle = blue;
		ctx.fillText("Score: " + score, 5,h-5);
	}

	function last_position() {
		for(var i = 1; i < snake_array.length; i++) {
			snake_array_last.push(snake_array[i]);
		}	
			paint_canvas();
				for(var i = 0; i < snake_array_last.length; i++) {
					var c = snake_array_last[i];
					if(i == 1) {
						ctx.fillStyle = black_blue;
					} else {
						ctx.fillStyle = blue;
					}
					ctx.fillRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
					ctx.strokeStyle = "white";
					ctx.strokeRect(c.x*c_sz,c.y*c_sz,c_sz,c_sz);
				}
				draw_food();

	}


	function lose() {
		clearInterval(game_loop);
		last_position();
		$("#message").css("display","block");

	}


	// paint everything
	function paint() {
		paint_canvas();
			function game() {
				press_acs = 1;
				draw_food();
				move_snake(direction);
				draw_snake();
				hit();
				show_score();
				
			}
			
			autopilot('yes');
			game();
	}

	//activate the keyboard and providing an ability for changing a direction of the snake
	function activeKeyboard () {
		$(document).keydown(function(e) {

		var key = e.which;
		if(key == "38" && direction!= "down") {
			if(press_acs == 1)  {
				direction = "up";
				press_acs = 0; 
			}	
		} 
		else if(key == "39" && direction!= "left") {
			if(press_acs == 1)  {
				direction = "right";
				press_acs = 0; 
			}	
		}
		else if(key == "40" && direction!= "up") {
			if(press_acs == 1)  {
				direction = "down";
				press_acs = 0; 
			}	
		}
		else if(key == "37" && direction!= "right") {
			if(press_acs == 1)  {
				direction = "left";
				press_acs = 0; 
			}	
		}	
		});
	}

	//activate all functions, start of programme
	function init() {
		score = 0;
		direction = "right";
		snake_array = [];
		create_snake();
		make_food();
		activeKeyboard();
		$("#message").css("display","none");
		game_loop = setInterval(paint,100);
	}

	init(); // actual start of programme
	
	$("#again").on("click", init);





	//------------AUTOPILOT------------------





	function autopilot(access) {
	if(access = 'yes') {


		function check_free(cx,cy) {
			console.log('get positon:' + "x:" + cx + ", y:"+ cy);
			for(var i = 1; i < snake_array.length; i++) {
				
				if(cx == snake_array[i].x && cy == snake_array[i].y) {
					console.log("---check_free() return true---");
					return true;
				}	
			}
			console.log("return false");
			return false;
			
		}




		var goal = food_coordinates; 
		var position = snake_array[0];

		console.log("x:" + position.x + ", y:" + position.y);


		if(goal.y > position.y) {
			if(direction == 'up') {
				if(position.x + c_sz !== w) {
					if(!(check_free(position.x-1,position.y)) && position.x - c_sz !== 0) {
						direction = 'left';
					} 
					else {
						if(!(check_free(position.x+1,position.y))) {
							direction = 'right';
						}
					}
				} 
				else {
					if(!(check_free(position.x-1,position.y))) {
						direction = 'left';
					} 
				}
			} 
			else {
				if(!(check_free(position.x,position.y+1))) {
						direction = 'down'; // goal
				} 
				else {
					if(!(check_free(position.x-1,position.y)) && position.x + c_sz !== w) {
						direction = 'left';
					} 
					else {
						if(!(check_free(position.x+1,position.y)) && position.x - c_sz !== 0) {
							direction = 'right';
						} 
						else {
							if(!(check_free(position.x,position.y-1))) {
									direction = 'up'; 
							} 
						}
					}	
				}
			}
		}

		else if(goal.x > position.x) {
			if(direction == 'left') {
				if(position.y + c_sz !== h) {
					if(!(check_free(position.x,position.y - 1)) && position.y - c_sz !== 0) {
						direction = 'up';
					} 
					else {
						if(!(check_free(position.x,position.y + 1))) {
							direction = 'down';
						}
					}
				} 
				else {
					if(!(check_free(position.x,position.y-1))) {
						direction = 'up';
					} 
				}
			} 
			else {
				if(!(check_free(position.x+1,position.y))) {
						direction = 'right'; // goal
				} 
				else {
					if(!(check_free(position.x,position.y+1)) && position.y + c_sz !== w) {
						direction = 'down';
					} 
					else {
						if(!(check_free(position.x,position.y-1)) && position.y - c_sz !== 0) {
							direction = 'up';
						} 
						else {
							if(!(check_free(position.x-1,position.y))) {
									direction = 'left'; 
							} 
						}
					}	
				}
			}
		}


		

		else if(goal.y < position.y) {
			if(direction == 'down') {
				if(position.x + c_sz !== w) {
					if(!(check_free(position.x-1,position.y)) && position.x - c_sz !== 0) {
						direction = 'left';
					} 
					else {
						if(!(check_free(position.x+1,position.y))) {
							direction = 'right';
						}
					}
				} 
				else {
					if(!(check_free(position.x-1,position.y))) {
						direction = 'left';
					} 
				}
			} 
			else {
				if(!(check_free(position.x,position.y-1))) {
						direction = 'up'; // goal
				} 
				else {
					if(!(check_free(position.x-1,position.y)) && position.x - c_sz !== 0) {
						direction = 'left';
					} 
					else {
						if(!(check_free(position.x+1,position.y)) && position.x + c_sz !== w) {
							direction = 'right';
						} 
						else {
							if(!(check_free(position.x,position.y+1))) {
									direction = 'down'; 
							} 
						}
					}	
				}
			}
		}

		

		else if(goal.x < position.x) {
			if(direction == 'right') {
				if(position.y + c_sz !== h) {
					if(!(check_free(position.x,position.y - 1)) && position.y - c_sz !== 0) {
						direction = 'up';
					} 
					else {
						if(!(check_free(position.x,position.y + 1))) {
							direction = 'down';
						}
					}
				} 
				else {
					if(!(check_free(position.x,position.y-1))) {
						direction = 'up';
					} 
				}
			} 
			else {
				if(!(check_free(position.x-1,position.y))) {
						direction = 'left'; // goal
				} 
				else {
					if(!(check_free(position.x,position.y+1)) && position.y + c_sz !== w) {
						direction = 'down';
					} 
					else {
						if(!(check_free(position.x,position.y-1)) && position.y - c_sz !== 0) {
							direction = 'up';
						} 
						else {
							if(!(check_free(position.x+1,position.y))) {
									direction = 'right'; 
							} 
						}
					}	
				}
			}
		}
	}
	}







});