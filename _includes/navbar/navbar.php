<?php 
	// Get class
	$class = "navbar_container-" . $requested_page;
	echo "<div id=\"navbar_container\" class=\"$class\">";
?>
	<span id="navbar_logo"></span>
	<ul>
	<?php
	$page_names = array("home" => "Home", "the_grid" => "The Grid", "projects" => "Projects", "about" => "About");

	foreach ($pages as $x) {
		// Class
		$class = "";
		if($requested_page == $x)
			$class .= "navbar-current_link";
		
		// Page Name
		$pagename = $x;
		if(isset($page_names[$x]))
			$pagename = $page_names[$x];
		
		// Link
		$href = $x;
		if($x == "home")
			$href = "";
		
		echo
		"<a id=\"link-$x\" href=\"/$href\" class=\"$class\"><li>$pagename</li></a>";
	}
	?>
	</ul>
</div>
