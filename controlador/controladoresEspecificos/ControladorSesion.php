<?php
require_once '../persistencia/DbSentencias.php';
require_once '../persistencia/ControladorPersistencia.php';

class ControladorSesion implements DbSentencias {

    private $usuario;
    private $refControladorPersistencia;

    public function __construct() {
        session_start();
        $this->usuario = 'usuario';
        $this->refControladorPersistencia = ControladorPersistencia::obtenerCP();
    }

    //Se inicia una sesion de usuario
    public function iniciar($datos) {
        
        //Se verifica que el usuario exista
        $parametros = array("mail" =>  base64_decode(base64_decode($datos['u']))/*, "pass" => base64_decode($datos['c'])*/);
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO, $parametros);
        $registro = $resultado->fetch();
        
        //Si existe
        if ($registro) {
            $_SESSION[$this->usuario]=$datos['u'];
             if ($registro['tipoUsuario'] == "cliente"){
                    echo 0;}else if ($registro['tipoUsuario'] == "secretario"){
                        echo 3;}else if ($registro['tipoUsuario'] == "peluquero"){
                        echo 4;}
                
            } else {
                //La contraseña es incorrecta
                echo 1;
            }
        }
    

    //Se cierra la sesion y se redirecciona a la pagina inicial
    public function cerrar() {
        if($_SESSION[$this->usuario]){
           session_destroy();
        }
        
    }

    //Se verifica que haya una sesion abierta
    public function verificar() {
        if (!isset($_SESSION[$this->usuario])) {
            return false;
        }else{
            return true;
        }
    }
    
    public function getUsuario() {
        return $this->usuario;
    }

    public function getRefControladorPersistencia() {
        return $this->refControladorPersistencia;
    }

}
