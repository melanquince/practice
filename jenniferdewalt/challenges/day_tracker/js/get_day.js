var sun = document.getElementById("day0");
var sunline = document.getElementById("line0");
var mon = document.getElementById("day1");
var monline = document.getElementById("line1");
var tue = document.getElementById("day2");
var tueline = document.getElementById("line2");
var wed = document.getElementById("day3");
var wedline = document.getElementById("line3");
var thu = document.getElementById("day4");
var thuline = document.getElementById("line4");
var fri = document.getElementById("day5");
var friline = document.getElementById("line5");
var sat = document.getElementById("day6");
var satline = document.getElementById("line6");

var dayScreen = document.getElementById("dayOfWeek");

var d = new Date();
var day = d.getDay();

if(day == 0) {
	changeLine(sun,sunline);
	dayScreen.innerHTML = "sunday... ready to work?";
} else if (day == 1) {
	changeLine(mon,monline);
	dayScreen.innerHTML = "Monday! Work hard! ";
} else if (day == 2) {
	changeLine(tue, tueline);
	dayScreen.innerHTML = "Tuesay! it is only beggining";
} else if (day == 3) {
	changeLine(wed,wedline);
	dayScreen.innerHTML = "Wednesday! ";
} else if (day == 4) {
	changeLine(thu,thuline);
	dayScreen.innerHTML = "Thursday! Almost finish";
} else if (day == 5) {
	changeLine(fri,friline);
	dayScreen.innerHTML = "IT IS Friday!";
} else if (day == 6) {
	changeLine(sat,satline);
	dayScreen.innerHTML = "Saturday!";
}

function changeLine(day,line) {
	line.className = "";
	line.className = "line";
	day.className = "decoration";
}