<?php

// Show all errors (for educational purposes)
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);

// Constanten (connectie-instellingen databank)
define('DB_HOST', 'localhost');
define('DB_USER', 'arne.haers'); //arne.haers
define('DB_PASS', 'Kqt20$r93'); //Kqt20$r93
define('DB_NAME', 'penguinspoolparty_highscore');

date_default_timezone_set('Europe/Brussels');

// Verbinding maken met de databank
try {
	$db = new PDO('mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4', DB_USER, DB_PASS);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
	echo 'Verbindingsfout: ' . $e->getMessage();
	exit;
}
$level = isset($_GET['level']);
$name = isset($_GET['name']);
$time = isset($_GET['time']);
?>
<!DOCTYPE html>
<html lang="en">

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
			<link rel="stylesheet" href="../css/scoreboard.css" />
			<title>Penguins Pool Party Highscore</title>
		</head>



		<body>
			<div class=container>
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
								<a title="highscores" class="nav-link fa fa-trophy" href="./">Scores</a>
							</li>

							<li>
								<a title="levels" class="nav-link fa fa-list" href="../levels">Level</a>
							</li>
						</ul>
					</nav>
				</header>


				<main>
					<div class="containerScores">
						<div class="topScoreBoard">
							<h1>naam</h1>
							<h1>tijd<h1>
									<h1>score<h1>
						</div>
						<?php
						$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);


						$query = "SELECT * FROM highscores";
						$query_run = mysqli_query($conn, $query);

						if (mysqli_num_rows($query_run) > 0) {
							foreach ($query_run as $row) {
								?>
								<ul class="list">
									<li>
										<h1>
											<?= $row['name']; ?>
										</h1>
									</li>
									<li>
										<h1>
											<?= $row['time']; ?>
										</h1>
									</li>
									<li>
										<h1>
											<?= $row['score']; ?>
										</h1>
									</li>
								</ul>
							<?php } ?>
						<?php } ?>
					</div>
				</main>
				<footer>
				</footer>
			</div>

		</body>

	</html>