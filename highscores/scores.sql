
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";




CREATE TABLE `highscores` (
  `id` int(11) NOT NULL,
  `time`  text COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `score` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



INSERT INTO `highscores` (`id`,`time`, `name`, `score`) VALUES
(1, '02:01' ,'name1', '13'),
(2,'02:03' ,'name2', '14'),
(3,'02:04' ,'name3', '15');



ALTER TABLE `highscores`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `highscores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;
