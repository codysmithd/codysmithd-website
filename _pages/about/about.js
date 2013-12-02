var about_scrolled  = 0;
var about_background_layer_1 = null;
var about_background_layer_2 = null;
var about_background_layer_3 = null;
var about_location_in_pages = 0;

// Called when the document is created
readyFunctions.push(function(){
	about_background_layer_1 = $("#about-background_1");
	about_background_layer_2 = $("#about-background_2");
	about_location_in_pages = pages.indexOf("about");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	if(Math.abs(current_page - about_location_in_pages) <= 1){
		about_scrolled = parent.scrollTop() - div_height*about_location_in_pages;
		about_background_layer_1.css("margin-top", about_scrolled*.7);
		about_background_layer_2.css("margin-top", about_scrolled*.9);
	}
});