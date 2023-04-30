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

function connect()
{
	global $DB_HOST, $DB_USER, $DB_PASS, $DB_NAME;
	// Create a new database connection
	$mysqli = new mysqli($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);

	// Output any connection error
	if ($mysqli->connect_error) {
		die('Error : (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
	}
	return $mysqli;
}
function register()
{
	global $data;
	$username = $data['username'];
	$password = $data['password'];
	$confirmPassword = $data['confirm-password'];
	$email = $data['email'];


	// If the form data is valid, process it
	if (isValidForm($username, $password, $confirmPassword, $email)) {
		// Insert the user data into a database or perform other necessary actions

		$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

		// Create a new database connection
		$mysqli = connect();

		// Insert user data into database
		$sql = "INSERT INTO users (username, password, email) VALUES ('" . $mysqli->real_escape_string($username) . "', '" . $mysqli->real_escape_string($hash) . "', '" . $mysqli->real_escape_string($email) . "')";
		$insert = $mysqli->query($sql);


		// Return a response to the JavaScript code
		$_SESSION['user_id'] = $mysqli->insert_id;
		$_SESSION['username'] = $username;
		$_SESSION['logged_in'] = time();
		$_SESSION['success'] = true;
	}

	echo json_encode($_SESSION);
}

function login()
{
	global $data;
	$mysqli = connect();
	$username = $data['username'];
	$password = $data['password'];

	// Check if credentials are valid
	$sql = "SELECT * FROM users WHERE username = '" . $mysqli->real_escape_string($username) . "'";
	$result = $mysqli->query($sql);
	$user = $result->fetch_assoc();

	if (password_verify($password, $user['password'])) {
		// Set session variables
		$_SESSION['user_id'] = $user['id'];
		$_SESSION['username'] = $user['username'];
		$_SESSION['logged_in'] = time();
		$_SESSION['success'] = true;
		$_SESSION['error'] = false;
		// Update the logged_in column in the database
		$sql = "UPDATE users SET logged_in = " . $_SESSION['logged_in'] . " WHERE id = " . $_SESSION['user_id'];
		$result = $mysqli->query($sql);

		// Redirect the user to the private members-only page
		echo json_encode($_SESSION);
	} else {
		// If credentials are not valid, show an error message and return to the login page
		$_SESSION['error'] = 'Invalid login credentials';
		echo json_encode($_SESSION);
	}

}

function logout()
{

}
$action = $data['action'];

switch ($action) {
	case 'register':
		register();
		break;
	case 'login':
		login();
		break;
	case 'logout':
		logout();
		break;
}


function isValidForm(...$fields)
{

	$username = $fields[0];
	$password = $fields[1];
	$confirmPassword = $fields[2];
	$email = $fields[3];

	// Check if the form fields are empty
	for ($i = 0; $i < count($fields); $i++) {
		if (empty($fields[$i])) {
			$_SESSION['error'] = 'All fields are required.';
			return false;
		}
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