<!-- registration.php -->
<?php
include('process.php');
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Registration</title>
	</head>
	<body>
		<h1>Registration</h1>
		<?php if (isset($_SESSION['error'])) { ?>
			<p>
				<?php echo $_SESSION['error']; ?>
			</p>
			<?php unset($_SESSION['error']); ?>
		<?php } ?>
		<form method="post" action="">
			<label for="username">Username:</label>
			<input type="text" name="username" required><br>
			<label for="password">Password:</label>
			<input type="password" name="password" required><br>
			<label for="confirm_password">Confirm Password:</label>
			<input type="password" name="confirm_password" required><br>
			<input type="submit" name="register" value="Register">
		</form>
	</body>
</html>