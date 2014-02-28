<div id= "frame_the_grid" class="frame">
	<div style="position:relative; width: 100%; height:100%;">
			
			<div id="the_grid-content-outer">
				<div id="the_grid-content-middle">
					<div id="the_grid-content-inner">
						
						<?php
						include "/var/www/_includes/_markdownParser/markdownParser.php";
						include "/var/www/_includes/gridview.php";
						
						function not_in_subpages_array($subpages, $subpage){
							foreach($subpages as $x)
								if(substr($x, strpos($x, "_")+1, -3) == $subpage)
									return FALSE;
							return TRUE;
						}

						$subpages = array();

						// Set the current subpage variable (from URL)
						$subpage = (strpos($subpage, "/", 1)) ?
						substr($subpage, 1, strpos($subpage, "/", 1)) : substr($subpage, 1);

						// Add the blog posts to the subpages array
						foreach(scandir("/var/www/_pages/the_grid/posts") as $x)
							if($x != "." and $x != "..")
								array_push($subpages, $x);

						// If we have a requested subpage that is not in out list, throw a 404
						if(not_in_subpages_array($subpages, $subpage) and !empty($subpage))
							header( 'Location: /404' ) ;
						
						
						// Make the post HTML for each subpage
						
						echo "<div id=\"the_grid-post-parent\">";
						
						foreach($subpages as $x){
								
							// Set the current class depending on if this page should currently be visible
							$class = (substr($x, strpos($x, "_")+1, -3) == $subpage) ? "the_grid-post" : "the_grid-post inactive";
							
							// Make the id of the post "the_grid-post-[name]"
							$id = "the_grid-post-" . substr($x, strpos($x, "_")+1, -3);
							
							// Run it through the markdown parser
							echo "<div id=\"$id\" class=\"$class\">";
							echo "<a href=\"/the_grid/\"><div class=\"the_grid-post_return-button\"></div></a>";
							parse_and_output_file("/var/www/_pages/the_grid/posts/$x"); // [markdownParser.php]
							echo "</div>";
							
						}
						
						echo "</div>";
						
						// If there IS an active subpage, hide the grid
						$class_for_grid = ($subpage == "") ? "" : "inactive";
						
						// Build and include the grid of links to the posts
						make_grid($subpages, $class_for_grid);
						
						?>
						
					</div>
				</div>
			</div>
		
		<?php
		
		$TG_root = "/var/www/_pages/the_grid/";
		
		// Make the wallpaper for the grid posts
		foreach(scandir($TG_root . "post-backgrounds") as $x){
			$post_filename = substr($x, 0, -4);
			if($x != '.' and $x != '..' and file_exists($TG_root . "/posts/" . $post_filename . ".md"))
				echo "<img id=\"the_grid-post-wallpaper_$post_filename\" class=\"the_grid-post-wallpaper\" src=\"/_pages/the_grid/post-backgrounds/$x\"></img>";
		}
		
		?>
		
		<div id="the_grid-background"> </div>
		<div id="the_grid-background_2"> </div>
	</div>
</div>