<?php
// Database connection
$mysqli = new mysqli('localhost', 'root', '', 'hanuman_constructions');

if ($mysqli->connect_error) {
    die('Database connection error: ' . $mysqli->connect_error);
}

    // Get data from AJAX request
    $data = json_decode(file_get_contents('php://input'), true);
    echo "Data received is ";
    echo $data;
    $username = $data['username'];
    $password = $data['password'];
    $role = $data['role']; // Employee or Admin
    echo "Just after getting Auth details";
    $query="select password,role from login where username=$username";
    $result=$mysqli->query($query);
    $db_password=$result['password'];
    $db_role=$result['role'];
    if($password==$db_password && $role==$db_role){
        //header('Location: $role-dashboard.html')
        session_start();
        
        echo "Authentication Success";
        json_encode("Authentication Success");
    }else{
        session_destroy();
        json_encode("Authentication Failed");
        //$error="Invalid Credentials";
    }
    // // Hardcoded user credentials for demo
    // if ($username === 'admin' && $password === 'admin123' && $role === 'admin') {
    //     $_SESSION['username'] = $username;
    //     $_SESSION['role'] = $role;
    //     header('Location: admin-dashboard.php'); // Redirect to admin dashboard
    // } elseif ($username === 'employee' && $password === 'emp123' && $role === 'employee') {
    //     $_SESSION['username'] = $username;
    //     $_SESSION['role'] = $role;
    //     header('Location: employee-dashboard.php'); // Redirect to employee dashboard
    // } else {
    //     $error = "Invalid credentials. Please try again.";
    // }

?>