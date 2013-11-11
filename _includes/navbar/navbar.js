var navbar_parent = null;

readyFunctions.push(function(){
	navbar_parent = $("#navbar_container");
});

// Changes the scrolling behavior depending on the page
parallaxFunctions.push(function(){
	switch(pages[current_full_page]){
		case "home":
			//scrolling_home();
			break;
		case "the_grid":
			//scrolling_the_grid();
			break;
		case "projects":
			//scrolling_the_grid();
			break;
		case "about":
			//scrolling_the_grid();
			break;
		default:
	}
});

// Used when scrolling into or out of 'Home'
function scrolling_home(){
	
}

function scolling_the_grid(){
	// If scrolling up [into home]
	if(current_full_page*div_height > parent.scrollTop()){
		
	}
	// If scrolling down into projects
}

function scolling_projects(){
	// Decide what direction we are scrolling
	// If scrolling up into home
	// If scrolling down into projects
}

function scolling_about(){
	// Decide what direction we are scrolling
	// If scrolling up into home
	// If scrolling down into projects
}


// Changes the active link when the page changes
changePageFunctions.push(function(){
	for(var i = 0; i < pages.length; i++){
		if(i == current_page)
			document.getElementById("link-" + pages[i]).className = 'navbar-current_link';
		else
			document.getElementById("link-" + pages[i]).className = '';
	}
	navbar_parent.attr("class", "navbar_container-" + pages[current_full_page]);
});
