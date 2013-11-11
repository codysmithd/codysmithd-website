var grid_scrolled  = 0;
var grid_background_layer = null;
var grid_background_layer_2 = null;

// Called when the document is created
readyFunctions.push(function(){
	grid_background_layer = $("#the_grid-background");
	grid_background_layer_2 = $("#the_grid-background_2");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	grid_scrolled = parent.scrollTop() - div_height*pages.indexOf("the_grid");
	grid_background_layer.css("margin-top", grid_scrolled*.3);
	grid_background_layer_2.css("margin-top", grid_scrolled*.9);
});