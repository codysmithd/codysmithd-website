<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<?php ob_start(); ?>
<html xmlns="http://www.w3.org/1999/xhtml" style="width:100%; height:100%; font-family:Arial, Helvetica, sans-serif;">
<?php
	
	// Way to store the page status
	abstract class PAGE_STATUS
	{
    	const NORMAL = 0;
    	const ERROR_404 = 1;
	}
	
	// Initilize variables
	$subpage = "";
	
	// Figure out which page has been requested
	$requested_page = substr($_SERVER['REQUEST_URI'], 1); // Strip off first slash
	// Find the page (and subpage) part of the URL
	for($i=0;$i<strlen($requested_page);$i++) { 
    	 if(strpos("?#/",$requested_page[$i]) !== false){
    	 	if($requested_page[$i] === "/")
				$subpage = substr($requested_page, $i);
    	 	$requested_page = substr($requested_page, 0, $i);
			break;
    	 }
	}
	if ($requested_page == '')
		$requested_page = 'home';
	
	// Make list of valid pages
	$pages = array();
	foreach(scandir("/var/www/_pages") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_' and (file_exists("/var/www/_pages/$x/$x.html") or file_exists("/var/www/_pages/$x/$x.php")))
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
	<link href="/global.css" rel="stylesheet" type="text/css" />
	<link href='http://fonts.googleapis.com/css?family=Raleway:700,600,400,200&effect=3d-float' rel='stylesheet' type='text/css'>
	<link href='http://fonts.googleapis.com/css?family=Arimo:400,700' rel='stylesheet' type='text/css'>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<?php
		// echo link for all .js in directory (recursive)
		function printScriptLinkForDir($pathname){
				$path = realpath($pathname);
				foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path)) as $x){
					$x = substr($x, 8);
					if(strpos($x, ".js") !== false){
						echo "<script type=\"text/javascript\" src=\"$x\"></script>";
					}
				}
			}
		
		if($ERROR_404){
			$path = "_pages";
			if(file_exists("$path/_404/404.js"))
				echo "<script type=\"text/javascript\" src=\"/$path/_404/404.js\"></script>";
		}
		else{
			
			printScriptLinkForDir("/var/www/_script");
			printScriptLinkForDir("/var/www/_includes");
			
			foreach(scandir("/var/www/_pages") as $x){
			if($x != '.' and $x != '..' and $x[0] != '_')
				printScriptLinkForDir("/var/www/_pages/$x");
			}
			
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
					if(file_exists("/var/www/_pages/$x/$x.html"))
						$handle = @fopen("/var/www/_pages/$x/$x.html", "r");
					elseif (file_exists("/var/www/_pages/$x/$x.php"))
						$handle = @fopen("/var/www/_pages/$x/$x.php", "r");
					$needle = "class=\"frame\"";
					$adjusted_class = "class=\"frame\"";
					$php_buffer = "";
					if ($handle) {
					    while (($buffer = fgets($handle)) !== false) {
					    		
					    	// PHP code mode
					    	if(trim($buffer) == "<?php" or $php_buffer != ""){
					    		$php_buffer .= $buffer;
					    		if(trim($buffer) == "?>"){
					    			$php_buffer = str_replace("<?php", "", $php_buffer);
									$php_buffer = str_replace("?>", "", $php_buffer);
					    			eval($php_buffer);
									$php_buffer = "";
					    		}
					    	}
							
							// HTML mode
							else{
								if(array_search($x, $pages) != array_search($requested_page, $pages))
									$adjusted_class = "class=\"frame frame_inactive\"";
					    		$buffer = str_replace ($needle, $adjusted_class, $buffer);
					        echo $buffer;
							}
					    	
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
<?php ob_flush(); ?>