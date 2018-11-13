<?php

require_once '../persistencia/ControladorPersistencia.php';
require_once '../persistencia/DbSentencias.php';
require ('PHPMailer/PHPMailerAutoload.php');
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of ControladorLogin
 *
 * @author alberto
 */
class ControladorLogin implements DbSentencias  {
    
    protected $refControladorPersistencia;
    
   
    
   function __construct($datos) {
     
     //  echo base64_decode (base64_decode($_POST ['us']));
       // echo base64_decode (base64_decode($datos['em']));
       //echo base64_decode (base64_decode($_POST ['co']));
       
        $this->refControladorPersistencia = ControladorPersistencia::obtenerCP();
        
        session_start();
    }
    //put your code here
    public function compruebaRegistra($datos) {

        try {
            $this->refControladorPersistencia->iniciarTransaccion();

             $parametrosBuscar = array(
                "usuario" => $datos['us'],
                "emai1" => $datos['em']
               
                    );
    // verifico si hay un usuario registrado         
             
             $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO_EMAIL, $parametrosBuscar);
            $registro = $resultado->fetch();
            
             if ($registro) {  
      
              echo 0; 
              
            } else {
                $keyreg = md5(time());
                
                // puede dar de alta transitoria
                $parametros = array(
                "usuario" => $datos['us'],
                "emai1" => $datos['em'],
                "password" => $datos['co'],
                   "keyreg" =>  $keyreg      
                    );
// 


            $resultado1 = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::INSERTAR_USUARIO, $parametros);
            $this->enviarCorreo($parametros);
// establecer la duracion d ela session , 1 dia
//             if ($_POST['sesion'] ) {                   
//                ini_set('session.cookie_lifetime', time()+(60*60*24));
//                 }      
//            
                // busco la ultima ide generada y s ela paso a la variable de session
                $parametrosUltimo = null;
                $resultado2 = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::ULTIMO_USUARIO, $parametrosUltimo);
                $registro = $resultado2->fetch();
  //busco el ultimo id cargado y se lo doy como session            
          //      $_SESSION['app_id'] = $registro['0'];

                

// devuelvo 1 porque es un usuario nuevo y correcto que debe verificar su mail
                echo 1;
            }
        
          
      $this->refControladorPersistencia->confirmarTransaccion();

//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
    }

    public function compruebaLogin($datos) {
        
        try {
            $this->refControladorPersistencia->iniciarTransaccion();

             $parametrosBuscar = array(
                "usuario" => $datos['us'],
                "clave" => $datos['cl']
                 
               
                    );
    // verifico si hay un usuario registrado         
             
             $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO, $parametrosBuscar);
            $registro = $resultado->fetch();
           
            
             if ($registro) {  
      
              echo 0; 
              
            } else {

                echo 1;
            }
        
          
      $this->refControladorPersistencia->confirmarTransaccion();

//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
        
        
    }

public function loginRecuperar($datos) {
        
        try {
            $this->refControladorPersistencia->iniciarTransaccion();

             $parametrosBuscar = array(
                "usuario" => $datos['us'],
                "clave" => $datos['cl']
                 
               
                    );
    // verifico si hay un usuario registrado         
             
             $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_USUARIO_PERDIDO, $parametrosBuscar);
            $registro = $resultado->fetch();
           
            
             if ($registro) {  
      
              echo 0; 
              
            } else {

                echo 1;
            }
        
          
      $this->refControladorPersistencia->confirmarTransaccion();

//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
        
        
    }

   public function enviarCorreo($parametros) {
        
        $mail = new PHPMailer();
       
      
// $usuario= base64_decode (base64_decode($parametros['usuario']));
// $correo=  base64_decode (base64_decode($parametros['emai1']));



$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Host = "smtp.gmail.com"; // Aquí pondremos el SMTP a utilizar.
$mail->Username ="tumail@gmail.com"; //  Email de la cuenta de correo. La cuenta de correo debe ser creada previamente. 
$mail->Password = "tupassde gmail"; // Aqui pondremos la contraseña de la cuenta de correo
$mail->SMTPSecure = "tls";
$mail->Port = 587; // Puerto de conexión al servidor de envio. 
$mail->setFrom("probandophpmailer18@gmail.com") ; // Desde donde enviamos. Puede ser el mismo que el email creado previamente.
$mail->FromName = base64_decode (base64_decode($parametros['usuario'])); // Nombre a mostrar del remitente. 
$mail->AddAddress(base64_decode (base64_decode($parametros['emai1']))); // Esta es la dirección a donde enviamos 
$mail->IsHTML(true); // El correo se envía como HTML 
$mail->Subject = "Completar Registro"; // Este es el titulo del email. 
$mail->SMTPOptions = array( 
'ssl' => array(
	'verify_peer' => false,
	'verify_peer_name' => false,
	'allow_self_signed' => true
));  
$body ="<h1>Se ha registrado exitosamente!! Para iniciar sesion pinche en el siguiente enlace: </h1>" .
        "<a href='http://localhost/Tema600Login/controlador/ruteador/RuteadorVerificar.php?accion=confirmarRegistro&Formulario=Login&K=".$parametros['keyreg']."'>Pinche Aca</a>"; 

$mail->Body = $body; // Mensaje a enviar.
 $exito = $mail->Send(); // Envía el correo.


    }

    public function confirmarRegistro($datos) {
        
        try {
            $this->refControladorPersistencia->iniciarTransaccion();

              //$formulario = $_GET['Formulario'];
        //$accion = $_GET['accion'];
        //$keyreg= $_GET['K'];
       
       // echo 'Estoy confirmar registro';
        
        $parametros1 = array(
                  
                   "keyreg" =>  $datos['K']   
                 );
       // $parametros1=$_GET['K'];
      //  echo $parametros1['keyreg'];
        
         $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_KEYREG,$parametros1);
            $registro = $resultado->fetch();
            
        if($registro){
            
            $parametros = array(
                    "estado" => 1,
                   "keyreg" =>  $datos['K']    
                    );
          // echo "ENTRE EN EL IF";
            
            $resultado2 = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::UPDATE_ESTADO,$parametros);
           header('Location: http://localhost/Tema600Login/index_1.html');
            
        }else {
           header('Location: http://localhost/Tema600Login/index_1.html');
        }
        
          
      $this->refControladorPersistencia->confirmarTransaccion();

