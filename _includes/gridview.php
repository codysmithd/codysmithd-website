<?php
	//Makes a grid of links to posts
	//$list_of_pages = list of names of things that will become tiles
	//$class = class(es) given to the parent element of the grid
	function make_grid($list_of_pages, $class){
		
		$path_to_pages = "/var/www/_pages/the_grid/posts/";
		
		// Make tile for each element in the list
		foreach($list_of_pages as $page){
			
			$post_date = "";
			$post_title = "";
			$post_symbol = "";
			
			// Get the Meta-Data for the tile
			$text = file_get_contents($path_to_pages . $page);
			if($text){
				
				// Use the first line as the Title for the post
				$post_title = strstr($text, "\n", true);
				
				// Use REGEX to find a date. Note: doesn't check if the date is real or anything
				preg_match( '/[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{2,4}/', $text, $date_matches);
				if($date_matches)
					$post_date = $date_matches[0];
				
			}
			
			// Make the symbol for the post by getting the first letter of the first letter in the title
			// and the first letter in the next word in the title. No need to error check.
			$title_array = explode(" ", $post_title);
			$post_symbol = $post_symbol . $title_array[0][0] . strtolower($title_array[1][0]);
			
			// The URL name of the post we are linking to
			$URL_of_page = substr($page, strpos($page, "_")+1, -3);
			
			// Get the filename of the post (ie, 1_first_post.md -> 1_first_post)
			$post_filename = substr($page, 0, -3);
			
			// Write out the tiles
			echo "
			<a href=\"/the_grid/$URL_of_page\"
			onmouseover=\"javascript:hover_event_showWallpaper('$post_filename');\"
			onmouseout=\"javascript:hover_event_hideWallpaper('$post_filename');\"><div
			class=\"the_grid-grid_tile-wrapper $class\">
					<div class=\"the_grid-grid_tile-symbol\">$post_symbol</div>
					<div class=\"the_grid-grid_tile-title\">$post_title</div>
					<div class=\"the_grid-grid_tile-date\">$post_date</div>
			</div></a>
			";
			
		}
		
	}
?>