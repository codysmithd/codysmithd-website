var grid_scrolled  = 0;
var grid_background_layer = null;
var grid_background_layer_2 = null;
var grid_location_in_pages = 0;

var grid_posts    = Array();
var grid_navLinks = Array();

// Called when the document is created
readyFunctions.push(function(){
	
	// Parallax variables
	grid_background_layer = $("#the_grid-background");
	grid_background_layer_2 = $("#the_grid-background_2");
	grid_location_in_pages = pages.indexOf("the_grid");
	
	// Navigation variables
	for(var i=0; i < document.getElementById('the_grid-posts').children.length; i++)
		grid_posts.push($(document.getElementById('the_grid-posts').children[i]));
	
	// URL rules
	URLrules[grid_location_in_pages] = function(){
		currently_active = $("#the_grid-posts > :not( .the_grid-post-inactive )");
		window.history.pushState("", "codysmithd", "/the_grid/" + currently_active.attr("id").substring(14));
	};
	
	// Change to Javascript Navigation
	$("#the_grid-navigation_wrapper").children().removeAttr("href");
	
	for(var i=0; i < document.getElementById('the_grid-navigation_wrapper').children.length; i++){
			document.getElementById('the_grid-navigation_wrapper')
				.children[i].setAttribute("onclick", "javascript:changePost(" + i + ")");
			grid_navLinks.push($(document.getElementById('the_grid-navigation_wrapper').children[i]));
	}
	
});

// Called every time the page scrolls
parallaxFunctions.push(function(){
	if(Math.abs(current_page - grid_location_in_pages) <= 1){
		grid_scrolled = heightFromTop - div_height*grid_location_in_pages;
		grid_background_layer.css("margin-top", grid_scrolled*.3);
		grid_background_layer_2.css("margin-top", grid_scrolled*.9);
	}
});


// Navigate to the next post
function changePost(newPost_index){
	
	currently_active = $("#the_grid-posts > :not( .the_grid-post-inactive )");
	
	if(grid_posts[newPost_index].attr("id") !== currently_active.attr("id")){
		
		// Fade out the currently active page
		currently_active.fadeOut(300, function() {
    		
    		// change the URL
    		window.history.pushState("", "codysmithd", "/the_grid/" + grid_posts[newPost_index].attr("id").substring(14));
    		
    		$(".the_grid-navigation_link-current").removeClass("the_grid-navigation_link-current");
    		grid_navLinks[newPost_index].children().addClass("the_grid-navigation_link-current");
    		
    		grid_posts[newPost_index].fadeIn(300, function(){
    			$(this).attr("style","").removeClass("the_grid-post-inactive");
    			currently_active.addClass("the_grid-post-inactive");
    		});
    		
  		});
	}
}
