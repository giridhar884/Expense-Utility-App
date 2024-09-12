<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'hanuman_constructions');

if ($mysqli->connect_error) {
    die('Database connection error: ' . $mysqli->connect_error);
}
// Get data from AJAX request
$data = json_decode(file_get_contents('php://input'), true);
$txType = $data['txnType'];

// Fetch all transactions
//$query = "SELECT sum(amount) FROM transactions where type=$txType group by type";
//$creditBalance = $mysqli->query($query);
$query = "SELECT SUM(amount) AS total_amount FROM transactions WHERE type='$txType' GROUP BY type";
$result = mysqli_query($mysqli, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $totalAmount = $row['total_amount'];
} else {
    echo "Error: " . mysqli_error($conn);
}

//  $transactions = [];

//  while ($row = $result->fetch_assoc()) {
//      $transactions[] = $row;
//  }

echo json_encode($totalAmount);

$mysqli->close();
?>
