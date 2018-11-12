<?php
require_once '../persistencia/DbSentencias.php';
require_once '../persistencia/ControladorPersistencia.php';
require_once '../controladoresEspecificos/ControladorSesion.php';

//Se guardan los datos recibidos en una variable
$datos = $_REQUEST;
$sesion = new ControladorSesion();

//Se inicia una nueva sesion
$sesion->iniciar($datos);

