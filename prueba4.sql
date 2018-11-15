-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 15-11-2018 a las 20:55:35
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
-- Estructura de tabla para la tabla `asignacionTurno`
--

CREATE TABLE `asignacionTurno` (
  `idAsignacionTurno` int(40) NOT NULL,
  `idTipoTurno` int(40) NOT NULL,
  `idTurno` int(40) NOT NULL,
  `idUsuario` int(40) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dia`
--

CREATE TABLE `dia` (
  `idDia` int(40) NOT NULL,
  `nombreDia` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `dia`
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
-- Estructura de tabla para la tabla `DiaTurno`
--

CREATE TABLE `DiaTurno` (
  `idDiaTurno` int(40) NOT NULL,
  `fecha` date NOT NULL,
  `idDia` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoTurno`
--

CREATE TABLE `estadoTurno` (
  `idEstadoTurno` int(40) NOT NULL,
  `nombreEstadoTurno` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `estadoTurno`
--

INSERT INTO `estadoTurno` (`idEstadoTurno`, `nombreEstadoTurno`) VALUES
(0, 'Disponible'),
(1, 'Reservado'),
(2, 'Anulado'),
(3, 'Terminado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listaTurnoPeluquero`
--

CREATE TABLE `listaTurnoPeluquero` (
  `idListaTurno` int(40) NOT NULL,
  `nombreLista` varchar(40) NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `idUsuario` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ParametroDias`
--

CREATE TABLE `ParametroDias` (
  `idParametroDias` int(40) NOT NULL,
  `fechaDesde` date NOT NULL,
  `fechaHasta` date NOT NULL,
  `cantidadDias` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametroTurno`
--

CREATE TABLE `parametroTurno` (
  `idParametroTurno` int(40) NOT NULL,
  `idDia` int(40) NOT NULL,
  `horaDesde` time NOT NULL,
  `horaHasta` time NOT NULL,
  `idListaTurno` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoTurno`
--

CREATE TABLE `tipoTurno` (
  `idTipoTurno` int(40) NOT NULL,
  `nombreTipoTurno` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Turno`
--

CREATE TABLE `Turno` (
  `idTurno` int(40) NOT NULL,
  `idEstadoTurno` int(40) NOT NULL,
  `idParametroTurno` int(40) NOT NULL,
  `idDiaTurno` int(40) NOT NULL,
  `idPeluquero` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  `tipoUsuario` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `pass`, `nombreUsuario`, `apellido`, `fechaNacimiento`, `sexo`, `dni`, `mail`, `tel`, `tipoUsuario`) VALUES
(1, '202cb962ac59075b964b07152d234b70', 'Walter', 'Prueba', '0000-00-00', 'Hombre', 39653153, 'admin', '2644804290', 'Peluquero'),
(3, 'NmEyMDRiZDg5ZjNjODM0OGFmZDVjNzdjNzE3YTA5N2E=', 'Emiliano', 'Larrea', '2018-10-24', 'masculino', 0, 'emiliano18796@gmail.com', '0264154804290', 'Cliente'),
(4, 'NmEyMDRiZDg5ZjNjODM0OGFmZDVjNzdjNzE3YTA5N2E=', 'Claudio', 'Larrea', '2018-10-02', 'masculino', 0, 'claudio', '02644804290', 'Cliente'),
(5, 'MWQ0YzcyYzRmZGUyZWM3NTE2OGI2NWIzMWUwNzhlMGI=', 'Claudio', 'Larrea', '2018-11-14', 'masculino', 0, 'claudio@gmail.com', '02644804290', 'Cliente'),
(6, 'MjAyY2I5NjJhYzU5MDc1Yjk2NGIwNzE1MmQyMzRiNzA=', 'Daniel', 'Di Lorenzo', '2018-11-13', 'masculino', 0, 'admin', '12345678', 'Peluquero');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asignacionTurno`
--
ALTER TABLE `asignacionTurno`
  ADD PRIMARY KEY (`idAsignacionTurno`),
  ADD KEY `idTipoTurno` (`idTipoTurno`),
  ADD KEY `idTurno` (`idTurno`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `dia`
--
ALTER TABLE `dia`
  ADD PRIMARY KEY (`idDia`);

--
-- Indices de la tabla `DiaTurno`
--
ALTER TABLE `DiaTurno`
  ADD PRIMARY KEY (`idDiaTurno`),
  ADD KEY `idDia` (`idDia`);

--
-- Indices de la tabla `estadoTurno`
--
ALTER TABLE `estadoTurno`
  ADD PRIMARY KEY (`idEstadoTurno`);

--
-- Indices de la tabla `listaTurnoPeluquero`
--
ALTER TABLE `listaTurnoPeluquero`
  ADD PRIMARY KEY (`idListaTurno`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `ParametroDias`
--
ALTER TABLE `ParametroDias`
  ADD PRIMARY KEY (`idParametroDias`);

--
-- Indices de la tabla `parametroTurno`
--
ALTER TABLE `parametroTurno`
  ADD PRIMARY KEY (`idParametroTurno`),
  ADD KEY `idDia` (`idDia`),
  ADD KEY `idListaTurno` (`idListaTurno`);

--
-- Indices de la tabla `tipoTurno`
--
ALTER TABLE `tipoTurno`
  ADD PRIMARY KEY (`idTipoTurno`);

--
-- Indices de la tabla `Turno`
--
ALTER TABLE `Turno`
  ADD PRIMARY KEY (`idTurno`),
  ADD KEY `idDiaTurno` (`idDiaTurno`),
  ADD KEY `idEstadoTurno` (`idEstadoTurno`),
  ADD KEY `idParametroTurno` (`idParametroTurno`),
  ADD KEY `idPeluquero` (`idPeluquero`);

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
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `asignacionTurno`
--
ALTER TABLE `asignacionTurno`
  ADD CONSTRAINT `asignacionturno_ibfk_1` FOREIGN KEY (`idTipoTurno`) REFERENCES `tipoTurno` (`idTipoTurno`),
  ADD CONSTRAINT `asignacionturno_ibfk_2` FOREIGN KEY (`idTurno`) REFERENCES `Turno` (`idTurno`),
  ADD CONSTRAINT `asignacionturno_ibfk_3` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `DiaTurno`
--
ALTER TABLE `DiaTurno`
  ADD CONSTRAINT `diaturno_ibfk_1` FOREIGN KEY (`idDia`) REFERENCES `dia` (`idDia`);

--
-- Filtros para la tabla `listaTurnoPeluquero`
--
ALTER TABLE `listaTurnoPeluquero`
  ADD CONSTRAINT `listaturnopeluquero_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `parametroTurno`
--
ALTER TABLE `parametroTurno`
  ADD CONSTRAINT `parametroturno_ibfk_1` FOREIGN KEY (`idDia`) REFERENCES `dia` (`idDia`),
  ADD CONSTRAINT `parametroturno_ibfk_2` FOREIGN KEY (`idListaTurno`) REFERENCES `listaTurnoPeluquero` (`idListaTurno`);

--
-- Filtros para la tabla `Turno`
--
ALTER TABLE `Turno`
  ADD CONSTRAINT `turno_ibfk_1` FOREIGN KEY (`idDiaTurno`) REFERENCES `DiaTurno` (`idDiaTurno`),
  ADD CONSTRAINT `turno_ibfk_2` FOREIGN KEY (`idEstadoTurno`) REFERENCES `estadoTurno` (`idEstadoTurno`),
  ADD CONSTRAINT `turno_ibfk_3` FOREIGN KEY (`idParametroTurno`) REFERENCES `parametroTurno` (`idParametroTurno`),
  ADD CONSTRAINT `turno_ibfk_4` FOREIGN KEY (`idPeluquero`) REFERENCES `usuario` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
