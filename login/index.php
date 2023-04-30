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
		<title>Penguins Pool Party</title>

		<!-- SCRIPTS -->
		<script defer src="../JS/html/dataSetter.js"></script>
		<script defer="defer" src="../JS/html/overlay.js" type="module"></script>
		<script defer="defer" src="../JS/classes/FormValidator.js"></script>
	</head>
	<body>
		<div class="container">
			<header>
				<h1>Penguins Pool Party</h1>
				<a href="../" class="logo" title="logo"></a>
				<nav>
					<ul>
						<li>
							<a title="Home" class="nav-link fa fa-home" href="../">Home</a>
						</li>
						<li id="info">
							<a title="help" class="nav-link fa fa-info info">Info</a>
						</li>

						<li>
							<a title="highscores" class="nav-link fa fa-trophy" href="../highscores/">Scores</a>
						</li>

						<li>
							<a title="levels" class="nav-link fa fa-list" href="../levels/">Level</a>
						</li>

						<li>
							<!-- Login -->
							<a title="login" class="nav-link fa fa-user" href="./" aria-current="page">Login</a>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<div class="overlay">
					<div class="overlay-text">
						<h2>How to play</h2>
						<p>
							Fill in the empty spaces on the board with the given pieces.<br></br>
							Fit all the pieces in the board and win!<br></br>
							Each level has a different difficulty where the penguin’s have a different
							position.<br></br>
						</p>
					</div>
				</div>
				<form action="" id="login" class="form" novalidate>
					<h1>Login</h1>
					<div class="errorSummary" role="group" aria-labelledby="errorSummary-heading" tabindex="-1">
						<h2 id="errorSummary-heading">Er is een probleem</h2>
						<ul></ul>
					</div>
					<div>
						<label for="username">
							<span class="field-label">Username</span>
						</label>
						<input type="text" name="username" id="username" autocomplete="username" autofocus required
							tabindex="0" />
					</div>

					<div>
						<label for="password">
							<span class="field-label">Password</span>
						</label>
						<input type="password" name="password" id="password" required autocomplete="current-password" />
						<i class="fa fa-eye-slash" class="togglePassword"></i>
					</div>
					<a href="../register/">Not a member yet?</a>
					<div>
						<button class="cta" type="submit">Login</button>
					</div>

				</form>
			</main>
			<footer></footer>
		</div>
	</body>
</html>