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
print_r($_POST);
$username = $_POST['username'];

// Perform any additional validation on the form data
// ...

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

function isValidForm()
{
	// Perform validation on the form data
	// ...
	return true; // Return true if the form data is valid
}
?>