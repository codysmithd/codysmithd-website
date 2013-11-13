var pages        = new Array(); // List of pages
var page_divs    = new Array(); // Array of page divs
var div_height   = 0;           // Height of each element [px]
var current_page = 0;           // Current page taking up most of the screen
var current_full_page = 0;      // Current FULL page
var parent       = null;        // The huge scrolling element

var scroll_snap_timer;               // The timer used to decide when to snap

var readyFunctions       = new Array(); // Array of functions called when the document is ready
var parallaxFunctions    = new Array(); // Array of functions called when scrolling occurs
var changePageFunctions  = new Array(); // Array of function called when a new page is detected
var newFullPageFunctions = new Array(); // Array of function called when a new full page is present

$(document).ready(function() {
	
	// Undo fallbacks and populate pages and page_divs
	$(".frame_inactive").removeClass("frame_inactive");
	var navlinks = document.querySelectorAll("a[id^='link-']");
	for(var i=0; i<navlinks.length; i++){
		navlinks[i].removeAttribute("href");
		// Add the page reference name to pages[]
		pages.push((navlinks[i].id).replace("link-",""));
		//find and add the corrisponding frame div
		page_divs.push($(document.getElementById("frame_" + pages[i])));
		// Add onclick for new navigation
        navlinks[i].setAttribute("onclick", "javascript:changePage(\"" + i + "\")");
	}
	
	// Setup page_div top values
	for(var i=0; i<page_divs.length; i++){
		page_divs[i].css("top", i *100 + "%");
	}
	
	// Get the current page
	var pageFromURL = window.location.pathname.split( '/' )[1];
	if(pageFromURL != '')
		current_page = pages.indexOf(pageFromURL);
	else
		current_page = 0;
	current_full_page = current_page;
	
	// Prepare Parent
	parent = $(".layer-0");
	parent.css("height", "100%");
	
	div_height = page_divs[0].height(); // Get page div height
	
	parent.scrollTop(current_page * div_height); // Scroll to the current page
	
	// Setup scroll handler
	parent.scroll(function(){
    	parallaxScroll();
	});
	
	jQuery.fx.interval = 1; // Set the framerate to max!

	// Stop snap animation when user provides input
	window.onmousewheel = document.onmousewheel = document.onkeydown = function(){ parent.stop(); };
	
	// Re-evaluate the div_height when the page re-sizes
	window.onresize = function(){ div_height = page_divs[0].height(); };
	
	// Call the other element's ready functions
	for(var i = 0; i < readyFunctions.length; i++)
		readyFunctions[i]();
	
 });
 
// Called every time the page get a scroll
function parallaxScroll(){
	
	// If we are more on one page than another
	if(current_page != Math.round(parent.scrollTop()/div_height)){
		current_page = Math.round(parent.scrollTop()/div_height);
		changePage();
	}
	
	// If we just gave full view to a new page
	if( Math.abs(current_full_page*div_height - parent.scrollTop()) >= div_height ){
		
		current_full_page = Math.floor(parent.scrollTop()/div_height);
		// Call other element's change page functions
		for(var i = 0; i < newFullPageFunctions.length; i++)
			newFullPageFunctions[i]();
	}
	
	evaulateSnapEffect(); // Snap if we need to
	
	// Call other elements's scroll functions
	for(var i = 0; i < parallaxFunctions.length; i++)
		parallaxFunctions[i]();
	
}

// Change the current page
function changePage(newPage){
	
	// Change the URL
	if(current_page != 0)
		window.history.pushState("", "codysmithd", "/" + pages[current_page]);
	else
		window.history.pushState("", "codysmithd", "/");
	
	// Scroll to the new page (if specified)
	if(newPage !== undefined && newPage != current_page){
		parent.animate({ scrollTop: newPage * div_height + "px" }, 600);
	}
	
	// Call other element's change page functions
	for(var i = 0; i < changePageFunctions.length; i++)
		changePageFunctions[i]();
}

// Snap to the next page in case of in-between scrolling
function evaulateSnapEffect(){
	
	window.clearTimeout(scroll_snap_timer); // Interrupt Timer
	
	scroll_snap_timer = window.setTimeout(
		function(){
			parent.animate({ scrollTop: current_page * div_height + "px" }, 300);
		}, 600);		
}
