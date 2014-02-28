First Post
===

What is this?
---

### Date: 01/04/2013 (Edited: 11/21/2013)

Howdy! Welcome to **The Grid**! This is going to be my blog/place to talk about some of the things I'm currently working on.

I'm writing this post as sort of the last thing before I'm finished my website re-design! Although it's really more
of a complete re-do. Since my first version of this site I've taken what I did'nt like about my site and tried to improve it.

The first is actually the whole way my backend works. With my old site (and some of my older web designs) I would keep all of the
different types of documents together. For example, all of the Javascript would be with other Javscript, CSS with CSS and so on.
This worked ok, but was not really as modular as I would have liked. As the site got bigger it became a realy chore to keep the
backend clean and because of this I wanted to re-design keeping all of a specific page's assets all together.

This kind of goes hand in hand with the other major backend thing I wanted to change. Before I had a relitivly static page design.
Adding and changing pages became annoying, so I wanted to use this new modular idea to also make the whole site more dynamic. PHP
provides some really great ways to make a system like that, so the first thing I did was design a directory layout that allowed for
each page to be a directory that would keep all of it's relavent documents and images and even sub-pages within it. Other global 
components would then be aware of these other pages without nessisarily interactiing with them to allow them to be dynamic. For
example, the navigation bar at the top of this page was developed separatly from the actual page you are currently viewing. It 
is able to read the backend directory structure and make the links to the pages based on that. If I ever wanted to add a page,
I don't actually have to touch the navigation bar at all, and it would automatically work.

The next important part of the backend was how the URLs for the site worked. I've always been a minimalist as far as design is 
concerned, so I love the idea of really clean and tiny URLs. I researched and thought of a couple ways to make some really clean
URLs, but the way I ended up going with was a really simple. Basically, the name of the page (same as the name of the directory)
is the first thing after the URL, and anything after that becomes owned by the individual page. For example, `codysmithd.com/the_grid`
loads the page from `the_grid` in my directory structure. Anything after that gets handled by the page itself. There are a couple
different ways this could be done, and I decided to do it by forwarding all page requests to a single deciding
page, `index.php`. Then, `index.php` sets up all of the pages (or errors) based on those URLs. This is done with some Apache configuration
that is explained in the README on the repository page for this site.

With my backend designed, my next big design revison was the way my page navigates. I had seen some really cool websites that had
a 3d effect, which I later found out is known as parallax. Basically, as the page scrolls, different layers of the page move at
different rates which then creates the illusion of being three-dimensional. My first version of this site scrolled horizontally,
and while parallax can be done horizontally, I liked the idea of going to a more traditional vertical scrolling site. The whole
thing is driven off of some Javascript events that fire when the page scrolls.

This type of design has two real challenges. The first is making the motion smooth. The actual time you have with this sort of thing
before it starts to look not natural or laggy is really small, so anywhere where time can be saved is cruical to making the page 
and the parallax scrolling smooth. The second major challenge was achieving this kind of effect with a component page design.
If the pages don't know about each other, then how are they suppost to mesh together and share the Javascript load efficently?
My solution to this was a Javascript controller, called `navigation.js` that basically manages all of the different types of 
scrolling events, including knowing when certain pages are in view in as efficiently a way as possible. It also had arrays of 
functions (thank you Javascript) that each page can simply add to which get called when the page changes. This means that each page
doesn't actually have to know about any of the other pages to have cool parallax effects. It also makes the whole thing fairly 
efficient (around .6ms per scroll call based on my metrics in chrome) because each page doesn't have to manage the scrolling events 
individually.

Actually, with all of that working my slowest calls are all CSS re-draw events. So my next step to make sure that the scrolling is
as smooth as possible was to optimize CSS as much as possible. This is particularly difficult because fast CSS is often times not
super intuituve or universal. There are a lot of things to avoid to make universally fast CSS, and in my experience it's difficult
to get good objective data on how much different changes make. For example, the home page has a huge (for a website) image that can
take a lot of time to render. By making this image smaller, I can make the page load quicker and make the image render faster but
it won't look as good. I actual made a couple different resolutions 