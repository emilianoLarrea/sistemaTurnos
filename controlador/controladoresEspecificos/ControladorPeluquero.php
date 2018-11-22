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

            return $array[0]['MAX(`idListaTurno`)'];
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    public function guardarConfiguracionTurno($datos){
        try {
            $sesion = new ControladorSesion();
            $usuario = array("mail" => base64_decode(base64_decode($sesion->getUsuario())));           
            $this->refControladorPersistencia->iniciarTransaccion();
            $idMaxParamTurno = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_IDPARAMETRO_TURNO);
            $idUltimoParamTur = $idMaxParamTurno->fetchAll(PDO::FETCH_ASSOC);
            $idParametroTurno = 1 + $idUltimoParamTur[0]['MAX(`idParametroTurno`)'];            
            $horaDesde = $datos['horaDesde'];
            $minutoDesde = $datos['minutoDesde'];
            $horaHasta = $datos['horaHasta'];
            $minutoHasta = $datos['minutoHasta'];
            $datosEnviar1 = array("horaDesde" =>  "$horaDesde:$minutoDesde:00", "horaHasta" =>  "$horaHasta:$minutoHasta:00", "horaDesde1" =>  "$horaDesde:$minutoDesde:00", "horaHasta1" =>  "$horaHasta:$minutoHasta:00", "horaDesde2" =>  "$horaDesde:$minutoDesde:00", "horaHasta2" =>  "$horaHasta:$minutoHasta:00", "horaDesde3" =>  "$horaDesde:$minutoDesde:00", "horaHasta3" =>  "$horaHasta:$minutoHasta:00", "idDia" => $datos['idDia'], "idListaTurno" => $datos['idListaTurno']);
            $turnosExistentesEnEseHorario = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::TURNOS_EXISTENTES_EN_ESE_HORARIO, $datosEnviar1);
            $turnos = $turnosExistentesEnEseHorario->fetchAll(PDO::FETCH_ASSOC);
            $cantidad = $turnosExistentesEnEseHorario->rowCount();
            if($cantidad== 00){
                $datosEnviar2 = array("idParametroTurno" => $idParametroTurno,"horaDesde" =>  "$horaDesde:$minutoDesde:00", "horaHasta" =>  "$horaHasta:$minutoHasta:00", "idListaTurno" => $datos['idListaTurno'], "idDia" => $datos['idDia']);
                $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::CREAR_PARAMETROTURNO, $datosEnviar2);
                switch ($datos['idDia']) {
                    case "0":
                        $mje="Configuración creada exitosamente para día Lunes";
                        break;
                    case "1":
                        $mje="Configuración creada exitosamente para día Martes";
                        break;
                    case "2":
                        $mje="Configuración creada exitosamente para día Miércoles";
                        break;
                    case "3":
                        $mje="Configuración creada exitosamente para día Jueves";
                        break;
                    case "4":
                        $mje="Configuración creada exitosamente para día Viernes";
                        break;
                    case "5":
                        $mje="Configuración creada exitosamente para día Sábado";
                        break;
                    case "6":
                        $mje="Configuración creada exitosamente para día Domingo";
                        break;
                }
            }else{
                switch ($datos['idDia']) {
                    case "0":
                        $mje="Configuración coincide con otra del día Lunes";
                        break;
                    case "1":
                        $mje="Configuración coincide con otra del día Martes";
                        break;
                    case "2":
                        $mje="Configuración coincide con otra del día Miércoles";
                        break;
                    case "3":
                        $mje="Configuración coincide con otra del día Jueves";
                        break;
                    case "4":
                        $mje="Configuración coincide con otra del día Viernes";
                        break;
                    case "5":
                        $mje="Configuración coincide con otra del día Sábado";
                        break;
                    case "6":
                        $mje="Configuración coincide con otra del día Domingo";
                        break;
                }                
            }        
            $this->refControladorPersistencia->confirmarTransaccion();            
            return $mje;
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }



}