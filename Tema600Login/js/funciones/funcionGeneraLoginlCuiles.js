function compartirFunciones(app) {
    
   app.registrarPersona = function () {  //funcion para verificar usuario

            var url = "controlador/ruteador/RuteadorProfesor_1.php?accion=agregar&Formulario=Login";


            // variable que toma todos los datos del formulario
            var datosEnviar = $('#formularioLogin').serialize();

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: datosEnviar,
                success: function (datosRecibidos) {
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


               
    
    //Se agrega un registro a la base de datos
    app.guardarPersona = function (tipo) {  
        
        var url = "controlador/ruteador/RuteadorCuiles.php?accion=agregar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: datosEnviar,
            success: function (datosRecibidos) {
                $("#modal" + tipo).modal('hide');
                app.limpiarModal(tipo);
                app.actualizarDataTable(tipo);                
            },
            error: function (datosRecibidos) {
                alert("Hubo un error al guardar los datos del registro")
                alert(datosRecibidos);
            }
        });
    };
    
    app.validarCuil = function (tipo,cuil) {  
        alert("entre a validar cuiles y demas");
         var datosEnviar = $("#cuil").val();
        
        alert("Datos az enviar :"+datosEnviar);
        var url = "controlador/ruteador/RuteadorLoginCuiles.php?accion=buscar&Formulario=" + tipo;
        
 
        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: datosEnviar,
            success: function (datosRecibidos) {
                
                
                $("#myModal" ).modal('show');
          //      app.limpiarModal(tipo);
                               
            },
            error: function (datosRecibidos) {
                alert("Hubo un error al guardar los datos del registro")
                alert(datosRecibidos);
            }
        });
    };
    


    //Se vacian los campos del modal
    app.limpiarModal = function (tipo) {
        $("#id").val(0);
        $("#nombre").val('');
        $("#apellido").val('');
     $("#cuil").val('');
    };
    
            
    
    //Se muestra el modal vacio para poder agregar un registro
    app.modalAgregar = function (tipo) {
     
        app.limpiarModal(tipo);
        $("#tituloModal").html("Nuevo " + tipo);
        $("#modal" + tipo).modal({show: true});  
    };
    
  
    
    //Se activan los oyentes para todos los eventos
    app.oyentes = function (tipo) {

   //Oyente para cuando se hace click en el boton retorna
        $("#retornar" + tipo).on('click', function (event) {
            window.location = "carga1.html";
          
        }); 

        //Oyente para cuando se hace click en el boton Agregar
        $("#agregar" + tipo).on('click', function (event) {
           
            app.modalAgregar(tipo);
        });        
       
      
   
        //Oyente para cuando se hace click en el boton Guardar
        $("#guardar").on("click", function (event) {
            if ($("#id").val() == 0) {
                app.guardarPersona(tipo);
            } else {
                app.modificarPersona(tipo);
            }
        });
        
         // oyente del botòn guardar
            $("#registrar").on("click", function (event) {
                event.preventDefault();
                // si la bandera es cero vino de Alta

                app.registrarPersona();

            });

          // oyente del botòn guardar
            $("#btnCuil").on("click", function (event) {
                event.preventDefault();
           
               var cuil = $("#cuil").val(); 
               alert("Ingresé este cuil :" +cuil);
                app.validarCuil(tipo,cuil);

            });
        
        
        //Se configuran las validaciones de bootstrap
        $("#form" + tipo).bootstrapValidator({
            excluded: []
        });
    };           
};