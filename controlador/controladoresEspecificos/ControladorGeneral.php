<?php
require_once '../persistencia/ControladorPersistencia.php';
require_once '../persistencia/DbSentencias.php';

abstract class ControladorGeneral implements DbSentencias {

    protected $refControladorPersistencia;
    
    function __construct() {
        $this->refControladorPersistencia = ControladorPersistencia::obtenerCP();
    }

    
}
