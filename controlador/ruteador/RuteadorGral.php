<?php
require_once '../controladoresEspecificos/ControladorSesion.php';

$sesion = new ControladorSesion();
if ($sesion->verificar($_GET['tipo'])) {
    
    //Si se envio un formulario
    if (isset($_GET['Formulario'])) {
        $datosFormulario = $_POST; 
        $formulario = $_GET['Formulario'];
        $accion = $_GET['accion'];
        $controlador = 'Controlador' . $formulario;
        
        //Se carga el controlador especifico
        require_once '../controladoresEspecificos/' . $controlador . '.php'; 
        
        //Se guardan los datos enviados en una variable y se crea un controlador especifico
              
        $refControlador = new $controlador($datosFormulario);    
        
        //Se realiza la accion en el controlador especifico
        $resultado = $refControlador->$accion($datosFormulario);    
        
        //Se envian los datos a la vista
        echo json_encode($resultado); 
    } else {
        echo json_encode(true);
    }
} else {
    echo json_encode(false);
}