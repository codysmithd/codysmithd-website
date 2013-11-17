var navbar_parent = null;     // The navbar parent div
var navbar_height = 0;        // The height of the navbar div

readyFunctions.push(function(){
	navbar_parent = $("#navbar_container");
	navbar_height = navbar_parent.height();
});

// Called every time the page is scrolled
parallaxFunctions.push(function(){
	
	if( (current_full_page*div_height) - parent.scrollTop() > navbar_height)
		navbar_parent.attr("class", "navbar_container-" + pages[current_full_page - 1]);
	else
		navbar_parent.attr("class", "navbar_container-" + pages[current_full_page]);
        
});


// Changes the active link when the page changes
changePageFunctions.push(function(){
	for(var i = 0; i < pages.length; i++){
		if(i == current_page)
			document.getElementById("link-" + pages[i]).className = 'navbar-current_link';
		else
			document.getElementById("link-" + pages[i]).className = '';
	}
});
