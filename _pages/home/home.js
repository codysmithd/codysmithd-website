var home_scrolled  = 0;
var home_background_layer = null;
var home_background_layer_mask = null;
var home_location_in_pages = 0;

// Called when the document is created
readyFunctions.push(function(){
	
	home_background_layer = $("#home_background");
	home_background_layer_mask = $("#home_background_mask");
	
	home_location_in_pages = pages.indexOf("home");
	
	URLrules[home_location_in_pages] = function(){
		window.history.pushState("", "codysmithd", "/");
	};
	
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	
	// Only do parallax effect when the page is in view
	if(Math.abs(current_page - home_location_in_pages) <= 1){
		
		home_scrolled = heightFromTop - div_height*pages.indexOf("home");
		home_background_layer.css("margin-top", home_scrolled*.5);
		home_background_layer_mask.css("margin-top", home_scrolled*.3);
	}
});