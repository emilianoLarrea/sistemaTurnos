<?php
require_once 'ControladorGeneral.php';


class ControladorLoginProfesorCuiles extends ControladorGeneral{
    
    function __construct($datos) {
        parent::__construct();
    }

    //Se agrega un profesor a la base de datos
    public function agregar($datos) {
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
      

            //Se agrega el profesor
            $parametros = array("cuil" => $datos['cuil'], "apellido" => $datos['apellido'], "nombre" => $datos['nombre']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_PROFESOR_CUIL, $parametros);
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
           $parametros = array("cuil" => $datos['cuil']);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_PROFESOR_CUIL_lOGIN, $parametros);
            $registro = $resultado->fetch();
             if ($registro) {  
      
              echo 0; 
              
            } else {
                
// no encontro el cuil
                echo 1;
            }
    
          
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca al ultimo profesor agregado a la base de datos
    private function buscarUltimoProfesor(){
        try {
            $parametros = null;
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_ULTIMOPROFESOR_CUIL, $parametros);
            $fila = $resultado->fetch();
            return $fila;
        } catch (Exception $e) {
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca a todos los profesores
    public function listar($datos) {
        try {
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::LISTAR_PROFESORES_CUIL);
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
              $parametros = array("cuil" => $datos['cuil'], "apellido" => $datos['apellido'], "nombre" => $datos['nombre'], "id" => $datos['id']);
            //Se modifica el profesor

            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ACTUALIZAR_PROFESOR_CUIL, $parametros);

            
            $this->refControladorPersistencia->confirmarTransaccion();
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }
    
    //Se busca el id del domicilio de un profesor
    private function buscarCuil($id){//busco el fk del domicilio del profesor
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