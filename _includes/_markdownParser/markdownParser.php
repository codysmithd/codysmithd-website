<?php
// Line by line conversion from Markdown to HTML
// NOTE: Only supports h1-h3, p, and text formatting (not lists or anything else like that)
function parse_and_output_file($x){
	$final_output = "";
	$text = file_get_contents ($x);
	if($text){
			
		#Create new <p> on empty spaces 
		$pTags = explode("\n\n", $text);
		foreach ($pTags as $x) {
			$final_output .= "<p>$x</p>";
		}
		
		#output
		echo $final_output;
	}
}
?>
