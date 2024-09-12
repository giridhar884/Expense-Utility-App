<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'hanuman_constructions');

if ($mysqli->connect_error) {
    die('Database connection error: ' . $mysqli->connect_error);
}

// Get data from AJAX request
$data = json_decode(file_get_contents('php://input'), true);

$date = $data['date'];
$purpose = $data['purpose'];
$type = $data['type'];
$amount = $data['amount'];

// Insert the transaction into the database
$query = "INSERT INTO transactions (date, purpose, type, amount) VALUES ('$date', '$purpose', '$type', '$amount')";
$mysqli->query($query);

$mysqli->close();
?>
