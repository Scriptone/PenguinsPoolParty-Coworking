<!-- login.php -->
<?php 
include('process.php'); 
?>
<!DOCTYPE html>
<html>
	<head>
		<title>Login</title>
	</head>
	<body>
		<h1>Login</h1>
		<?php if (isset($_SESSION['success'])) { ?>
			<p>
				<?php echo $_SESSION['success']; ?>
			</p>
			<?php unset($_SESSION['success']); ?>
		<?php } ?>
		<?php
		?>
		<?php if (isset($_SESSION['error'])) { ?>
			<p>
				<?php echo $_SESSION['error']; ?>
			</p>
			<?php unset($_SESSION['error']); ?>
		<?php } ?>
		<form method="post" action="login">
			<label for="username">Username:</label>
			<input type="text" name="username" required><br>
			<label for="password">Password:</label>
			<input type="password" name="password" required><br>
			<input type="submit" name="login" value="Login">
		</form>
	</body>
</html>