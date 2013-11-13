var navbar_parent = null;
var navbar_height = 0;

readyFunctions.push(function(){
	navbar_parent = $("#navbar_container");
	navbar_height = navbar_parent.height();
});

// Changes the scrolling behavior depending on the page
parallaxFunctions.push(function(){
	// Going up
	if( (current_full_page*div_height) - parent.scrollTop() > navbar_height){
		navbar_parent.attr("class", "navbar_container-" + pages[current_full_page-1]);
	}
	else{
		navbar_parent.attr("class", "navbar_container-" + pages[current_full_page]);
	}
});


// Changes the active link when the page changes
changePageFunctions.push(function(){
	for(var i = 0; i < pages.length; i++){
		if(i == current_page)
			document.getElementById("link-" + pages[i]).className = 'navbar-current_link';
		else
			document.getElementById("link-" + pages[i]).className = '';
	}
	//navbar_parent.attr("class", "navbar_container-" + pages[current_page]);
});