//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
        
       
       
     
        
    }
    
    public function verificaCorreo($datos){
        
        //echo "Estoy en verificaCorreo";
        try {
            $this->refControladorPersistencia->iniciarTransaccion();

         
        
        $parametros1 = array(
                  
                   "email" =>  $datos['Co']   
                 );
        
      
        
         $resultado = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::BUSCAR_CORREO,$parametros1);
            $registro = $resultado->fetch();
            
        if($registro){
            $keyreg2 = md5(time());
            $parametros44 = array (
                
                "passwordTrucha" => $keyreg2.'kgkdle',
                "keyreg" => $keyreg2,
                "email" => $registro['email']
                
                
                
            );
            $resultado2 = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::UPDATE_KEYREG,$parametros44);
            
            
          // echo base64_decode (base64_decode($registro['email']));
            
            $mail = new PHPMailer();
       
      
// $usuario= base64_decode (base64_decode($parametros['usuario']));
// $correo=  base64_decode (base64_decode($parametros['emai1']));



$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->Host = "smtp.gmail.com"; // Aquí pondremos el SMTP a utilizar.
$mail->Username ="probandophpmailer18@gmail.com"; //  Email de la cuenta de correo. La cuenta de correo debe ser creada previamente. 
$mail->Password = "probando12345"; // Aqui pondremos la contraseña de la cuenta de correo
$mail->SMTPSecure = "tls";
$mail->Port = 587; // Puerto de conexión al servidor de envio. 
$mail->setFrom("probandophpmailer18@gmail.com") ; // Desde donde enviamos. Puede ser el mismo que el email creado previamente.
$mail->FromName = base64_decode (base64_decode($registro['usuario'])); // Nombre a mostrar del remitente. 
$mail->AddAddress(base64_decode (base64_decode($registro['email']))); // Esta es la dirección a donde enviamos 
$mail->IsHTML(true); // El correo se envía como HTML 
$mail->Subject = "Restablecer Contraseña"; // Este es el titulo del email. 
$mail->SMTPOptions = array( 
'ssl' => array(
	'verify_peer' => false,
	'verify_peer_name' => false,
	'allow_self_signed' => true
));  
$body ="<h2>Sus datos para ingresar son: </h2>" .
        "<h2>Usuario:".base64_decode (base64_decode($registro['usuario']))."</h2>".
        "<h2>Contraseña:".$parametros44['passwordTrucha']."</h2>".
        "<a href='http://localhost/Tema600Login/recuperar_index.html'>Pinche Aca para ingresar con los datos nuevos</a>"; 

$mail->Body = $body; // Mensaje a enviar.
$exito = $mail->Send(); // Envía el correo.
            
            
           echo 3;
            
        }else {
            echo 0;
        }
          
      $this->refControladorPersistencia->confirmarTransaccion();

//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
        
       
        
        
    }
    
    public function cambiarPASS ($datos){
        
        try {
            $this->refControladorPersistencia->iniciarTransaccion();
            
     
              if($datos['clP']==$datos['clS']){
        
        $parametros1 = array(
                  
                   "password" =>  $datos['clP'],
                    "passwordTrucha" =>$datos['clE']
                 );
    
        
         
        
            
            $resultado2 = $this->refControladorPersistencia->ejecutarSentencia(DbSentencias::UPDATE_PASS,$parametros1);
           
            echo 1;
            
            
              }else {echo 0;}
        
          
      $this->refControladorPersistencia->confirmarTransaccion();
              
//         
        } catch (Exception $e) {
            $this->refControladorPersistencia->rollBackTransaccion();
            echo "Failed: " . $e->getMessage();
        }
        
        
    }
    
    
}
