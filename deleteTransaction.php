<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'hanuman_constructions');

if ($mysqli->connect_error) {
    die('Database connection error: ' . $mysqli->connect_error);
}

// Get data from AJAX request
$data = json_decode(file_get_contents('php://input'), true);
$id = $data['id'];

// Delete the transaction
$query = "DELETE FROM transactions WHERE id = $id";
$mysqli->query($query);

$mysqli->close();
?>
