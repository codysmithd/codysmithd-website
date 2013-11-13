var home_scrolled  = 0;
var home_background_layer = null;
var home_background_layer_mask = null;

// Called when the document is created
readyFunctions.push(function(){
	home_background_layer = $("#home_background");
	home_background_layer_mask = $("#home_background_mask");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	home_scrolled = parent.scrollTop() - div_height*pages.indexOf("home");
	home_background_layer.css("margin-top", home_scrolled*.5);
	home_background_layer_mask.css("margin-top", home_scrolled*.3);
});