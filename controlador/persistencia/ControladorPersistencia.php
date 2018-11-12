<?php
require_once 'ConexionDB.php';

class ControladorPersistencia {

    private $_conexion;
    private static $instancia;

    private function __construct() {
        $db = new ConexionDB();
        $this->_conexion = $db->get_conexion();
    }

    //Se comprueba que en caso de que no haya una instancia de este controlador, se cree una
    public static function obtenerCP() {
        if (!self::$instancia instanceof self) {
            self::$instancia = new self;
        }
        return self::$instancia;
    }

    //Se inicia una transaccion con la base de datos
    public function iniciarTransaccion() {
        $this->_conexion->beginTransaction();
    }

    //Se confirma una transaccion con la base de datos
    public function confirmarTransaccion() {
        $this->_conexion->commit();
    }

    //En caso de que ocurra un error, se vuelve atras la trasaccion
    public function rollBackTransaccion() {
        $this->_conexion->rollBack();
    }

    //Se ejecuta una consulta con la base de datos
    public function ejecutarSentencia($query, $parametros = null) {
        //Se prepara la consulta
        $statement = $this->_conexion->prepare($query);
        //Si existe algun parametro, se lo vincula con la consulta
        if ($parametros) {
            $index = 1;
            foreach ($parametros as $key => $parametro) {
                $statement->bindValue($index, $parametro);
                $index++;
            }
        }
        //Se ejecuta la consulta
        $statement->execute();
        return $statement;
    }

    //Se devuelve el id del ultimo registro insertado
    public function getUltimoId() {
        return $this->_conexion->lastInsertId();
    }

}
