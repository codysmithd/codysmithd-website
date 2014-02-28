var about_video;
var about_scrolled = 0;
var about_location_in_pages;

// Adjusts the size of the video background to match current aspect ratio
var about_videoResize = function(){
	
	// Greater height delta than width delta for aspect ratio of video
	if( $(window).height() > $(window).width() * 0.5425)
		about_video.removeAttr("height")
				   .removeAttr("width")
				   .width("auto")
		           .height("100%");
	else
		about_video.removeAttr("height")
				   .removeAttr("width")
				   .width("100%")
		           .height("auto");
		           
};

// [navigation.js] Called when page is ready
readyFunctions.push(function(){
	
	about_location_in_pages = pages.indexOf("about");
	
	about_video = $("#about_video");
	
	// Resize the video background
	about_videoResize();
	
});

// [navigation.js] Called when page is re-sized
resizeFunctions.push(about_videoResize);

// [navigation.js] Called when the page is scrolled
parallaxFunctions.push(function(){
	
	// Only change CSS if we are current page or in view
	if(Math.abs(current_page - about_location_in_pages) <= 1){
		
		about_scrolled = heightFromTop - div_height*about_location_in_pages;
		about_video.css("margin-top", about_scrolled);
		
	}
});