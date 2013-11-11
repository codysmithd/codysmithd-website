var projects_scrolled  = 0;
var projects_background_layer_1 = null;
var projects_background_layer_2 = null;
var projects_background_layer_3 = null;

// Called when the document is created
readyFunctions.push(function(){
	projects_background_layer_1 = $("#projects-background_1");
	projects_background_layer_2 = $("#projects-background_2");
	projects_background_layer_3 = $("#projects-background_3");
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	projects_scrolled = parent.scrollTop() - div_height*pages.indexOf("projects");
	projects_background_layer_1.css("margin-top", projects_scrolled*.5);
	projects_background_layer_2.css("margin-top", projects_scrolled*.6);
	projects_background_layer_3.css("margin-top", projects_scrolled*.7);
});