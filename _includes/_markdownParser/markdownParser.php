<?php

// Convert markdown file to HTML and output it
function parse_and_output_file($x){
	$final_output = "";
	$text = file_get_contents($x);
	if($text){
		
		# Explode by sets of two new-lines
		foreach (explode("\n\n", $text) as $x) {
			if(substr($x, -3, 3) == "==="){
				$buffer = substr($x, 0, strrpos($x, "\n"));
				$buffer = parse_single_line($buffer);
				$final_output .= "<h1>$buffer</h1>";
			}
			else if(substr($x, -3, 3) == "---"){
				$buffer = substr($x, 0, strrpos($x, "\n"));
				$buffer = parse_single_line($buffer);
				$final_output .= "<h2>$buffer</h2>";
			}
			else if(substr($x, 0, 4) == "### "){
				$buffer = parse_single_line(substr($x, 4));
				$final_output .= "<h3>$buffer</h3>";
			}
			else{
				$buffer = parse_single_line($x);
				$final_output .= "<p>$buffer</p>";
			}
		}
		
		#output
		echo $final_output;
	}
}

// PRIVATE: Parses single-line markdown commands (character by character)
function parse_single_line($text){
	$output = "";
	$delim = array("italic" => false, "bold" => false, "code" => false);
	foreach(preg_split("#(\*{1,2}|\`)#", $text,0, PREG_SPLIT_DELIM_CAPTURE | PREG_SPLIT_NO_EMPTY) as $x){
		if($x === "*"){
			$output .= ($delim["italic"] == true) ? '</i>' : '<i>';
			$delim["italic"] = !$delim["italic"];
		}
		else if($x === "**"){
			$output .= ($delim["bold"] == true) ? '</strong>' : '<strong>';
			$delim["bold"] = !$delim["bold"];
		}
		else if($x === "`"){
			$output .= ($delim["code"] == true) ? '</code>' : '<code>';
			$delim["code"] = !$delim["code"];
		}
		else
			$output .= $x;
	}
	return $output;
}

?>
