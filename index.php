<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="width:100%; height:100%; font-family:Arial, Helvetica, sans-serif;">
<?php
	// Figure out which page has been requested
	$requested_page = substr($_SERVER['REQUEST_URI'], 1); //strip off first slash
	if ($requested_page == '')
		$requested_page = 'home';
	for($i=0;$i<strlen($requested_page);$i++) { // Find the page part of the URL
    	 if(strpos("?#/",$requested_page[$i]) !== false){
    	 	$requested_page = substr($requested_page, 0, $i);
			break;
    	 }
	}
	
	// Make list of valid pages
	$pages = array();
	foreach(scandir("/var/www/_pages") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_' and file_exists("/var/www/_pages/$x/$x.html"))
			array_push($pages, $x);
	}
	
	// Sort list of pages
	$page_rank = array("home" => 4, "the_grid"=> 3, "projects" => 2, "about"=> 1);
	function getPageRank($a, $b)
	{
		global $page_rank;
		if (isset($page_rank[$a]) and isset($page_rank[$b]))
        	return ($page_rank[$a] > $page_rank[$b]) ? -1 : 1;
		return 0;
	}
	usort ($pages, "getPageRank");
	
	// Decide 404
	$ERROR_404 = true;
	if(in_array($requested_page, $pages))
		$ERROR_404 = false;
?>

<head>
	<title>CodySmithD</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<link href="global.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Raleway:700,400,100' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<?php
		// include _includes javascript
		$path = "_includes";
		foreach(scandir("/var/www/$path") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_' and file_exists("$path/$x/$x.js"))
			echo "<script type=\"text/javascript\" src=\"/$path/$x/$x.js\"></script>";
		}
		// include _pages javascript
		$path = "_pages";
		foreach(scandir("/var/www/$path") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_' and file_exists("$path/$x/$x.php"))
			echo "<script type=\"text/javascript\" src=\"/$path/$x/$x.js\"></script>";
		}
		
		// include _script
		$path = "_script";
		foreach(scandir("/var/www/$path") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_')
			echo "<script type=\"text/javascript\" src=\"/$path/$x\"></script>";
		}
	?>
</head>

<body>
	<?php
		//Include page style-sheets
		echo '<style>';
		if($ERROR_404 and file_exists('/var/www/_pages/_404/404.css')){
			include '/var/www/_pages/_404/404.css';
		}
		else{
			foreach($pages as $x){
				if(file_exists("/var/www/_pages/$x/$x.css"))
					include "/var/www/_pages/$x/$x.css";
			}
			
		}
		foreach(scandir("/var/www/_includes") as $x){
				if(file_exists("/var/www/_includes/$x/$x.css"))
					include "/var/www/_includes/$x/$x.css";
			}
		echo '</style>';
		
		// Include _pages
		if($ERROR_404){
			include "_pages/_404/404.html";
		}
		else{
			echo "<div class=\"layer-0\">";
			foreach($pages as $x){
					$handle = @fopen("/var/www/_pages/$x/$x.html", "r");
					$needle = "class=\"frame\"";
					$adjusted_class = "class=\"frame\"";
					if ($handle) {
					    while (($buffer = fgets($handle)) !== false) {
					    	// Turn off all in-active frames
							if(array_search($x, $pages) != array_search($requested_page, $pages))
								$adjusted_class = "class=\"frame frame_inactive\"";
					    	$buffer = str_replace ($needle, $adjusted_class, $buffer);
					        echo $buffer;
					    }
					    fclose($handle);
					}
			}
			echo "</div>";
			
			// Include _includes
			foreach(scandir("/var/www/_includes") as $x){
				if(file_exists("/var/www/_includes/$x/$x.html"))
					include "/var/www/_includes/$x/$x.html";
				else if(file_exists("/var/www/_includes/$x/$x.php"))
					include "/var/www/_includes/$x/$x.php";
			}
			
		}
	?>
</body>
</html>