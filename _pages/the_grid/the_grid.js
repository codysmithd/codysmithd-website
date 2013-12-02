var grid_scrolled  = 0;
var grid_background_layer = null;
var grid_background_layer_2 = null;
var grid_location_in_pages = 0;

// Called when the document is created
readyFunctions.push(function(){
	grid_background_layer = $("#the_grid-background");
	grid_background_layer_2 = $("#the_grid-background_2");
	grid_location_in_pages = pages.indexOf("the_grid");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	if(Math.abs(current_page - grid_location_in_pages) <= 1){
		grid_scrolled = parent.scrollTop() - div_height*grid_location_in_pages;
		grid_background_layer.css("margin-top", grid_scrolled*.3);
		grid_background_layer_2.css("margin-top", grid_scrolled*.9);
	}
});