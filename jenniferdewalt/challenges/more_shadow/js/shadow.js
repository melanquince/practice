$(document).ready(function() {
	var imgShadow = 0;
	var quoteShadow = 0;
	var authorShadow = 0;
	var textShadow = 0;

	

	$("#image").on("click", function() {
		 imgShadow +=3;
		 $("#image").css("box-shadow","0px 0px "+imgShadow+"px "+imgShadow+"px  #2e5932");
	});

	$("#text").on("click", function() {
		 textShadow +=3;
		 $("#text").css("box-shadow","0px 0px "+textShadow+"px "+textShadow+"px  #2e5932");
	});

	$("#quote").on("click", function() {
		 quoteShadow +=3;
		 $("#quote").css("box-shadow","0px 0px "+quoteShadow+"px "+quoteShadow+"px  #2e5932");
	});
});