
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var intColor =  document.getElementById('color'); // id input color
var intSize = document.getElementById('size'); // id input size
var painting = document.getElementById('container'); // id of div inside of is vanvas

// canvas take the same size as parent div
var paint_style = getComputedStyle(painting); // take all css values
canvas.width = parseInt(paint_style.getPropertyValue('width')); 
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = {x: 0, y: 0, size: getSize(), color: getColor()};

 
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
});

ctx.lineWidth = mouse.size;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = mouse.color;


function toRGBA(clr) {
	var clrArr = clr.split("");
		function toDecimal(num1,num2) {
			return parseInt((clrArr[num1] + clrArr[num2]),16);
		}
		var red = toDecimal(0,1);
		var green = toDecimal(2,3);
		var blue = toDecimal(4,5);
		return red+","+green +","+blue;
}

function getColor() {
	var opc="0.4";
	return "rgba("+toRGBA(intColor.value)+","+opc+")";
}

function getSize() {
	return intSize.value;
}

canvas.addEventListener('click', function() {
	mouseDraw();
});

function mouseDraw() {
	ctx.beginPath();
	ctx.arc(mouse.x,mouse.y,mouse.size/2,0,Math.PI*2, true);
	ctx.fillStyle = mouse.color;
	ctx.fill();
	ctx.closePath();

}

// events for canvas

canvas.addEventListener('mousedown', function(e) {
	ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    canvas.addEventListener('mousemove', onPaint);
 });

canvas.addEventListener('mouseup', function() {
	canvas.removeEventListener('mousemove', onPaint);
	canvas.removeEventListener('mousemove', mouseDraw);
		
});

canvas.addEventListener('mouseleave', function() {
	canvas.removeEventListener('mousemove', onPaint);
	canvas.removeEventListener('mousemove', mouseDraw);
});

var onPaint = function() {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
};


// events for buttons and inputs

document.getElementById('eraser_all').addEventListener("click", function() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
});
document.getElementById('eraser').addEventListener("click", function() {
	mouse.color = "#ffffff"
	mouse.size = 35;
	ctx.lineWidth = 35;
	ctx.strokeStyle = mouse.color;
	
});

intColor.addEventListener("focusout", function() {
	mouse.color = getColor();
	ctx.strokeStyle = mouse.color;

});

intSize.addEventListener("focusout", function() {
	var a = getSize();
	if(!(!isNaN(parseFloat(a)) && isFinite(a))) {
		alert("Size must be a number!");
	} else {
		mouse.size = a;
		ctx.lineWidth = mouse.size;
	}

});

// end
