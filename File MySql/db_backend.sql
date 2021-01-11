-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 11, 2021 at 07:40 AM
-- Server version: 10.4.16-MariaDB
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_backend`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_cart`
--

CREATE TABLE `tb_cart` (
  `id` int(10) NOT NULL COMMENT 'id cart',
  `receipt` varchar(20) NOT NULL COMMENT 'receipt cart',
  `cashier` varchar(50) NOT NULL COMMENT 'cashier cart',
  `payment` varchar(30) NOT NULL COMMENT 'method payment',
  `product` text NOT NULL COMMENT 'product cart',
  `incart` int(10) NOT NULL COMMENT 'incart',
  `price` int(10) NOT NULL COMMENT 'price cart',
  `subtotal` int(10) NOT NULL COMMENT 'subtotal'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_cart`
--

INSERT INTO `tb_cart` (`id`, `receipt`, `cashier`, `payment`, `product`, `incart`, `price`, `subtotal`) VALUES
(1, '#001', 'Cashier 1', 'cash', 'Coffe Latte', 2, 15000, 30000),
(2, '#001', 'Cashier 1', 'cash', 'Salmon Truffle', 2, 60000, 120000),
(3, '#002', 'Cashier 2', 'cash', 'Wiener Schnitzel', 2, 70000, 140000),
(4, '#002', 'Cashier 2', 'cash', 'Coffe Latte', 1, 15000, 15000),
(5, '#002', 'Cashier 2', 'cash', 'Espreesso', 1, 12000, 12000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_cashier`
--

CREATE TABLE `tb_cashier` (
  `id_cashier` varchar(50) NOT NULL COMMENT 'id_cashier',
  `name_cashier` varchar(50) NOT NULL COMMENT 'name_cashier',
  `shift` int(5) NOT NULL COMMENT 'shift work'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_cashier`
--

INSERT INTO `tb_cashier` (`id_cashier`, `name_cashier`, `shift`) VALUES
('Cashier 1', 'Ani Setiawati', 1),
('Cashier 2', 'Aditya Sudarma', 2);

-- --------------------------------------------------------

--
-- Table structure for table `tb_category`
--

CREATE TABLE `tb_category` (
  `code` int(10) NOT NULL COMMENT 'code category',
  `category` varchar(50) NOT NULL COMMENT 'category',
  `description` text DEFAULT NULL COMMENT 'description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_category`
--

INSERT INTO `tb_category` (`code`, `category`, `description`) VALUES
(1, 'COFFE', 'Minuman berbahan dasar coffe'),
(2, 'TEA', 'Minuman berbahan dasar tea'),
(3, 'DESSERT', 'Hidangan cuci mulut'),
(4, 'MAIN COURSE', 'Hidangan utama'),
(5, 'ICE CREAM', 'Ice Cream'),
(6, 'Fresh Milk', 'Milk');

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id` int(10) NOT NULL COMMENT 'ic history',
  `invoices` varchar(20) NOT NULL COMMENT 'invoices history',
  `cashier` varchar(50) NOT NULL COMMENT 'cashier history',
  `date` datetime DEFAULT current_timestamp() COMMENT 'date history',
  `cart` varchar(255) NOT NULL COMMENT 'cart history',
  `amount` varchar(30) NOT NULL COMMENT 'amount history'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_history`
--

INSERT INTO `tb_history` (`id`, `invoices`, `cashier`, `date`, `cart`, `amount`) VALUES
(1, '#001', 'Cashier 2', '2021-01-10 21:12:04', 'Choco Rhum x1', '30000'),
(2, '#002', 'Cashier 2', '2021-01-10 21:12:57', 'Coffee Latte x1, Salmon Truffle 1x', '75000'),
(3, '#003', 'Cashier 2', '2021-01-10 21:14:01', 'Cappucino x2, Black Forest 1x', '55000'),
(4, '#004', 'Cashier 2', '2021-01-10 21:35:55', 'Wiener Schnitzel x1, Red Velvet Latte x1', '102000'),
(5, '#005', 'Cashier 2', '2021-01-11 08:45:14', 'Espresso x1, Cappucino x2', '32000'),
(6, '#006', 'Cashier 1', '2021-01-11 11:23:57', 'Espresso x3, Cappucino x1', '42000');

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `id` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `code` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(30) NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`id`, `date`, `code`, `name`, `image`, `price`) VALUES
(1, '2021-01-09 23:24:17', 1, 'Espresso', 'espresso.png', 10000),
(2, '2021-01-08 20:35:56', 1, 'Coffe Latte', 'coffe_latte.png', 15000),
(3, '2021-01-08 20:35:56', 1, 'Cappucinno', 'cappucino.png', 22000),
(4, '2021-01-08 20:35:56', 1, 'Red Velvet Latte', 'red_velvet_latte.png', 33000),
(5, '2021-01-08 20:35:56', 3, 'Choco Rhum', 'choco_rhum.png', 28000),
(6, '2021-01-08 20:35:56', 3, 'Black Forest', 'black_forest.png', 30000),
(7, '2021-01-08 20:35:56', 4, 'Chicken Katsu Dabu-dabu', 'chicken_katsu_db.png', 60000),
(8, '2021-01-08 20:35:56', 4, 'Salmon Truffle', 'salmon_truffle.png', 65000),
(9, '2021-01-08 20:35:56', 4, 'Wiener Schnitzel', 'wienerschnitzel.png', 70000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_cashier`
--
ALTER TABLE `tb_cashier`
  ADD PRIMARY KEY (`id_cashier`);

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`code`);

--
-- Indexes for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `corelation code` (`code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_cart`
--
ALTER TABLE `tb_cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'id cart', AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT COMMENT 'ic history', AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD CONSTRAINT `relation cashier` FOREIGN KEY (`cashier`) REFERENCES `tb_cashier` (`id_cashier`);

--
-- Constraints for table `tb_history`
--
ALTER TABLE `tb_history`
  ADD CONSTRAINT `kasir` FOREIGN KEY (`cashier`) REFERENCES `tb_cashier` (`id_cashier`);

--
-- Constraints for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD CONSTRAINT `corelation code` FOREIGN KEY (`code`) REFERENCES `tb_category` (`code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
