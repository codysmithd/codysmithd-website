var projects_scrolled  = 0;
var projects_background_layer_1 = null;
var projects_background_layer_2 = null;
//var projects_background_layer_3 = null;
var projects_location_in_pages = 0;

// Called when the document is created
readyFunctions.push(function(){
	projects_background_layer_1 = $("#projects-background_1");
	projects_background_layer_2 = $("#projects-background_2");
	//projects_background_layer_3 = $("#projects-background_3");
	projects_location_in_pages = pages.indexOf("projects");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	if(Math.abs(current_page - projects_location_in_pages) <= 1){
		projects_scrolled = heightFromTop - div_height*projects_location_in_pages;
		projects_background_layer_1.css("margin-top", projects_scrolled*.5);
		projects_background_layer_2.css("margin-top", projects_scrolled*.6);
		//projects_background_layer_3.css("margin-top", projects_scrolled*.7);
	}
});