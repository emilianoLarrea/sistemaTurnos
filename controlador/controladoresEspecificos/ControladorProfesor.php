<?php
require_once 'ControladorGeneral.php';
require_once 'ControladorDomicilio.php';

class ControladorProfesor extends ControladorGeneral{
    
    function __construct($datos) {
        parent::__construct();
    }

    //Se agrega un profesor a la base de datos
    public function agregar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
            //Se agrega el domicilio
            $parametros = array("calle" => $datos['calle'], "numero" => $datos['numero']);
            $controlador = new ControladorDomicilio($parametros);
            $controlador->agregar($parametros);

            //Se agrega el profesor
            $parametros = array("nombre" => $datos['nombre'], "apellido" => $datos['apellido'], "titulo" => $datos['titulo']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_PROFESOR, $parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
            
            //Se devuelve el ultimo profesor agregado
            return $this->buscarUltimoProfesor();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se busca un profesor bajo un criterio en particular
    public function buscar($datos) {
        try {
            $parametros = array( "criterio" => $datos['criterio'],"valor" => $datos['buscar']);
            $query = str_replace("? = ?", $parametros['criterio']." = '".$parametros['valor']."'", DbSentencias::BUSCAR_PROFESORES);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia($query);
            $arrayProfesores = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayProfesores;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca al ultimo profesor agregado a la base de datos
    private function buscarUltimoProfesor(){
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOPROFESOR, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca a todos los profesores
    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_PROFESORES);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $array;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se elimina a un profesor y a su domicilio
    public function eliminar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
            //Se elimina al profesor
            $fkDomicilio = $this->buscarFkDomicilio($datos["id"]);
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_PROFESOR, $parametros);
            $idPersona = (int)$parametros['id'];
            
            //Se elimina el domicilio
            $parametros = array("id" => $fkDomicilio);
            $controlador = new ControladorDomicilio($parametros);
            $controlador->eliminar($parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
            return $idPersona;
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se modifican los datos de un profesor
    public function modificar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
            //Se modifica el profesor
            $parametros = array("nombre" => $datos['nombre'], "apellido" => $datos['apellido'], "titulo" => $datos['titulo'], "id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_PROFESOR, $parametros);

            //Se modifica el domicilio
            $id = $this->buscarFkDomicilio($datos['id']);
            $parametros = array("calle" => $datos['calle'], "numero" => $datos['numero'], "id" => $id);
            $controlador = new ControladorDomicilio($parametros);
            $controlador->modificar($parametros);
            $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca el id del domicilio de un profesor
    private function buscarFkDomicilio($id){//busco el fk del domicilio del profesor
        try {
            $parametros = array("id" => $id);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_PROFESOR, $parametros);
            $fila = $resultado->fetch();
            return $fila['fk_domicilio'];
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
}