<div id= "frame_the_grid" class="frame">
	<div style="position:relative; width: 100%; height:100%;">
		<?php
			include "/var/www/_includes/_markdownParser/markdownParser.php";
			foreach(scandir("/var/www/_pages/the_grid/posts") as $x){
				if($x != "." and $x != ".."){
					echo "<div class=\"the_grid-Post\">";
					parse_and_output_file($x);
					echo "</div>";
				}
			}
		?>
		<div id="the_grid-background"> </div>
		<div id="the_grid-background_2"> </div>
	</div>
</div>