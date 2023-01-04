-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- ホスト: 127.0.0.1
-- 生成日時: 2022-12-26 05:20:22
-- サーバのバージョン： 10.4.11-MariaDB
-- PHP のバージョン: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- データベース: `hal_auction`
--

-- --------------------------------------------------------

--
-- テーブルの構造 `bid`
--

CREATE TABLE `bid` (
  `bid_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL,
  `bid_price` int(11) NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `bid`
--

INSERT INTO `bid` (`bid_id`, `user_id`, `car_id`, `bid_price`, `time`) VALUES
(1, 1, 5, 10000, '2022-11-30 13:52:30'),
(4, 1, 5, 15000, '2022-11-30 13:52:30'),
(5, 1, 20, 30000, '2022-11-30 13:52:30'),
(7, 1, 5, 40000, '2022-11-30 13:52:30'),
(8, 0, 5, 40000, '2022-11-30 13:52:30'),
(9, 2, 4, 100000, '2022-11-30 13:52:30'),
(10, 5, 4, 100000, '2022-11-30 13:52:30');

-- --------------------------------------------------------

--
-- テーブルの構造 `car`
--

CREATE TABLE `car` (
  `car_id` int(11) NOT NULL,
  `car_type_id` int(11) NOT NULL,
  `purchase_price` int(11) NOT NULL,
  `body_type` int(11) NOT NULL,
  `model_year` text NOT NULL,
  `mileage` int(11) NOT NULL,
  `is_actual_driving` int(11) NOT NULL,
  `color` int(11) NOT NULL,
  `vehicle_inspection_expiration_date` date DEFAULT NULL,
  `automatic_or_mission` int(11) NOT NULL,
  `displacement` int(11) NOT NULL,
  `number_of_passengers` int(11) NOT NULL,
  `drive_system` int(11) NOT NULL,
  `equipment` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `car`
--

INSERT INTO `car` (`car_id`, `car_type_id`, `purchase_price`, `body_type`, `model_year`, `mileage`, `is_actual_driving`, `color`, `vehicle_inspection_expiration_date`, `automatic_or_mission`, `displacement`, `number_of_passengers`, `drive_system`, `equipment`) VALUES
(1, 6, 100000, 100, '2015', 90000, 1, 100, NULL, 1, 100, 4, 100, NULL);

-- --------------------------------------------------------

--
-- テーブルの構造 `car_type`
--

CREATE TABLE `car_type` (
  `car_type_id` int(11) NOT NULL,
  `maker_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `img_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `car_type`
--

INSERT INTO `car_type` (`car_type_id`, `maker_id`, `name`, `img_name`) VALUES
(1, 1, 'デイズ', 'dayz.png'),
(2, 1, 'ルークス', 'roox.png'),
(3, 1, 'ノート', 'note.png'),
(4, 1, 'セレナ', 'serena.png'),
(5, 2, 'アクア', 'aqua.png'),
(6, 2, 'アルファード', 'alphard.png'),
(7, 2, 'プリウス', 'prius.png'),
(8, 2, 'クラウン', 'crown.png'),
(9, 3, 'ハスラー', 'hustler.png'),
(10, 3, 'クロスビー', 'xbee.png'),
(11, 3, 'ソリオ', 'solio.png'),
(12, 3, 'ラパン', 'lapin.png'),
(13, 4, 'ムーヴ', 'move.png'),
(14, 4, 'タントー', 'tanto.png'),
(15, 4, 'ブーン', 'boon.png'),
(16, 4, 'ロッキー', 'rocky.png'),
(17, 5, 'フィット', 'fit.png'),
(18, 5, 'フリード', 'freed.png'),
(19, 5, 'インサイト', 'insight.png'),
(20, 5, 'ヴェゼル', 'vezel.png');

-- --------------------------------------------------------

--
-- テーブルの構造 `exhibit`
--

CREATE TABLE `exhibit` (
  `car_id` int(11) NOT NULL,
  `lowest_price` int(11) NOT NULL,
  `first_price` int(11) NOT NULL,
  `bid_increase` int(11) NOT NULL,
  `now_price` int(11) DEFAULT NULL,
  `time_from` datetime DEFAULT NULL,
  `time_to` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `exhibit`
--

INSERT INTO `exhibit` (`car_id`, `lowest_price`, `first_price`, `bid_increase`, `now_price`, `time_from`, `time_to`) VALUES
(1, 100000, 10000, 10, 200000, '2022-11-30 13:52:40', '2022-11-30 13:52:30');

-- --------------------------------------------------------

--
-- テーブルの構造 `favorite_car_type`
--

CREATE TABLE `favorite_car_type` (
  `favorite_car_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `car_type_id` int(11) DEFAULT NULL,
  `maker_id` int(11) DEFAULT NULL,
  `keyword` text DEFAULT NULL,
  `equipment` int(11) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `clor` int(11) DEFAULT NULL,
  `automatic_or_mission` int(11) DEFAULT NULL,
  `number_of_passengers` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `favorite_exhibit`
--

CREATE TABLE `favorite_exhibit` (
  `user_id` int(11) NOT NULL,
  `car_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `favorite_exhibit`
--

INSERT INTO `favorite_exhibit` (`user_id`, `car_id`) VALUES
(3, 8);

-- --------------------------------------------------------

--
-- テーブルの構造 `maker`
--

CREATE TABLE `maker` (
  `maker_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `img_name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- テーブルのデータのダンプ `maker`
--

INSERT INTO `maker` (`maker_id`, `name`, `img_name`) VALUES
(1, '日産', 'nissan.png'),
(2, 'トヨタ', 'toyota.png'),
(3, 'スズキ', 'suzuki.png'),
(4, 'ダイハツ', 'daihatsu.png'),
(5, 'ホンダ', 'honda.png');

-- --------------------------------------------------------

--
-- テーブルの構造 `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `notification_type` int(11) NOT NULL,
  `car_id` int(11) DEFAULT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- テーブルの構造 `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `login_id` text NOT NULL,
  `hash_password` text NOT NULL,
  `user_name` text NOT NULL,
  `phone_number` text NOT NULL COMMENT 'ハイフン区切り',
  `post_code` text NOT NULL COMMENT 'ハイフン区切り',
  `address` text NOT NULL,
  `apartment` text DEFAULT NULL,
  `credit_card_number` int(16) NOT NULL,
  `status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- ダンプしたテーブルのインデックス
--

--
-- テーブルのインデックス `bid`
--
ALTER TABLE `bid`
  ADD PRIMARY KEY (`bid_id`);

--
-- テーブルのインデックス `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`car_id`);

--
-- テーブルのインデックス `car_type`
--
ALTER TABLE `car_type`
  ADD PRIMARY KEY (`car_type_id`);

--
-- テーブルのインデックス `exhibit`
--
ALTER TABLE `exhibit`
  ADD PRIMARY KEY (`car_id`);

--
-- テーブルのインデックス `favorite_car_type`
--
ALTER TABLE `favorite_car_type`
  ADD PRIMARY KEY (`favorite_car_type_id`);

--
-- テーブルのインデックス `maker`
--
ALTER TABLE `maker`
  ADD PRIMARY KEY (`maker_id`);

--
-- テーブルのインデックス `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`);

--
-- テーブルのインデックス `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- ダンプしたテーブルのAUTO_INCREMENT
--

--
-- テーブルのAUTO_INCREMENT `bid`
--
ALTER TABLE `bid`
  MODIFY `bid_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- テーブルのAUTO_INCREMENT `car`
--
ALTER TABLE `car`
  MODIFY `car_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- テーブルのAUTO_INCREMENT `car_type`
--
ALTER TABLE `car_type`
  MODIFY `car_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- テーブルのAUTO_INCREMENT `favorite_car_type`
--
ALTER TABLE `favorite_car_type`
  MODIFY `favorite_car_type_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `maker`
--
ALTER TABLE `maker`
  MODIFY `maker_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- テーブルのAUTO_INCREMENT `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- テーブルのAUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
