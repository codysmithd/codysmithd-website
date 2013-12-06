var _404_text_background = null;
var _404_background_1 = null;

var xAdjust = 0;
var yAdjust = 0;

$(document).ready(function() {
	
	_404_text_background = $("#_404_text");
	_404_background_1 = $("#_404_background-layer1");
	
	yAdjust = $(window).outerHeight();
	xAdjust = $(window).outerWidth();
	
	
	$("#_404_frame").mousemove(function(e){
    	_404_text_background.css("background-position", e.clientX*0.01 + "px " + e.clientY*0.01 + "px");
    	_404_background_1.css("top", (e.clientY-yAdjust)*0.02 + "px");
    	_404_background_1.css("left", (e.clientX-xAdjust)*0.02 + "px");
    });
});