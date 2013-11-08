var pages     = new Array(); // Page names from navigation (in order)
var page_divs = new Array(); // Page divs (in same order as pages[])

var current_page = 0;        // Index of the current page in pages[]
var animation_done = false;  // Hold variable to sync transition

$(document).ready(function() {
	// Make the list of pages
	var navlinks = document.querySelectorAll("a[id^='link-']");
	for(var i=0; i<navlinks.length; i++){
		 // Get rid of href navigation
		navlinks[i].removeAttribute("href");
		// Add onclick for new navigation
		navlinks[i].setAttribute("onclick", "javascript:changePage(\"" + i + "\")");
		// Add the page reference name to pages[]
		pages.push((navlinks[i].id).replace("link-",""));
		//find and add the corrisponding frame div
		page_divs.push(document.getElementById("frame_" + pages[i]));
	}
	// Get current page
	var current_page_name;
	if(window.location.pathname.indexOf("/",1) != -1)
		current_page_name = window.location.pathname.substr(1,window.location.pathname.indexOf("/",1)-1);
	else
		current_page_name = window.location.pathname.substr(1);
	if(current_page_name == "") current_page_name = "home";
	current_page = pages.indexOf(current_page_name);
 });

function changePage(next_page){
	
	if (next_page != current_page) {

		// Setup Transition
		for (var i = 0; i < pages.length; i++) {
			if (i != current_page && i != next_page) {
				page_divs[i].style.zIndex = 1;
				if (i < next_page)
					page_divs[i].setAttribute("class", "frame frame_left frame_inactive");
				else
					page_divs[i].setAttribute("class", "frame frame_right frame_inactive");
			}
		}

		page_divs[next_page].style.zIndex = 3;
		page_divs[current_page].style.zIndex = 2;
		$(page_divs[next_page]).removeClass("frame_inactive");

		if (next_page > current_page)
			animation_value = {
				left : "-100%"
			};
		else
			animation_value = {
				right : "-100%"
			};
		animation_settings = {
			duration : 5000,
			queue : false,

		};

		$(page_divs[current_page]).transition(animation_value, animation_settings, function() {
			finish_transition(next_page);
		});
		$(page_divs[next_page]).transition(animation_value, animation_settings, function() {
			finish_transition(next_page);
		});

		window.history.pushState("", "codysmithd", "/" + pages[next_page]);
		// Adjust URL
	}

}

function finish_transition(next_page){
	if(!animation_done)
		animation_done = true;
	else{
		if(current_page > next_page)
			classAttribute = "frame_right";
		else
			classAttribute = "frame_left";
		page_divs[current_page].setAttribute("class", "frame " + classAttribute + " frame-inactive");
		page_divs[next_page].setAttribute("class", "frame");
		for(var i=0; i<page_divs.length; i++)
			page_divs[i].setAttribute("style", "");
		current_page = next_page;
		animation_done = false;
	}
}
