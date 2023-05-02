<?php

session_start();
// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Set database connection constants
$DB_HOST = 'localhost';
$DB_USER = 'arne.haers'; //arne.haers
$DB_PASS = 'Kqt20$r93'; //Kqt20$r93
$DB_NAME = 'PenguinsPoolParty'; //penguinspoolparty_logins

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

		//Indien user op gast account levels complete, dan slaan we deze op in de database.
		$levels_completed = isset($_SESSION['levels_completed']) && !isset($_SESSION['user_id']) ? $_SESSION['levels_completed'] : 0;

		// Insert user data into database
		$sql = "INSERT INTO users (username, password, email, levels_completed) VALUES ('" . $mysqli->real_escape_string($username) . "', '" . $mysqli->real_escape_string($hash) . "', '" . $mysqli->real_escape_string($email) . "', '" . $mysqli->real_escape_string($levels_completed) . "')";
		$insert = $mysqli->query($sql);


		// Return a response to the JavaScript code
		$_SESSION['user_id'] = $mysqli->insert_id;
		$_SESSION['username'] = $username;
		$_SESSION['levels_completed'] = $levels_completed;


		$_SESSION['error'] = false;
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


	if ($user && password_verify($password, $user['password'])) {
		// Set session variables
		$_SESSION['user_id'] = $user['id'];
		$_SESSION['username'] = $user['username'];
		$_SESSION['levels_completed'] = $user['levels_completed'];
		$_SESSION['success'] = true;
		$_SESSION['error'] = false;

		// Return a response to the JavaScript code
		echo json_encode($_SESSION);
	} else {
		// If credentials are not valid, show an error message and return to the login page
		$_SESSION['error'] = 'Invalid login credentials.';
		echo json_encode($_SESSION);
	}

}

function log_level($level, $completedTime)
{
	$userId = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : false;
	$levels_completed = isset($_SESSION['levels_completed']) ? $_SESSION['levels_completed'] : 0;

	if ($level >= $levels_completed + 1) {
		$_SESSION['levels_completed'] = $level;
		$levels_completed = $level;

		//Indien geen userid return
		if ($userId) {
			$mysqli = connect();
			$sql = "UPDATE users SET levels_completed = '" . $mysqli->real_escape_string($levels_completed) . "' WHERE id = '" . $mysqli->real_escape_string($userId) . "'";
			$result = $mysqli->query($sql);
		}


		$_SESSION['success'] = true;
		$_SESSION['error'] = false;

	} else {
		$_SESSION['error'] = 'Not a valid level to log.';
		$_SESSION['success'] = false;
	}
	echo json_encode($_SESSION);
}
function logout()
{
	session_destroy();
	$_SESSION['success'] = true;
	$_SESSION['error'] = false;
	echo json_encode($_SESSION);
}

function highscores()
{
	$mysqli = connect();
	$sql = "SELECT * FROM users ORDER BY levels_completed DESC";
	$result = $mysqli->query($sql);
	$users = $result->fetch_all(MYSQLI_ASSOC);
	echo json_encode($users);
}

function get_user()
{
	if (isset($_SESSION['user_id'])) {
		$mysqli = connect();
		$sql = "SELECT * FROM users WHERE id = '" . $mysqli->real_escape_string($_SESSION['user_id']) . "'";
		$result = $mysqli->query($sql);
		$user = $result->fetch_assoc();
		return $user;
	}
	return false;
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
	case 'log_level':
		log_level($data['level'], $data['time']);
		break;
	case 'highscores':
		highscores();
		break;
	case 'get_user':
		echo json_encode(get_user());
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