-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 17-11-2018 a las 15:56:46
-- Versión del servidor: 5.6.38
-- Versión de PHP: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `prueba4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(40) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `nombreUsuario` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `fechaNacimiento` date NOT NULL,
  `sexo` varchar(40) NOT NULL,
  `dni` int(40) NOT NULL,
  `mail` varchar(40) NOT NULL,
  `tel` varchar(40) NOT NULL,
  `tipoUsuario` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `pass`, `nombreUsuario`, `apellido`, `fechaNacimiento`, `sexo`, `dni`, `mail`, `tel`, `tipoUsuario`) VALUES
(7, 'MWQ0YzcyYzRmZGUyZWM3NTE2OGI2NWIzMWUwNzhlMGI=', 'Emiliano', 'Larrea', '1996-07-18', 'masculino', 0, 'emiliano18796@gmail.com', '0264154804290', 'Cliente'),
(8, 'MjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzA=', 'Daniel', 'DiLorenzo', '2018-11-16', 'masculino', 0, 'danielDilorenzo@gmail.com', '264155123456', 'Peluquero');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
