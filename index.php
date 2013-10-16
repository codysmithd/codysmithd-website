<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="width:100%; height:100%; font-family:Arial, Helvetica, sans-serif;">
<?php
	// Figure out which page has been requested
	$requested_page = substr($_SERVER['REQUEST_URI'], 1); //strip off first slash
	for($i=0;$i<strlen($requested_page);$i++) { // Find the page part of the URL
    	 if(strpos("?#/",$requested_page[$i]) !== false){
    	 	$requested_page = substr($requested_page, 0, $i);
			break;
    	 }
	}
	
	// Make list of valid pages
	$pages = array();
	foreach(scandir("/var/www/_pages") as $x){
		if($x != '.' and $x != '..' and $x[0] != '_' and file_exists('/var/www/_pages/' . $x . '/' . $x . '.html'))
			array_push($pages, $x);
	}
	
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
</head>

<body>
	<?php
		//Include page style-sheets
		if($ERROR_404 and file_exists('/var/www/_pages/_404/404.css')){
			echo '<style>';
			include '/var/www/_pages/_404/404.css';
			echo '</style>';
		}
		else{
			echo '<style>';
			foreach($pages as $x){
				if(file_exists('/var/www/_pages/' . $x . '/' . $x . '.css'))
					include '/var/www/_pages/' . $x . '/' . $x . '.css';
			}
			echo '</style>';
		}
		
		// Include pages
		if($ERROR_404){
			include "_pages/_404/404.html";
		}
		else{
			echo "Valid Page";
		}
	?>
</body>
</html>