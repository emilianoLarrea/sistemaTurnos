<?php
require_once '../persistencia/DbSentencias.php';
require_once '../persistencia/ControladorPersistencia.php';
require_once '../controladoresEspecificos/ControladorSesion.php';

if(session_start()==TRUE){
session_destroy();
}


