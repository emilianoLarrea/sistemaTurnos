<?php


        $formulario = $_GET['Formulario'];
        $accion = $_GET['accion'];
        
      
//
 //echo $datosid;
 
        $controlador = 'Controlador' . $formulario;

        //Se carga el controlador especifico
        require_once '../controladoresEspecificos/' . $controlador . '.php';
 

        //Se guardan los datos enviados en una variable y se crea un controlador especifico
        $datosFormulario = $_GET;
       
     
        
        $refControlador = new $controlador($datosFormulario);
         
        //Se realiza la accion en el controlador especifico
        $resultado = $refControlador->$accion($datosFormulario);

        //Se envian los datos a la vista
    //    echo json_encode($resultado);
        
     

