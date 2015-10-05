#codysmithd.com (*deprecated*)

My personal website. My playground to try new things, write about what I'm doing, and showcase some of the stuff I'm working on.

## How does it work?
The basic philosophy for the site was to make a simple and adaptable website platform that allows enough freedom to explore some cool website design concepts.

### Page Construction

To make the URLs for the site clean, and to allow for a directory-driven design Apache3 is configured using the `.htaccess` file. 

    #disable directory listings
    Options -Indexes
    
    # Point all URL's to index.php silently 
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ /index.php [L]

This re-directs all requests to a single document, `index.php`.

`index.php` then includes the pages as components based on the directory structure. Every page is self contained in a directory with the relivent HTML, PHP, CSS, Javascript, and any other assets.

<p align="center"><img src="http://i.imgur.com/XCNZkdK.png" /></p>

Using PHP, the correct pages are included to make the requested page, based on this modular directory structure. To add a page, it's as simple as adding a directory to `_pages`. 

### Parallax Scrolling

The main design feature of the site is the parallax scrolling effect. A major design challenge was to make this compartmentalized and efficient. The driver of all of this is `navigation.js`. This script manages the scrolling of the page, as a series of events. The individual components then add their functions to arrays that get called:

  - **readyFunctions** : Called when the page is loaded
  - **parallaxFunctions** : Called every time the page scrolls
  - **changePageFunctions** : Called when the page has changed (over 50% into next page)
  - **newFullPageFunctions** : Called when a different page has just reached full view

For optimization reasons, anything added to **parallaxFunctions** should only get get called when the page is with one page of the current page.

Then, making parallax behavior on the page is as simple as setting up the CSS, and writing some simple Javascript. Here is an example from `home.js`
```javascript
    parallaxFunctions.push(function(){
	    if(Math.abs(current_page - home_location_in_pages) <= 1){
		    home_scrolled = parent.scrollTop() - div_height*pages.indexOf("home");
		    home_background_layer.css("margin-top", home_scrolled*.5);
		    home_background_layer_mask.css("margin-top", home_scrolled*.3);
		  }
    });
```
- - -
Copyright (C) 2013 Cody Smith codysmithd@gmail.com.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details: http://www.gnu.org/licenses/.
