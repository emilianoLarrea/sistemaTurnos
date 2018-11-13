
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


        };

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

