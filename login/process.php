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


// Verbinding maken met de databank
try {
	$db = new PDO('mysql:host=' . $DB_HOST . ';dbname=' . $DB_NAME . ';charset=utf8mb4', $DB_USER, $DB_PASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	echo "Connected to PLESK database.";
} catch (PDOException $e) {


	//Xampp
	$DB_USER = 'root'; //arne.haers
	$DB_PASS = ''; //Kqt20$r93
	$DB_NAME = 'firstproject'; //penguinspoolparty_logins

	$db = new PDO('mysql:host=' . $DB_HOST . ';dbname=' . $DB_NAME . ';charset=utf8mb4', $DB_USER, $DB_PASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

	echo "Connected to XAMPP database.";
} catch (PDOException $e) {
	echo 'Verbindingsfout: ' . $e->getMessage();
}

// Connect to the database
$conn = mysqli_connect($DB_HOST, $DB_USER, $DB_PASS, $DB_NAME);
// Check for errors
if (!$conn) {
	echo "Connection failed: " . mysqli_connect_error();
	die("Connection failed: " . mysqli_connect_error());
}

// Check if the login form was submitted
if (isset($_POST['login'])) {
	// Get the form data
	$username = htmlentities(trim($_POST['username']));
	$password = htmlentities(trim($_POST['password']));

	// Query the database for the user
	$stmt = mysqli_prepare($conn, "SELECT * FROM users WHERE username=?");
	mysqli_stmt_bind_param($stmt, "s", $username);
	mysqli_stmt_execute($stmt);
	$result = mysqli_stmt_get_result($stmt);

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
	$username = htmlentities(trim($_POST['username']));
	$email = htmlentities(trim($_POST['email']));
	$password = htmlentities(trim($_POST['password']));
	$confirm_password = htmlentities(trim($_POST['confirm_password']));

	// Validate the form data
	if (!preg_match("/^[a-zA-Z0-9 ]*$/", $username)) {
		$_SESSION['error'] = "Username can only contain letters, numbers, and spaces.";
		header("Location: index.php");
		exit();
	}
	if ($password !== $confirm_password) {
		$_SESSION['error'] = "Passwords do not match.";
		header("Location: index.php");
		exit();
	}

	// Hash the password
	$hashed_password = password_hash($password, PASSWORD_DEFAULT);

	// Insert the user into the database
	$stmt = mysqli_prepare($conn, "INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
	mysqli_stmt_bind_param($stmt, "sss", $username, $hashed_password, $email);
	if (mysqli_stmt_execute($stmt)) {
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