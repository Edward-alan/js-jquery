<?php
	$page = $_POST['page'];
	$size = $_POST['size'];

	echo json_encode(array('page' => $page, 'size' => $size ));
?>