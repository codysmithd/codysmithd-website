<div id= "frame_the_grid" class="frame">
	<div style="position:relative; width: 100%; height:100%;">
			<div id="the_grid-posts_wrapper">
				<div id="the_grid-posts">
					<?php
						include "/var/www/_includes/_markdownParser/markdownParser.php";
						foreach(scandir("/var/www/_pages/the_grid/posts") as $x){
							if($x != "." and $x != ".."){
								echo "<div class=\"the_grid-post\">";
								parse_and_output_file("/var/www/_pages/the_grid/posts/$x");
								echo $subpage;
								echo "</div>";
							}
						}
					?>
				</div>
			</div>
		<div id="the_grid-navigation_wrapper">
			<?php
				//foreach(scandir("/var/www/_pages/the_grid/posts") as $x){
					//if($x != "." and $x != ".."){
						//echo "<a href=\"/the_grid/$x\"><div class=\"the_grid-navigation_link\"></div></a>";
					//}
				//}
			?>
			<div class="the_grid-navigation_link the_grid-navigation_link-current"></div>
			<div class="the_grid-navigation_link"></div>
		</div>
		<div id="the_grid-background"> </div>
		<div id="the_grid-background_2"> </div>
	</div>
</div>