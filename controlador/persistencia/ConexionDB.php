<?php

class ConexionDB {

    private $_conexion = null;
    private $_usuario = 'root';
    private $_clave = '';
    
    //Se establece la conexion con la base de datos
    public function __construct() {        
        $this->_conexion = new PDO("mysql:dbname=prueba4;host=localhost", $this->_usuario, $this->_clave);
        $this->_conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    public function get_conexion() {
        return $this->_conexion;
    }
}
