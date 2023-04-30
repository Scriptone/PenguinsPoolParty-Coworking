<!-- registration.php -->
<?php
include('process.php');
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Poppins -->
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
			rel="stylesheet" />

		<!-- Font awesome -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
			integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
			crossorigin="anonymous" referrerpolicy="no-referrer" />
		<!-- STYLE SHEETS -->
		<link rel="stylesheet" href="../css/style.css" />
		<link rel="stylesheet" href="../css/levels.css" />
		<title>Penguins Pool Party</title>

		<!-- SCRIPTS -->
		<script defer src="../JS/html/dataSetter.js"></script>
		<script defer="defer" src="../JS/html/levels.js" type="module"></script>
	</head>
	<body>
		<div class="container">
			<header>
				<h1>Penguins Pool Party</h1>
				<a href="../" class="logo" title="logo"></a>
				<nav>
					<ul>
						<li>
							<a title="Home" class="nav-link fa fa-home" href="../" aria-current="page">Home</a>
						</li>
						<li>
							<a title="help" class="nav-link fa fa-info" href="">Info</a>
						</li>

						<li>
							<a title="highscores" class="nav-link fa fa-trophy" href="../highscores/">Scores</a>
						</li>

						<li>
							<a title="levels" class="nav-link fa fa-list" href="./">Level</a>
						</li>
					</ul>
				</nav>
			</header>
			<main>
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
					<label for="email">Email:</label>
					<input type="email" name="email" required><br>
					<input type="submit" name="register" value="Register">
				</form>
			</main>
			<footer></footer>
		</div>
	</body>
</html>