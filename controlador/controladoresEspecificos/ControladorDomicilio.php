<?php
require_once 'ControladorGeneral.php';

class ControladorDomicilio extends ControladorGeneral {
    
    function __construct($datos) {
        parent::__construct();
    }

    //Se agrega un domicilio a la base de datos
    public function agregar($datos) {      
        $parametros = array("calle" => $datos['calle'],"numero" => $datos['numero']);
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_DOMICILIO,$parametros);
    }

    //Se modifican los datos de un domicilio
    public function modificar($datos) { //funcion para modificar un domicilio
        $parametros = array("calle" => $datos['calle'],"numero" => $datos['numero'],"id" => $datos['id']);
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_DOMICILIO,$parametros);
    }
    
    //Se elimina un domicilio de la base de datos
    public function eliminar($datos) {  //funcion para eliminar un domicilio
        $parametros = array("id" => $datos['id']);
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_DOMICILIO,$parametros);
    }

    public function buscar($datos) { }   
    public function listar($datos) { }
}
