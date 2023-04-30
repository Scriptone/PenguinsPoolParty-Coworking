<?php


// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Set database connection constants
$DB_HOST = 'localhost';
$DB_USER = 'arne.haers'; //arne.haers
$DB_PASS = 'Kqt20$r93'; //Kqt20$r93
$DB_NAME = 'penguinspoolparty_logins'; //penguinspoolparty_logins

date_default_timezone_set('Europe/Brussels');
// Retrieve the form data from the $_POST superglobal array

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$username = $data['username'];
$password = $data['password'];
$confirmPassword = $data['confirm-password'];
$email = $data['email'];


// If the form data is valid, process it
if (isValidForm()) {
	// Insert the user data into a database or perform other necessary actions
	// ...

	// Return a response to the JavaScript code
	
	echo "Form submitted successfully!";
} else {
	// Return an error response to the JavaScript code
	echo "Form submission failed!";
}

if (isset($_SESSION['error'])) {
	echo $_SESSION['error'];
}

function isValidForm()
{
	global $username, $password, $confirmPassword, $email;
	// Check if required fields have data
	if (
		!isset($username) || !isset($password) || !isset($confirmPassword) || !isset($email)
		|| $username === '' || $password === '' || $confirmPassword === '' || $email === ''
	) {
		$_SESSION['error'] = 'Please fill out all required fields.';
		return false;
	}

	// Check if the username is valid
	if (!preg_match('/^[a-zA-Z0-9]{5,}$/', $username)) {
		$_SESSION['error'] = 'Invalid username.';
		return false;
	}

	// Check if the passwords match
	if ($password !== $confirmPassword) {
		$_SESSION['error'] = 'Passwords do not match.';
		return false;
	}

	// Check if the password is valid
	if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/', $password)) {
		$_SESSION['error'] = 'Invalid password.';
		return false;
	}

	// Check if the email address is valid
	if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$_SESSION['error'] = 'Invalid email address.';
		return false;
	}

	return true; // Return true if the form data is valid
}
?>