
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var intColor =  document.getElementById('color'); // id input color
var intSize = document.getElementById('size'); // id input size
var painting = document.getElementById('container'); // id of div inside of is vanvas

// canvas take the same size as parent div
var paint_style = getComputedStyle(painting); // take all css values
canvas.width = parseInt(paint_style.getPropertyValue('width')); 
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0, size: 0, color: 0 };

 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
  console.log(mouse.x + " " + mouse.y);
});

mouse.color = getColor();
mouse.size  = getSize();

function getColor() {
	return "#"+intColor.value;
}

function getSize() {
	return intSize.value;
}

canvas.addEventListener('click', function() {
	mouseDraw();
});

function mouseDraw() {
	ctx.beginPath();
	ctx.arc(mouse.x,mouse.y,mouse.size,0,Math.PI*2, true);
	ctx.fillStyle = mouse.color;
	ctx.fill();
	ctx.closePath();

}

// function mouseMove() {
// 	ctx.clearRect(0,0,canvas.width,canvas.height);
// 	ctx.beginPath();
// 	ctx.arc(mouse.x,mouse.y,mouse.size,0,2*Math.PI,true);
// 	ctx.fillStyle = mouse.color;
// 	ctx.fill();
	
// }
// mouseMove();

canvas.addEventListener('mousedown', function(e) {
	canvas.addEventListener('mousemove', mouseDraw );
	//requestAnimationFrame();
 	
 });

canvas.addEventListener('mouseup', function() {
	canvas.removeEventListener('mousemove', mouseDraw);
		
});

canvas.addEventListener('mouseleave', function() {
	canvas.removeEventListener('mousemove', mouseDraw);
});

// events to buttons and inputs

document.getElementById('eraser_all').addEventListener("click", function() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
});
document.getElementById('eraser').addEventListener("click", function() {
	mouse.color = "#ffffff";
	mouse.size = 35;
});

intColor.addEventListener("focusout", function() {
	mouse.color = getColor();
});

intSize.addEventListener("focusout", function() {
	var a = getSize();
	if(!(!isNaN(parseFloat(a)) && isFinite(a))) {
		alert("Size must be a number!");
	} else {
		mouse.size = a;
	}

});

// end
