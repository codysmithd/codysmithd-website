<!-- This will eventually be converted to Markdown -->
<hr/>
<h1>First Post</h1>
<hr/>
<h2>What is this?</h2>
<h3>Date:04/11/2013 (Edited: 11/21/2013)</h3>

<p>
Howdy! Welcome to <strong>The Grid</strong>! This is going to be my blog/place to talk about some of the things I'm currently working on.
</p>

<p>
As of writing this, my website actually isn't even done (although is it <i>ever</i>?).
I’m writing this first post in raw HTML because my markdown parser isn't done.
I'm going to talk about how I got to where the site is today in the rest of this post, but before I start
all of my code is actually on <a href="http://www.github.com/codysmithd/codysmithd-website-">Github</a>.
</p>

<p>
I'll start by talking about what is hosting the site. Most of the time it's hosted off of a Raspberry Pi running Arch Linux.
I'm a student at RIT and we have awesome on-campus internet that gives us our own subnets. Normally I am forwarding my domain to
a Pi on campus. However, both the operating system and hardware are subject to significant change though. This includes sometimes 
using a free hosting service when I'm going to be playing with the backend a lot. This is really only important to know because
this website requires the ability to configure Apache3 configurations.
</p>

<p>My .htaccess actually forwards all requests to a single document, index.php.That page takes the
URL and splits it into the important and relevant components for use later. It actually starts by scanning the web backend folder structure
The way the directories are set up allows each page function as a separate unit. Each page has it's own folder with any HTML, PHP, CSS, or JS
documents and the index page decides what needs to be included and what doesn't dynamically. This also allows for other components
to adjust their behavior based on the page.
</p>

<p>
One of my goals for this website was to make it be able to support not having Javascript
enabled. This has a cool side-effect of making the site more usable by ensuring that . That said, things like the
navigation bar need to change things like it is styled based on the current page, so basically having the index page set up some variables
makes that really easy to manage.
</p>

<p>

</p>