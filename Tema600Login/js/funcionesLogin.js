
$(function () {
    var TallerAvanzada = {};
    (function (app) {

        app.init = function () {

            app.bindings();
           
        };

        app.bindings = function () {

            // oyente del botòn guardar
            
            
            $("#registrar").on("click", function (event) {
                event.preventDefault();
                // si la bandera es cero vino de Alta

                app.registrarPersona();

            });
            $("#enviar").on("click", function (event){
                event.preventDefault();
                app.ingresarPersona();
            });
            
            $("#enviarRec").on("click",function (event){
                event.preventDefault();
                app.recuperarPass();
                 $('#myModal2').modal('show');
                
            });
            $("#ingresar").on("click",function (event){
                event.preventDefault();
                app.ingresar();
            });
            $("#cambiarPASS").on("click",function (event){
                event.preventDefault();
                app.cambiarPASS();
                $('#myModal').modal('show');
            });

        };
        
        app.cambiarPASS = function (){
            
             var url = "controlador/ruteador/RuteadorRecuperar.php?accion=cambiarPASS&Formulario=Login";
            var datosEnviar=
                     
                    'clP='+btoa($.md5($("#passwordNew").val())) +
                    '&clS='+btoa($.md5($('#passwordNew2').val())) +
                    '&clE='+ document.getElementById("passwordING").value;
            console.log(datosEnviar);
            $.ajax({
                url:url,
                method: 'POST',
                type:'json',
                data: datosEnviar,
                success: function (datosRecibidos){
                    var valor = parseInt(datosRecibidos);
                    if (valor === 1) {

                        $('#myModal').modal('hide');
                        alert ("Contraseña Restablecida");
                        
                         

                    }
                    //La clave no era correcta
                    if (valor === 0) {
                        
                        alert("Claves erroneas");
                    }
 

                },
                error: function (datosRecibidos) {
                    var valor = parseInt(datosRecibidos);
                    alert("viene con el error");
                    alert(datosRecibidos);
                }
            });
            
        };
        
        app.ingresar = function (){
        
        
        var url = "controlador/ruteador/RuteadorProfesor_1.php?accion=loginRecuperar&Formulario=Login";
            var datosEnviar=
                    'us=' + btoa(btoa($('#usuario').val())) +
                    '&cl=' + document.getElementById("passwordING").value;
            console.log(datosEnviar);
            $.ajax({
                url:url,
                method: 'POST',
                type:'json',
                data: datosEnviar,
                success: function (datosRecibidos){
                    var valor = parseInt(datosRecibidos);
                    if (valor === 1) {

                        $('#myModal').modal('show');
                        
                         

                    }
                    //La clave no era correcta
                    if (valor === 0) {
                        
                        alert("El usuario no existe sfdlgsdfgklñsfgdñsdfñsgfñdsfñdgdfñg");
                    }
 

                },
                error: function (datosRecibidos) {
                    var valor = parseInt(datosRecibidos);
                    alert("viene con el error");
                    alert(datosRecibidos);
                }
            });
        
        };
        
        app.recuperarPass = function (){
            
            var url =  "controlador/ruteador/RuteadorRecuperar.php?accion=verificaCorreo&Formulario=Login";
            var datosEnviar =
                    'Co=' + btoa(btoa($('#correoRecuperar').val()));
            console.log(datosEnviar);
            $.ajax({
                url:url,
                method: 'POST',
                type: 'json',
                data: datosEnviar,
                success: function (datosRecibidos){
                    var valor= parseInt(datosRecibidos);
                    
                    
                    
                    if(valor===3){
                        var mensajeHtml = "";
                        
                        $('#alertaTexto2').html(mensajeHtml);
                        
                        mensajeHtml = '<h4 id=' + 'alertaTexto' + ' style=' + 'color:green;><span class=' + 'glyphicon glyphicon-alert' + '>' + '</span>Correo fue enviado existosamente!</h4>';


                        $('#alertaTexto2').html(mensajeHtml);
                        

                        

                        


                    }else {
                        mensajeHtml = '<h4 id=' + 'alertaTexto' + ' style=' + 'color:red;><span class=' + 'glyphicon glyphicon-alert' + '>' + '</span> Error, el correo ingresado no existe o ya solicito cambio de contraseña.</h4>';


                        $('#alertaTexto2').html(mensajeHtml);
                    }
                    //La clave no era correcta
                   
                        
                    
                    
                },
                error: function (datosRecibidos){
                    
                    alert("viene con el error");
                    alert(datosRecibidos);
                }
            });
        };
        
        app.ingresarPersona = function (){
            var url = "controlador/ruteador/RuteadorProfesor_1.php?accion=compruebaLogin&Formulario=Login";
            var datosEnviar=
                    'us=' + btoa(btoa($('#usuarioValidar').val())) +
                    '&cl=' + btoa($.md5($('#claveValidar').val()));
            console.log(datosEnviar);
            $.ajax({
                url:url,
                method: 'POST',
                type:'json',
                data: datosEnviar,
                success: function (datosRecibidos){
                    var valor = parseInt(datosRecibidos);
                    alert(valor);
                    if (valor === 0) {
                        
                         alert("Ingresaste");

                    }
                    //La clave no era correcta
                    if (valor === 1) {
                        
                        alert("El usuario no existe mgv");
                    }
 

                },
                error: function (datosRecibidos) {
                    var valor = parseInt(datosRecibidos);
                    alert("viene con el error");
                    alert(datosRecibidos);
                }
            });
        };

        app.registrarPersona = function () {  //funcion para verificar usuario

            var url = "controlador/ruteador/RuteadorProfesor_1.php?accion=compruebaRegistra&Formulario=Login";
        

            // variable que toma todos los datos del formulario
           
            
            //var datosEnviar='u=' + btoa(btoa($('#usuario').val())) + 
              //      '&e=' +btoa(btoa($('#email').val())) +
               //     '&c=' + btoa(btoa($('#password').val())) + 
                //    '&cc=' + btoa($.md5($('#passwordc').val()));
           // console.log(datosEnviar);
            
             var datosEnviar=
                    'us=' +  btoa(btoa($('#usuario').val())) + 
                    '&em=' + btoa(btoa($('#email').val()))   +
                    '&co=' + btoa($.md5($('#passwordReg').val())) +
                    '&co2=' + btoa($.md5($('#passwordcReg').val()));
                    
            
            console.log(datosEnviar);

             $.ajax({
          url:url,
          method: 'POST',
          type: 'json',
          data: datosEnviar,
          success: function (datosRecibidos){
                    var valor = parseInt(datosRecibidos);
                    if (valor === 0) {
                        var mensajeHtml = "";

                        $('#alertaTexto').html(mensajeHtml);

                        mensajeHtml = '<h4 id=' + 'alertaTexto' + ' style=' + 'color:red;><span class=' + 'glyphicon glyphicon-alert' + '>' + '</span> Error, en nombre de Usuario o email ya existen en nuestra base de datos, cámbialos por favor, vuelve a intentar</h4>';


                        $('#alertaTexto').html(mensajeHtml);


                    }
                    //La clave no era correcta
                    if (valor === 1) {
                        mensajeHtml = '<h4 id=' + 'alertaTexto' + ' style=' + 'color:green;><span class=' + 'glyphicon glyphicon-alert' + '>' + '</span> Registración existosa, acabas de recibir un mail del administrador, actívala desde tu correo como último paso, logueate como usuario</h4>';


                        $('#alertaTexto').html(mensajeHtml);
                    }
                    
        // limpiar campos del MOdal            
            $("#usuario").val('');
            $("#emai1").val('');
            $("#password").val('');
            $("#passwordc").val('');
          
                    


                },
                error: function (datosRecibidos) {
                    var valor = parseInt(datosRecibidos);
                    alert("viene con el error");
                    alert(datosRecibidos);
                }
            });
        };






        app.init();
    })(TallerAvanzada);
});

