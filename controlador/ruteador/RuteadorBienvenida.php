<?php
require_once '../controladoresEspecificos/ControladorSesion.php';

$sesion = new ControladorSesion();

if ($sesion->verificar($_GET['tipo'])){
    $usuario = base64_decode(base64_decode($sesion->getUsuario()));
    echo json_encode($usuario);
}else{
    echo json_encode(false);
}