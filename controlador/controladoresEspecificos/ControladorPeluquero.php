<?php

require_once 'ControladorGeneral.php';
require_once 'ControladorSesion.php';

class ControladorPeluquero extends ControladorGeneral{
    
    function __construct($datos) {
        parent::__construct();
    }

    
    public function crearLista($datos) {
        try {
            date_default_timezone_set('America/Argentina/San_Juan');
            $hora = idate('H');
            $mes = idate('m');
            $dia = idate('d');
            $min = idate('i');
            $anio = idate('Y');
            $sesion = new ControladorSesion();
            $usuario = array("mail" => base64_decode(base64_decode($sesion->getUsuario())));
                        
            $this->refControladorPersistencia->iniciarTransaccion();
            $idUsuario = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_IDUSUARIO, $usuario);
            $id = $idUsuario->fetchAll(PDO::FETCH_ASSOC);
            
            $idMaxLista = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_IDLISTA);
            $idUltimaLista = $idMaxLista->fetchAll(PDO::FETCH_ASSOC);
            $idLista = 1 + $idUltimaLista[0]['MAX(`idListaTurno`)'];
            
            $datosEnviar = array("idListaTurno" => $idLista,"nombreLista" =>  $datos['nombreLista'], "fechaDesde" =>  "$anio-$mes-$dia", "idUsuario" => $id['0']['id']);
            $query = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::CREAR_LISTA, $datosEnviar);
            $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_IDLISTA);
            $array = $resultado->fetchAll(PDO::FETCH_ASSOC);
            $this->refControladorPersistencia->confirmarTransaccion();

            return $array;
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

}