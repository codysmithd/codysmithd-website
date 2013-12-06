<div id= "frame_the_grid" class="frame">
	<div style="position:relative; width: 100%; height:100%;">
			<div id="the_grid-posts_wrapper">
				<div id="the_grid-posts">
					<?php
						include "/var/www/_includes/_markdownParser/markdownParser.php";
						
						function not_in_subpages_array($subpages, $subpage){
							foreach($subpages as $x)
								if(substr($x, strpos($x, "_")+1, -3) == $subpage)
									return FALSE;
							return TRUE;
						}
						
						$subpages = array();
						
						// Get (and make) subpage
						$subpage = (strpos($subpage, "/", 1)) ?
						substr($subpage, 1, strpos($subpage, "/", 1)) : substr($subpage, 1);
						
						foreach(scandir("/var/www/_pages/the_grid/posts") as $x)
							if($x != "." and $x != "..")
								array_push($subpages, $x);
						
						// Handle non-valid page requests
						if($subpage == "")
							$subpage = substr($subpages[0], strpos($subpages[0], "_")+1, -3);
						else if(not_in_subpages_array($subpages, $subpage))
							header( 'Location: /404' ) ;
						
						// Build Posts
						foreach($subpages as $x){
							$class = (substr($x, strpos($x, "_")+1, -3) == $subpage) ? "the_grid-post" : "the_grid-post the_grid-post-inactive";
							$id = "the_grid-post-" . substr($x, strpos($x, "_")+1, -3);
							echo "<div id=\"$id\" class=\"$class\">";
							parse_and_output_file("/var/www/_pages/the_grid/posts/$x");
							echo "</div>";
						}
					?>
				</div>
			</div>
		<?php
		// Navigation Bar
		$width = (30*count($subpages) + 3) . "px";
		echo "<div id=\"the_grid-navigation_wrapper\" style=\"width:$width\">";
				
				foreach($subpages as $x){
					$class = (substr($x, strpos($x, "_")+1, -3) == $subpage) ? " the_grid-navigation_link the_grid-navigation_link-current" : "the_grid-navigation_link";
					$href = "/the_grid/" . substr($x, strpos($x, "_")+1, -3);
					echo "<a href=\"$href\"><div class=\"$class\"></div></a>";
				}
		echo "</div>";
		?>
		<div id="the_grid-background"> </div>
		<div id="the_grid-background_2"> </div>
	</div>
</div>