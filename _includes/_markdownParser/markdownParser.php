<?php
function parse_and_output_file($x){
	$handle = @fopen($x, "r");
	if($handle){
		while (($buffer = fgets($handle)) !== false) {
			echo $buffer;
		}
	}
}
?>
