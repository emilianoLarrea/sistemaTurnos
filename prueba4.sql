-- phpMyAdmin SQL Dump
-- version 4.8.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 19, 2018 at 09:21 PM
-- Server version: 10.1.34-MariaDB
-- PHP Version: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prueba4`
--

-- --------------------------------------------------------

--
-- Table structure for table `asignacionturno`
--

CREATE TABLE `asignacionturno` (
  `idAsignacionTurno` int(40) NOT NULL,
  `idTipoTurno` int(40) NOT NULL,
  `idTurno` int(40) NOT NULL,
  `idUsuario` int(40) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `dia`
--

CREATE TABLE `dia` (
  `idDia` int(40) NOT NULL,
  `nombreDia` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `dia`
--

INSERT INTO `dia` (`idDia`, `nombreDia`) VALUES
(0, 'Lunes'),
(1, 'Martes'),
(2, 'Miercoles'),
(3, 'Jueves'),
(4, 'Viernes'),
(5, 'Sabado'),
(6, 'Domingo');

-- --------------------------------------------------------

--
-- Table structure for table `diaturno`
--

CREATE TABLE `diaturno` (
  `idDiaTurno` int(40) NOT NULL,
  `fecha` date NOT NULL,
  `idDia` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `estadoturno`
--

CREATE TABLE `estadoturno` (
  `idEstadoTurno` int(40) NOT NULL,
  `nombreEstadoTurno` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `estadoturno`
--

INSERT INTO `estadoturno` (`idEstadoTurno`, `nombreEstadoTurno`) VALUES
(0, 'Disponible'),
(1, 'Reservado'),
(2, 'Anulado'),
(3, 'Terminado');

-- --------------------------------------------------------

--
-- Table structure for table `listaturnopeluquero`
--

CREATE TABLE `listaturnopeluquero` (
  `idListaTurno` int(40) NOT NULL,
  `nombreLista` varchar(40) NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `idUsuario` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parametrodias`
--

