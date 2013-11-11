var home_scrolled  = 0;
var home_background_layer = null;

// Called when the document is created
readyFunctions.push(function(){
	home_background_layer = $("#home_background");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	home_scrolled = parent.scrollTop() - div_height*pages.indexOf("home");
	home_background_layer.css("margin-top", home_scrolled*.5);
});