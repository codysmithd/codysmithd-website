var pages        = new Array(); // List of pages
var page_divs    = new Array(); // Array of page divs
var div_height   = 0;           // Height of each element [px]
var current_page = 0;
var parent       = null;

var scroll_snap_timer;               // The timer used to decide when to snap
var parallaxFunctions = new Array(); // Array of functions called when scrolling occurs

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
	
	parent = $(".layer-0");
	parent.css("height", "100%");
	
	div_height = page_divs[0].height();
	
	parent.scrollTop(current_page * div_height);
	
	parent.scroll(function(){
    	parallaxScroll();
	});
	
	jQuery.fx.interval = 1; // Set the framerate to max!

	// Stop snap animation when user provides input
	window.onmousewheel = document.onmousewheel = document.onkeydown = function(){ parent.stop(); };
	
 });
 
// Called every time the pages get a scroll
function parallaxScroll(){
	
	// If we just changed what page we are on
	if(current_page != Math.round(parent.scrollTop()/div_height)){
		current_page = Math.round(parent.scrollTop()/div_height);
		changePage();
	}
	
	evaulateSnapEffect();
	
	for(var i = 0; i < parallaxFunctions.length; i++)
		parallaxFunction[i]();
	
}

// Change the current page
function changePage(newPage){
	updateNavbar();
	if(current_page != 0)
		window.history.pushState("", "codysmithd", "/" + pages[current_page]);
	else
		window.history.pushState("", "codysmithd", "/");
	if(newPage !== undefined && newPage != current_page){
		parent.animate({ scrollTop: newPage * div_height + "px" }, 600);
	}
}

// Snap to the next page in case of in-between scrolling
function evaulateSnapEffect(){
	window.clearTimeout(scroll_snap_timer); // Interrupt Timer
	scroll_snap_timer = window.setTimeout(
		function(){
			parent.animate({ scrollTop: current_page * div_height + "px" }, 300);
		}, 600);		
}

// Update the navigation bar
function updateNavbar(){
	for(var i = 0; i < pages.length; i++){
		if(i == current_page)
			document.getElementById("link-" + pages[i]).className = 'navbar-current_link';
		else
			document.getElementById("link-" + pages[i]).className = '';
	}
}