CREATE TABLE `parametrodias` (
  `idParametroDias` int(40) NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `cantidadDias` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `parametroturno`
--

CREATE TABLE `parametroturno` (
  `idParametroTurno` int(40) NOT NULL,
  `idDia` int(40) NOT NULL,
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `idListaTurno` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `tipoturno`
--

CREATE TABLE `tipoturno` (
  `idTipoTurno` int(40) NOT NULL,
  `nombreTipoTurno` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `turno`
--

CREATE TABLE `turno` (
  `idTurno` int(40) NOT NULL,
  `idEstadoTurno` int(40) NOT NULL,
  `idParametroTurno` int(40) NOT NULL,
  `idDiaTurno` int(40) NOT NULL,
  `idPeluquero` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
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
  `tipoUsuario` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id`, `pass`, `nombreUsuario`, `apellido`, `fechaNacimiento`, `sexo`, `dni`, `mail`, `tel`, `tipoUsuario`) VALUES
(1, '202cb962ac59075b964b07152d234b70', 'Walter', 'Prueba', '0000-00-00', 'Hombre', 39653153, 'admin', '2644804290', 'Peluquero'),
(3, 'NmEyMDRiZDg5ZjNjODM0OGFmZDVjNzdjNzE3YTA5N2E=', 'Emiliano', 'Larrea', '2018-10-24', 'masculino', 0, 'emiliano18796@gmail.com', '0264154804290', 'Cliente'),
(4, 'NmEyMDRiZDg5ZjNjODM0OGFmZDVjNzdjNzE3YTA5N2E=', 'Claudio', 'Larrea', '2018-10-02', 'masculino', 0, 'claudio', '02644804290', 'Cliente'),
(5, 'MWQ0YzcyYzRmZGUyZWM3NTE2OGI2NWIzMWUwNzhlMGI=', 'Claudio', 'Larrea', '2018-11-14', 'masculino', 0, 'claudio@gmail.com', '02644804290', 'Cliente'),
(6, 'MjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzA=', 'Daniel', 'Di Lorenzo', '2018-11-13', 'masculino', 0, 'admin', '12345678', 'Peluquero'),
(7, 'MjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzA=', 'Nicolas', 'Baudon', '2018-12-08', 'masculino', 0, 'nico', '132456789', 'Cliente');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `asignacionturno`
--
ALTER TABLE `asignacionturno`
  ADD PRIMARY KEY (`idAsignacionTurno`),
  ADD KEY `idTipoTurno` (`idTipoTurno`),
  ADD KEY `idTurno` (`idTurno`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `dia`
--
ALTER TABLE `dia`
  ADD PRIMARY KEY (`idDia`);

--
-- Indexes for table `diaturno`
--
ALTER TABLE `diaturno`
  ADD PRIMARY KEY (`idDiaTurno`),
  ADD KEY `idDia` (`idDia`);

--
-- Indexes for table `estadoturno`
--
ALTER TABLE `estadoturno`
  ADD PRIMARY KEY (`idEstadoTurno`);

--
-- Indexes for table `listaturnopeluquero`
--
ALTER TABLE `listaturnopeluquero`
  ADD PRIMARY KEY (`idListaTurno`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indexes for table `parametrodias`
--
ALTER TABLE `parametrodias`
  ADD PRIMARY KEY (`idParametroDias`);

--
-- Indexes for table `parametroturno`
--
ALTER TABLE `parametroturno`
  ADD PRIMARY KEY (`idParametroTurno`),
  ADD KEY `idDia` (`idDia`),
  ADD KEY `idListaTurno` (`idListaTurno`);

--
-- Indexes for table `tipoturno`
--
ALTER TABLE `tipoturno`
  ADD PRIMARY KEY (`idTipoTurno`);

--
-- Indexes for table `turno`
--
ALTER TABLE `turno`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `idDiaTurno` (`idDiaTurno`),
  ADD KEY `idEstadoTurno` (`idEstadoTurno`),
  ADD KEY `idParametroTurno` (`idParametroTurno`),
  ADD KEY `idPeluquero` (`idPeluquero`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `asignacionturno`
--
ALTER TABLE `asignacionturno`
  ADD CONSTRAINT `asignacionturno_ibfk_1` FOREIGN KEY (`idTipoTurno`) REFERENCES `tipoturno` (`idTipoTurno`),
  ADD CONSTRAINT `asignacionturno_ibfk_2` FOREIGN KEY (`idTurno`) REFERENCES `turno` (`idTurno`),
  ADD CONSTRAINT `asignacionturno_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `diaturno`
--
ALTER TABLE `diaturno`
  ADD CONSTRAINT `diaturno_ibfk_1` FOREIGN KEY (`idDia`) REFERENCES `dia` (`idDia`);

--
-- Constraints for table `listaturnopeluquero`
--
ALTER TABLE `listaturnopeluquero`
  ADD CONSTRAINT `listaturnopeluquero_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Constraints for table `parametroturno`
--
ALTER TABLE `parametroturno`
  ADD CONSTRAINT `parametroturno_ibfk_1` FOREIGN KEY (`idDia`) REFERENCES `dia` (`idDia`),
  ADD CONSTRAINT `parametroturno_ibfk_2` FOREIGN KEY (`idListaTurno`) REFERENCES `listaturnopeluquero` (`idListaTurno`);

--
-- Constraints for table `turno`
--
ALTER TABLE `turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`idDiaTurno`) REFERENCES `diaturno` (`idDiaTurno`),
  ADD CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`idEstadoTurno`) REFERENCES `estadoturno` (`idEstadoTurno`),
  ADD CONSTRAINT `turno_ibfk_3` FOREIGN KEY (`idParametroTurno`) REFERENCES `parametroturno` (`idParametroTurno`),
  ADD CONSTRAINT `turno_ibfk_4` FOREIGN KEY (`idPeluquero`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
