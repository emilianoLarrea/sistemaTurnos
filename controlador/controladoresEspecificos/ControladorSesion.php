<?php
require_once '../persistencia/DbSentencias.php';
require_once '../persistencia/ControladorPersistencia.php';

class ControladorSesion implements DbSentencias {

    private $usuario;
    private $tipo;
    private $refControladorPersistencia;

    public function __construct() {
        session_start();
        $this->usuario = 'usuario';
        $this->tipo = 'tipo';
        $this->refControladorPersistencia = ControladorPersistencia::obtenerCP();
    }

    //Se inicia una sesion de usuario
    public function iniciar($datos) {
        
        //Se verifica que el usuario exista
        $parametros = array("mail" =>  base64_decode(base64_decode($datos['u'])), "pass" =>  $datos['c'] );
        $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO, $parametros);
        $registro = $resultado->fetch();
        
        //Si existe
        if ($registro) {
            $_SESSION[$this->usuario]=$datos['u'];
            $_SESSION[$this->tipo] = $registro['tipoUsuario'];
             if ($registro['tipoUsuario'] == "Peluquero"){
                    
                    echo 4;}
                else if ($registro['tipoUsuario'] == "Secretario"){
                        echo 3;}
                    else if ($registro['tipoUsuario'] == "Cliente"){
                        echo 0;}
                
            } 
        else {
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
    public function verificar($t) {
        if (!isset($_SESSION[$this->usuario])) {
            return false;
        }else if (($_SESSION[$this->tipo]==$t)){
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
