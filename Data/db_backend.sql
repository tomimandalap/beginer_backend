-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 27, 2021 at 10:52 AM
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
  `id` int(11) NOT NULL COMMENT 'id cart',
  `date` date NOT NULL DEFAULT current_timestamp() COMMENT 'date cart',
  `invoices` int(10) NOT NULL,
  `cashier` varchar(50) NOT NULL,
  `item` text NOT NULL,
  `qty` int(10) NOT NULL,
  `price` int(10) NOT NULL,
  `subtotal` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `tb_cart`
--

INSERT INTO `tb_cart` (`id`, `date`, `invoices`, `cashier`, `item`, `qty`, `price`, `subtotal`) VALUES
(1, '2021-01-21', 101, 'Robby', 'Nasi Goreng Special', 3, 30000, 90000),
(2, '2021-01-21', 101, 'Robby', 'Nasi Ayam Geprek', 2, 24000, 48000),
(3, '2021-01-21', 101, 'Robby', 'Thai Tea', 5, 15000, 75000),
(4, '2021-01-21', 101, 'Robby', 'Black Forest', 1, 22000, 22000),
(5, '2021-01-21', 101, 'Robby', 'Cappucino', 1, 24000, 24000),
(6, '2021-01-21', 113, 'Yudhi', 'Sandwich', 2, 24000, 48000),
(7, '2021-01-21', 113, 'Yudhi', 'Tea Tarik', 1, 18000, 18000),
(8, '2021-01-21', 113, 'Yudhi', 'Susu Coklat', 1, 20000, 20000),
(9, '2021-01-21', 113, 'Yudhi', 'Nasi Goreng Jawa', 1, 28000, 28000),
(10, '2021-01-21', 113, 'Yudhi', 'Sweet Ice Tea', 1, 16000, 16000),
(11, '2021-01-21', 202, 'Pevita Pearce', 'Burger', 2, 25000, 50000),
(12, '2021-01-21', 202, 'Pevita Pearce', 'Black Forest', 1, 22000, 22000),
(13, '2021-01-21', 202, 'Pevita Pearce', 'Hot Tea', 1, 14000, 14000),
(14, '2021-01-21', 202, 'Pevita Pearce', 'Manuka Honey Tea', 2, 18000, 36000),
(15, '2021-01-21', 222, 'Cashier 2', 'Espresso', 1, 20000, 20000),
(16, '2021-01-21', 222, 'Cashier 2', 'Coffee Latte', 1, 25000, 25000),
(17, '2021-01-21', 222, 'Cashier 2', 'Cappucino', 1, 24000, 24000),
(18, '2021-01-21', 222, 'Cashier 2', 'Coffee Gayo', 1, 38000, 38000),
(19, '2021-01-21', 222, 'Cashier 2', 'Vietnam Drip Coffe', 1, 35000, 35000),
(20, '2021-01-21', 223, 'Cashier 2', 'Cappucino', 1, 24000, 24000),
(21, '2021-01-21', 223, 'Cashier 2', 'Coffee Latte', 1, 25000, 25000),
(22, '2021-01-21', 223, 'Cashier 2', 'Espresso', 2, 20000, 40000),
(23, '2021-01-21', 223, 'Cashier 2', 'Cake Red Velvet', 3, 24000, 72000),
(24, '2021-01-21', 223, 'Cashier 2', 'Thai Tea', 4, 15000, 60000),
(25, '2021-01-21', 223, 'Cashier 2', 'Nasi Ayam Geprek', 1, 24000, 24000),
(26, '2021-01-21', 223, 'Cashier 2', 'Nasi Goreng Special', 1, 30000, 30000),
(27, '2021-01-22', 252, 'Pevita Pearce', 'Nasi Goreng Special', 4, 30000, 120000),
(28, '2021-01-22', 252, 'Pevita Pearce', 'Nasi Ayam Geprek', 2, 24000, 48000),
(29, '2021-01-22', 252, 'Pevita Pearce', 'Thai Tea', 6, 15000, 90000),
(30, '2021-01-22', 255, 'Cashier 2', 'France Frice', 2, 18000, 36000),
(31, '2021-01-22', 255, 'Cashier 2', 'Nasi Ayam Geprek', 2, 24000, 48000),
(32, '2021-01-22', 255, 'Cashier 2', 'Thai Tea', 2, 15000, 30000),
(33, '2021-01-22', 255, 'Cashier 2', 'Coffee Latte', 1, 25000, 25000),
(34, '2021-01-22', 255, 'Cashier 2', 'Espresso', 1, 20000, 20000),
(35, '2021-01-22', 266, 'Cashier 1', 'Coffee Latte', 1, 25000, 25000),
(36, '2021-01-22', 266, 'Cashier 1', 'Cappucino', 1, 24000, 24000),
(37, '2021-01-22', 266, 'Cashier 1', 'Espresso', 1, 20000, 20000),
(38, '2021-01-22', 266, 'Cashier 1', 'Thai Tea', 5, 15000, 75000),
(39, '2021-01-22', 266, 'Cashier 1', 'Nasi Goreng Special', 2, 30000, 60000),
(40, '2021-01-22', 266, 'Cashier 1', 'Nasi Ayam Geprek', 2, 24000, 48000),
(41, '2021-01-22', 266, 'Cashier 1', 'France Frice', 4, 18000, 72000),
(42, '2021-01-22', 108, 'Pevita Pearce', 'Roti Bakar Coklat Keju', 1, 26000, 26000),
(43, '2021-01-22', 108, 'Pevita Pearce', 'Sweet Ice Tea', 1, 16000, 16000),
(44, '2021-01-22', 108, 'Pevita Pearce', 'Nasi Goreng Jawa', 1, 28000, 28000),
(45, '2021-01-22', 108, 'Pevita Pearce', 'Susu Coklat', 1, 20000, 20000),
(46, '2021-01-22', 888, 'Cashier 2', 'Nasi Ayam Geprek', 3, 24000, 72000),
(47, '2021-01-22', 888, 'Cashier 2', 'Thai Tea', 2, 15000, 30000),
(48, '2021-01-22', 888, 'Cashier 2', 'Sweet Ice Tea', 1, 16000, 16000),
(49, '2021-01-25', 805, 'Cashier 1', 'Coffee Latte', 4, 25000, 100000),
(50, '2021-01-25', 805, 'Cashier 1', 'Dalgona Coffee', 1, 22000, 22000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_category`
--

CREATE TABLE `tb_category` (
  `category` varchar(255) NOT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `tb_category`
--

INSERT INTO `tb_category` (`category`, `description`) VALUES
('Coffee', 'Minuman Coffe'),
('Dessert', 'Menu Dessert'),
('Fresh Milk', 'Minuman susu segar'),
('Jus', 'Aneka Minuman Buah'),
('Main Course', 'Menu Utama'),
('Tea', 'Minuman tea');

-- --------------------------------------------------------

--
-- Table structure for table `tb_history`
--

CREATE TABLE `tb_history` (
  `id` int(10) NOT NULL,
  `invoices` varchar(20) NOT NULL,
  `cashier` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `cart` varchar(255) NOT NULL,
  `amount` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `tb_history`
--

INSERT INTO `tb_history` (`id`, `invoices`, `cashier`, `date`, `cart`, `amount`) VALUES
(1, '#101', 'Robby', '2021-01-21 16:13:55', 'Nasi Goreng Special x3, Nasi Ayam Geprek x2, Thai Tea x5, Black Forest x1, Cappucino x1', 284900),
(2, '#113', 'Yudhi', '2021-01-21 17:40:41', 'Sandwich x2, Tea Tarik x1, Susu Coklat x1, Nasi Goreng Jawa x1, Sweet Ice Tea x1', 143000),
(3, '#202', 'Pevita Pearce', '2021-01-21 22:28:41', 'Burger x2, Black Forest x1, Hot Tea x1, Manuka Honey Tea x2', 134200),
(4, '#222', 'Cashier 2', '2021-01-21 22:43:58', 'Espresso x1, Coffee Latte x1, Cappucino x1, Coffee Gayo x1, Vietnam Drip Coffe x1', 156200),
(5, '#223', 'Cashier 2', '2021-01-21 22:47:11', 'Cappucino x1, Coffee Latte x1, Espresso x2, Cake Red Velvet x3, Thai Tea x4, Nasi Ayam Geprek x1, Nasi Goreng Special x1', 302500),
(6, '#252', 'Pevita Pearce', '2021-01-22 09:31:44', 'Nasi Goreng Special x4, Nasi Ayam Geprek x2, Thai Tea x6', 283800),
(7, '#255', 'Cashier 2', '2021-01-22 09:32:50', 'France Frice x2, Nasi Ayam Geprek x2, Thai Tea x2, Coffee Latte x1, Espresso x1', 174900),
(8, '#266', 'Cashier 1', '2021-01-22 09:41:47', 'Coffee Latte x1, Cappucino x1, Espresso x1, Thai Tea x5, Nasi Goreng Special x2, Nasi Ayam Geprek x2, France Frice x4', 356400),
(9, '#108', 'Pevita Pearce', '2021-01-22 11:39:41', 'Roti Bakar Coklat Keju x1, Sweet Ice Tea x1, Nasi Goreng Jawa x1, Susu Coklat x1', 99000),
(10, '#888', 'Cashier 2', '2021-01-22 13:34:06', 'Nasi Ayam Geprek x3, Thai Tea x2, Sweet Ice Tea x1', 129800),
(11, '#805', 'Cashier 1', '2021-01-25 23:17:16', 'Coffee Latte x4, Dalgona Coffee x1', 134200);

-- --------------------------------------------------------

--
-- Table structure for table `tb_product`
--

CREATE TABLE `tb_product` (
  `id` int(10) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `category` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` text NOT NULL,
  `price` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `tb_product`
--

INSERT INTO `tb_product` (`id`, `date`, `category`, `name`, `image`, `price`) VALUES
(1, '2021-01-16 09:39:09', 'Coffee', 'Espresso', 'https://media3.s-nbcnews.com/j/newscms/2019_33/2203981/171026-better-coffee-boost-se-329p_67dfb6820f7d3898b5486975903c2e51.fit-1240w.jpg', 20000),
(2, '2021-01-16 09:39:55', 'Coffee', 'Coffee Latte', 'data:image/jpeg;base64,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', 25000),
(3, '2021-01-16 09:40:29', 'Coffee', 'Cappucino', 'https://www.makanabis.com/bima-content/2019/10/19/l-istock-505168330-640x427773211c9b600af4c990d72a85f45ab7a20191019120747-bimacms.jpg', 24000),
(4, '2021-01-16 09:40:55', 'Tea', 'Thai Tea', 'https://cdn.idntimes.com/content-images/post/20200417/e8b3e56c650c420bb8e5dc49853efd8a-63fec37d298c3460406cee296f57097b_600x400.jpg', 15000),
(5, '2021-01-16 09:41:31', 'Dessert', 'Cake Red Velvet', 'https://cdn.idntimes.com/content-images/community/2019/06/red-velvet-cake-b1de5b75f68eb542ef7c6ab3aa34c5b0_600x400.jpg', 24000),
(6, '2021-01-16 09:42:06', 'Dessert', 'Black Forest', 'https://asset.kompas.com/crops/KAb3R0iow9ICldE6SDTvg3Fpw40=/0x0:924x616/750x500/data/photo/2020/07/16/5f0f80d4e5eea.jpg', 22000),
(7, '2021-01-16 09:42:51', 'Main Course', 'Nasi Goreng Special', 'https://kbu-cdn.com/dk/wp-content/uploads/nasi-goreng-seafood.jpg', 30000),
(8, '2021-01-16 09:43:19', 'Main Course', 'Nasi Ayam Geprek', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFrydoEQ4YTR4S9j9cKxH_mNL7-ZrD2MO0cg&usqp=CAU', 24000),
(9, '2021-01-16 09:43:41', 'Main Course', 'France Frice', 'https://d15hng3vemx011.cloudfront.net/attachment/06805696929527222408.medium', 18000),
(10, '2021-01-16 09:44:24', 'Tea', 'Hot Tea', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cozy-winter-morning-woman-hands-holding-teacup-royalty-free-image-1051683776-1553183889.jpg', 14000),
(11, '2021-01-16 09:44:38', 'Tea', 'Manuka Honey Tea', 'https://christyvega.com/wp-content/uploads/2018/01/CV_Manuka_Honey_Ginger_Tea_LS_323.jpg', 18000),
(12, '2021-01-16 09:45:03', 'Coffee', 'Dalgona Coffee', 'https://asset.kompas.com/crops/zyb6sqzrS-pWbE80kuatYjjmWds=/0x0:1000x667/750x500/data/photo/2020/03/28/5e7eb044aa9a2.jpg', 22000),
(13, '2021-01-16 09:45:30', 'Coffee', 'Coffe Creamer', 'data:image/jpeg;base64,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', 25000),
(14, '2021-01-16 09:46:00', 'Coffee', 'Vietnam Drip Coffe', 'https://ds393qgzrxwzn.cloudfront.net/resize/m600x500/cat1/img/images/0/bzY6hkQp7b.jpg', 35000),
(15, '2021-01-16 09:46:18', 'Coffee', 'Coffee Gayo', 'https://images.bisnis-cdn.com/posts/2017/07/17/672005/kopi.JPG', 38000),
(16, '2021-01-16 09:46:59', 'Main Course', 'Mie Goreng Korea', 'https://kbu-cdn.com/dk/wp-content/uploads/mie-goreng-korea.jpg', 26000),
(17, '2021-01-16 09:47:14', 'Main Course', 'Nasi Goreng Jawa', 'https://kbu-cdn.com/dk/wp-content/uploads/nasi-goreng-jawa.jpg', 28000),
(18, '2021-01-16 09:47:33', 'Tea', 'Sweet Ice Tea', 'https://www.aqiqahabangade.com/wp-content/uploads/2019/04/es-teh-manis.jpg', 16000),
(19, '2021-01-17 15:30:57', 'Main Course', 'Sandwich', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png', 24000),
(20, '2021-01-17 18:32:33', 'Main Course', 'Burger', 'https://www.goodnewsfromindonesia.id/uploads/post/large-pict-burger-terenak-di-indonesia-dee9940906f5a0058eb414a7e39c6520.jpg', 25000),
(21, '2021-01-18 08:17:24', 'Tea', 'Teh Tarik', 'https://asianinspirations.com.au/wp-content/uploads/2019/01/R00390_Pulled_Milk_Tea-619x412.jpg', 18000),
(22, '2021-01-20 10:37:06', 'Dessert', 'Roti Bakar Coklat Keju', 'https://s2.bukalapak.com/uploads/content_attachment/7bc16140a62ae17b54a9acb5/original/resep_roti_bakar_1.jpg', 26000),
(23, '2021-01-21 09:43:58', 'Fresh Milk', 'Susu Coklat', 'https://asset-a.grid.id/crop/97x14:1460x1015/x/photo/2018/03/02/4077992812.jpg', 20000),
(24, '2021-01-21 17:24:38', 'Dessert', 'Nuget Pisang', 'https://akcdn.detik.net.id/visual/2020/03/10/f02cdc13-b9dc-4faf-a4d5-2bf00b46f209_169.jpeg?w=700&q=90', 25000),
(25, '2021-01-27 14:44:37', 'Main Course', 'Sosis Bakar', '1611733477376.jpg', 25000);

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `access` int(11) NOT NULL
) ENGINE=InnoDB;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`id`, `name`, `email`, `pass`, `access`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$n8PuXJHpJjDTNjMbJpmVUOPvQ.arsTqk4R4uR/6tz7UBrRfSt/VSu', 0),
(2, 'cashier', 'cashier@gmail.com', '$2b$10$15cTwgWSybEHUe1/62W1hOKyxT9e9T/zcf5kclCZGHQR4i0DE.VNS', 1),
(3, 'tomi', 'example@gmail.com', '$2b$10$bA5LRbDoOX/6NpUjy3kC5.2NzxlPUgaHxouRyvCOWxmZjfeNk0gza', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_cart`
--
ALTER TABLE `tb_cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tb_category`
--
ALTER TABLE `tb_category`
  ADD PRIMARY KEY (`category`);

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
  ADD KEY `Raltion Category` (`category`);

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_cart`
--
ALTER TABLE `tb_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id cart', AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `tb_history`
--
ALTER TABLE `tb_history`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `tb_product`
--
ALTER TABLE `tb_product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tb_product`
--
ALTER TABLE `tb_product`
  ADD CONSTRAINT `Raltion Category` FOREIGN KEY (`category`) REFERENCES `tb_category` (`category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
