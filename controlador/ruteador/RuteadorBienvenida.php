<?php
require_once '../controladoresEspecificos/ControladorSesion.php';

$sesion = new ControladorSesion();

if(isset($_GET['getTiempo'])){
    if($sesion->verificar($_GET['tipo'])){
        $tiempoInicio = $sesion->getTiempo();
        $ahora = time();
        if ($ahora - $tiempoInicio >= 1800){
            echo json_encode(true);
        }else{
            echo json_encode(false);
        }
    }else {
        echo json_encode(false);
    }
}else if ($sesion->verificar($_GET['tipo'])){
    $usuario = base64_decode(base64_decode($sesion->getUsuario()));
    echo json_encode($usuario);
}else{
    echo json_encode(false);
}