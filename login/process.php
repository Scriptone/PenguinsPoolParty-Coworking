<?php
// Set database connection constants
define('DB_HOST', 'localhost');
define('DB_USER', 'arne.haers');
define('DB_PASS', 'Kqt20$r93');
define('DB_NAME', 'penguinspoolparty_logins');

// Start the session
session_start();

// Connect to the database
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

// Check for errors
if (!$conn) {
	die("Connection failed: " . mysqli_connect_error());
}

// Check if the login form was submitted
if (isset($_POST['login'])) {
	// Get the form data
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);

	// Query the database for the user
	$query = "SELECT * FROM users WHERE username='$username'";
	$result = mysqli_query($conn, $query);

	// Check if the user exists and the password is correct
	if (mysqli_num_rows($result) == 1) {
		$user = mysqli_fetch_assoc($result);
		if (password_verify($password, $user['password'])) {
			// Set the session variables
			$_SESSION['loggedin'] = true;
			$_SESSION['username'] = $username;

			// Redirect to the home page
			header("Location: ../index.html");
			exit();
		} else {
			$_SESSION['error'] = "Invalid password.";
			header("Location: index.php");
			exit();
		}
	} else {
		$_SESSION['error'] = "Invalid username.";
		header("Location: index.php");
		exit();
	}
}

// Check if the registration form was submitted
if (isset($_POST['register'])) {
	// Get the form data
	$username = mysqli_real_escape_string($conn, $_POST['username']);
	$email = mysqli_real_escape_string($conn, $_POST['email']);
	$password = mysqli_real_escape_string($conn, $_POST['password']);
	$confirm_password = mysqli_real_escape_string($conn, $_POST['confirm_password']);

	// Validate the form data
	if ($password !== $confirm_password) {
		$_SESSION['error'] = "Passwords do not match.";
		header("Location: index.php");
		exit();
	}

	// Hash the password
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	// Insert the user into the database
	$query = "INSERT INTO users (username, password, email) VALUES ('$username', '$hashed_password', '$email')";
	if (mysqli_query($conn, $query)) {
		// Set the session variables
		$_SESSION['loggedin'] = true;
		$_SESSION['username'] = $username;

		// Redirect to the home page
		header("Location: ../../index.html");
		exit();
	} else {
		$_SESSION['error'] = "Error: " . mysqli_error($conn);
		header("Location: index.php");
		exit();
	}
}

// Close the database connection
mysqli_close($conn);
?>