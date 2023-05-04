<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<!-- Favicon -->
		<link rel="shortcut icon" href="../assets/penguin.svg" type="image/x-icon" />
		<!-- Poppins -->
		<link rel="preconnect" href="https://fonts.gstatic.com" />
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
			rel="stylesheet" />

		<!-- Font awesome -->
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
			integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
			crossorigin="anonymous" referrerpolicy="no-referrer" />
		<!-- STYLE SHEETS -->
		<link rel="stylesheet" href="../css/normalize.css" />
		<link rel="stylesheet" href="../css/style.css" />
		<link rel="stylesheet" href="../css/levels.css" />
		<title>Penguins Pool Party</title>

		<!-- SCRIPTS -->
		<script defer src="../JS/html/dataSetter.js"></script>
		<script src="../JS/html/index.js" type="module"></script>
		<script src="../JS/html/login.js" type="module"></script>
	</head>
	<body>
		<header>
			<div class="container">
				<h1>Penguins Pool Party</h1>
				<a href="../" class="logo" title="logo"></a>

				<button class="hamburger-btn" aria-expanded="false">
					<svg class="hamburger" viewBox="0 0 100 100">
						<line class="line top" x1="90" x2="10" y1="40" y2="40"></line>
						<line class="line bottom" x1="10" x2="90" y1="60" y2="60"></line>
					</svg>
				</button>
				<nav>
					<ul class="nav-menu">
						<li class="nav-item" style="--fade: 0.1s">
							<a title="Home" class="nav-link fa fa-home" href="../">Home</a>
						</li>
						<li id="info" class="nav-item" style="--fade: 0.2s">
							<a title="help" class="nav-link fa fa-info info">Info</a>
						</li>

						<li class="nav-item" style="--fade: 0.3s">
							<a title="highscores" class="nav-link fa fa-trophy" href="../highscores/">Scores</a>
						</li>

						<li class="nav-item" style="--fade: 0.4s">
							<a title="levels" class="nav-link fa fa-list" href="../levels/">Level</a>
						</li>

						<li class="nav-item" style="--fade: 0.5s">
							<!-- Login -->
							<a title="login" class="nav-link fa fa-sign-in-alt" href="../login/">Login</a>
						</li>
						<li class="nav-item" style="--fade: 0.5s">
							<!-- Login -->
							<a title="login" class="nav-link fa fa-sign-out-alt" href="../logout/">Logout</a>
						</li>
					</ul>
				</nav>
			</div>
		</header>
		<main>
			<div class="container">
				<div class="overlay">
					<div class="overlay-text">
						<h2>How to play</h2>
						<p>
							Fill in the empty spaces on the board with the given
							pieces. Fit all the pieces in the board and win!
							Each level has a different difficulty where the
							penguin’s have a different position.
						</p>
					</div>
				</div>
				<form action="" id="login" class="form" novalidate>
					<h2>Login</h2>
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
						<button class="toggle-password fa fa-eye-slash" type= "button"></button>
					</div>

					<div>
						<button class="cta" type="submit">Login</button>
					</div>
					<a href="../register/">Not a member yet?</a>
				</form>
			</div>
		</main>

	</body>
</html>