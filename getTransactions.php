<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'hanuman_constructions');

if ($mysqli->connect_error) {
    die('Database connection error: ' . $mysqli->connect_error);
}

// Fetch all transactions
$query = "SELECT * FROM transactions ORDER BY date DESC";
$result = $mysqli->query($query);

$transactions = [];

while ($row = $result->fetch_assoc()) {
    $transactions[] = $row;
}

echo json_encode($transactions);

$mysqli->close();
?>
