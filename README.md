codysmithd
==========
My personal website. My playground to try new things, write about what I'm doing, and showcase some of the stuff I'm working on.

  [Stage](http://webserver.student.rit.edu "Stage")
  
  [Production](http://www.codysmithd.com "Production")

## How does it work?
The basic philosophy for the site was to make a simple and adaptable website platform that allows enough freedom to explore some cool website design concepts. It works on two major layors.

#### Server-side
To make the URLs for the site clean, and to allow for a directory-driven design Apache3 is configured using the `.htaccess` file. 

    #disable directory listings
    Options -Indexes
    
    # Point all URL's to index.php silently 
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule ^ /index.php [L]

Then, it becomes `index.php`'s job to manage what content gets included when 

This re-directs all requests to a single document, `index.php`.

`index.php` then includes the pages as components based on the directory structure. Every page is self contained in a directory with the relivent HTML, PHP, CSS, Javascript, and any other assets.

<p align="center"><img src="http://i.imgur.com/Xuim2lI.png" /></p>

Using PHP, the correct pages are included to make the requested page, based on this modular directory structure. To add a page, it's as simple as adding a directory to `_pages`. 


#### Client-side
