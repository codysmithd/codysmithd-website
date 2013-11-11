var about_scrolled  = 0;
var about_background_layer_1 = null;
var about_background_layer_2 = null;
var about_background_layer_3 = null;

// Called when the document is created
readyFunctions.push(function(){
	about_background_layer_1 = $("#about-background_1");
	about_background_layer_2 = $("#about-background_2");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	about_scrolled = parent.scrollTop() - div_height*pages.indexOf("about");
	about_background_layer_1.css("margin-top", about_scrolled*.7);
	about_background_layer_2.css("margin-top", about_scrolled*.9);
});