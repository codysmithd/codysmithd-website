var _404_text_background = null;
var _404_background_1 = null;
//var _404_background_2 = null;

var xAdjust = 0;
var yAdjust = 0;

$(document).ready(function() {
	
	_404_text_background = $("#_404_text");
	_404_background_1 = $("#_404_background-layer1");
	//_404_background_2 = $("#_404_background-layer2");
	
	yAdjust = $(window).outerHeight();
	xAdjust = $(window).outerWidth();
	
	
	$("#_404_frame").mousemove(function(e){
    	_404_text_background.css("background-position", e.clientX*0.01 + "px " + e.clientY*0.01 + "px");
    	_404_background_1.css("top", (e.clientY-yAdjust)*0.1 + "px");
    	_404_background_1.css("left", (e.clientX-xAdjust)*0.1 + "px");
    	//_404_background_2.css("top", (e.clientY-yAdjust)*0.2 + "px");
    	//_404_background_2.css("left", (e.clientX-xAdjust)*0.2 + "px");
    });
});