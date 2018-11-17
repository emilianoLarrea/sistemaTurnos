<?php
require_once 'ControladorGeneral.php';


class ControladorCliente extends ControladorGeneral {

    function __construct($datos) {
        parent::__construct();
    }

    //Se agrega un alumno a la base de datos
    public function agregar($datos) {
        try {            
            $this->refControladorPersistencia->iniciarTransaccion();
            
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_CLIENTE, $datos);
            $this->refControladorPersistencia->confirmarTransaccion();
            
            //Se devuelve el alumno recien agregado
            return $datos;
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se busca un peluquero
        public function buscarPeluquero($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_PELUQUERO);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->confirmarTransaccion();
            return $array;

        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se busca al ultimo alumno agregado a la base de datos
    private function buscarUltimoAlumno() {
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOALUMNO, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se busca a todos los alumnos
    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_ALUMNOS);
            $arrayAlumnos = $resultado->fetchAll(PDO::FETCH_ASSOC);
            return $arrayAlumnos;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    //Se elimina a un alumno y a su domicilio
    public function eliminar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            $fkDomicilio = $this->buscarFkDomicilio($datos["id"]);
            
            //Se elimina al alumno
            $parametros = array("id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ELIMINAR_ALUMNO, $parametros);
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

    //Se modifican los datos de un alumno
    public function modificar($datos) {
        try {            
            $this->refControladorPersistencia->iniciarTransaccion();
            
            //Se modifica el alumno
            $parametros = array("nombre" => $datos['nombre'], "apellido" => $datos['apellido'], "legajo" => $datos['legajo'], "id" => $datos['id']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_ALUMNO, $parametros);

            //Se modifica su domicilio
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

    //Se busca el id del domicilio de un alumno
    private function buscarFkDomicilio($id) {
        try {
            $parametros = array("id" => $id);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ALUMNO, $parametros);
            $fila = $resultado->fetch();
            return $fila['fk_domicilio'];
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }

    public function buscar($datos) {
        
    }

}