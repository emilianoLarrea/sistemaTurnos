function compartirFunciones(app) {
    var cabecera=0;
    //Se comprueba que haya una session activa
    app.comprobarSesion = function () {
        var url = "controlador/ruteador/Ruteador.php";
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == false) {
                    window.location = "index1.html";
                }
            },
            error: function () {
                alert('Hubo un error al combrobar la sesion');
                window.location = "index1.html";
            }
        });
    };
    
    //Aca voy a cargar la linea de detalle, por eso tomo la variable global y la paso por ajax
    app.cargarDataTable = function (tipo,fk_cabecera) {
         var url = "controlador/ruteador/Ruteador.php?accion=listarDetalle&Formulario=" + tipo;
         
      //
      //        alert("Estoy en cargar tabla y muestro la variable global que recibi por parametro"+ cabecera);
         
     var datosEnviar = {fk_cabecera: fk_cabecera};  
            
           
           
        
           console.log(datosEnviar);
         
           
        if (tipo == "Alumno") {
            $("#tabla" + tipo).DataTable({
                //Configura el idioma a español
                "language": {
                    "url": "js/DataTables/Spanish.json"
                },
                "autoWidth": false,
                //Configura los parametros para la llamada de ajax
                "ajax": {
                    "url": url,
                     "type": "POST",
                  
                  "data": datosEnviar,
                 "dataSrc": ""
                },
                //Configura las columnas que va tener la tabla
                
                
               
                
                
                
                "columns": [
                    {"data": "fechaCalendario"},
                    {"data": "nro"},
                    {"data": "tema"},
                    {"data": "caracter"},
                    {"data": "unidad"},
                    {"data": "actividad"},
                    {"data": "Acciones",
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, row, meta) {
                               
//                              console.log("fecha"+ row.fecha);
//                            console.log("fila"+ row.id);
//                         alert("fecha"+ row.fecha) ;
//                            var fechaIngles = row.fecha.split('-');
//                            fechaIngles .reverse();
//                          var invertida = fechaIngles .join('-');
//                         
//                          alert("fecha"+ invertida) ;
//                         row.fecha = invertida;
                            var a = '<a class="pull-left editar" data-id_persona="' + row.id + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                                    '<a class="pull-right eliminar" data-id_persona="' + row.id + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            return a;

                        }
                    }
                ]
            });
        } else {
            
        }
    };
    
    //Actualiza la tabla de la vista usando DataTable
    app.actualizarDataTable = function (tipo) {        
        var tabla = $("#tabla" + tipo).DataTable();
        tabla.ajax.reload();
    };      
    
  ///// la funcion MIA
    
    
    
    app.cargarCabecera = function (tipo) { 
   //      alert("Aca voy a buscar la cabecera, llamo listar de php alumno");
         // OJO ACA POR POST NO PASO NADA, RECUPERO DE LAS VARIABLES DE SESION
            var url = "controlador/ruteador/Ruteador.php?accion=listarCabecera&Formulario=" + tipo;
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (datosRecibidos) {
             // aca volvi a traer todos los datos de cabecera y su id       
                var html = "";
                var html1 = "";
                console.log(JSON.stringify(datosRecibidos));
                var htmlSede = datosRecibidos.sede;
                var htmlCarrera = datosRecibidos.carrera;
                var htmlMateria = datosRecibidos.materia;
                var htmlCurso = datosRecibidos.curso;
                var htmlCuil = datosRecibidos.cuil;
                var htmlDia1 = datosRecibidos.dia1;
                var htmlDia2 = datosRecibidos.dia2;
                var htmlDia3 = datosRecibidos.dia3;
                var htmlNombre = datosRecibidos.nombre;
                var htmlApellido = datosRecibidos.apellido;
                 var htmlNumero = datosRecibidos.nro;
                var htmlcabeceraid = datosRecibidos.id;
                // coloco el valor del id de cabecera en una variable global
                 cabecera = htmlcabeceraid;
                 
//                  alert('Almaceno en variable global el id del registo leido:' + cabecera);
//                  alert('MUESTRO id de la cabecera' + htmlcabeceraid);
//                alert("'Ahora se inyecta toda la cabecera con los datos que vienen de la consulta Verificar Usiario");
//              
//               
            
                            
                         html += '<div class="form-group">'+
             '<label for="sede"></label>' +
             '<input type="text" class="form-control" value="'+htmlSede +  '"  id="txtSede" placeholder="'+
             htmlSede +
             '">'+
                '<label for="carrera"></label>' +
             '<input type="text" class="form-control"  value="'+htmlCarrera +  '" id="txtCarrera" placeholder="'+
             htmlCarrera+
             '">'+
             '<label for="materia"></label>' +
             '<input type="text" class="form-control"  value="'+htmlMateria +  '" id="txtMateria" placeholder="'+
             htmlMateria +
             '">'+
              '<label for="curso"></label>' +
             '<input type="text" class="form-control"  value="'+htmlCurso +  '"  id="txtCurso" placeholder="'+
             htmlCurso +
             '">';
     
     
      html += '<div class="form-group">'+
             '<label for="dia1"></label>' +
             '<input type="text" class="form-control" id="txDia1" placeholder="'+
             htmlDia1 +
             '">'+
                '<label for="dia2"></label>' +
             '<input type="text" class="form-control" id="txtDia2" placeholder="'+
             htmlDia2+
             '">'+
             
              '<label for="dia3"></label>' +
             '<input type="text" class="form-control" id="txtDia3" placeholder="'+
             htmlDia3 +
            '"   >'+
     
            '<label for="nombre"></label>' +
           '<input type="text" class="form-control" value="'+htmlNombre + '  '+ htmlApellido+ '"   id="txtNombre" placeholder="'+ htmlNombre + '  '+ htmlApellido +
           '">'+
              '<label for="id"></label>' +
             '<input type="hidden" class="form-control" name = "cabeceraid" id="cabeceraid" placeholder="'+
             
           htmlcabeceraid + '" '+ 'value="'+htmlcabeceraid + 
           '">'+
   
      '<label for="numero"></label>' +
             '<input type="hidden" class="form-control" name = "numero" id="numero" placeholder="'+
             
           htmlNumero + '" '+ 'value="'+htmlNumero + '"   >'; 
//     
        
             
   //                   alert('Se inyecto en cabeceraID, lo que vino de la base de datos' + htmlcabeceraid);
                    
                    
                    $("#cabeza1").html(html);
                    
                    $("#cabeza2").html(html1);
                    
             // le paso la cabecera de la base de dagos al modal para que sea la Fk       
                       
                   
                 app.cargarDataTable("Alumno",cabecera);                                     
    
                           

                  
                },
                error: function() {
                    alert('error al cargar cabecera');
                }
            });
        };
    
      app.rellenarCabecera = function(data) {//funcion para rellenar la tabla profesores
           alert("Entre en rellenar cabecera");
            console.log(JSON.stringify(data));
            $.each(data, function(clave, profesor) {
                
            alert('MUESTRO SEDE '+profesor.sede);
            alert('MUESTRO MATERIA'+profesor.materia);    
              
            });
        
        };
  
    
    //Se agrega un registro a la base de datos
    app.guardarPersona = function (tipo) {   
//          alert("el tipo es" + tipo);
//          
//       alert("Estoy por grabar persona");
//        
//      
//        
//         alert("Antes de grabar el contenido del escondido del modal cabeza :"+   $("#idmodalCabecera").val()) ;
//        
        var url = "controlador/ruteador/Ruteador.php?accion=agregar&Formulario=" + tipo;
        
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
                alert("Error en guardar Persona Hubo un error al guardar los datos del registro");
                alert(datosRecibidos);
            }
        });
    };
    
    //Se actualizan los datos de un registro
    app.modificarPersona = function (tipo) {        
        var url = "controlador/ruteador/Ruteador.php?accion=modificar&Formulario=" + tipo;
        var datosEnviar = $("#form" + tipo).serialize();
        $.ajax({
            url: url,
            method: 'POST',
            data: datosEnviar,
            success: function (datosRecibidos) {
                $("#modal" + tipo).modal('hide');
                app.limpiarModal(tipo);
                app.actualizarDataTable(tipo);                
            },
            error: function (datosRecibidos) {
                alert("Hubo un error al actualizar los datos del registro");
                alert(datosRecibidos);
            }
        });
    };
        
    //Se elimina un registro de la base de datos
    app.eliminarPersona = function (tipo, id) {
        //Se confirma que se desee eliminar ese registro
        if (confirm("¿Esta seguro que desea eliminar ese registro?")) {
            var url = "controlador/ruteador/Ruteador.php?accion=eliminar&Formulario=" + tipo;
            var datosEnviar = {id: id};            
            $.ajax({
                url: url,
                method: "POST",
                data: datosEnviar,
                success: function (datosRecibidos) {
                    alert('El registro se elimino exitosamente');
                    app.actualizarDataTable(tipo);
                },
                error: function (datosRecibidos) {
                    alert('Hubo un error al eliminar el registro');
                }
            });
        }
    };

    //Se vacian los campos del modal
    app.limpiarModal = function (tipo) {
         $("#id").val(0);
         
         $("#idmodalCabecera").val(cabecera);
        $("#nro").val(0);
        $("#tema").val('');
        $("#caracter").val('');
        
        $("#unidad").val('');
        $("#actividad").val('');
    };
    
    //Se imprimen los datos de la tabla en un archivo pdf
    app.imprimir = function (tipo) { 
        // recupero el nombre de la cabecera y lo inyecto en el escondido
        var nombres =  $("#txtNombre").val();
        var misede =  $("#txtSede").val();
        var micarrera =  $("#txtCarrera").val();
        var mimateria =  $("#txtMateria").val();
        var micurso =  $("#txtCurso").val();
        
              
        var aux = $("#tabla" + tipo).html();
        aux = aux.replace('<th class="sorting_disabled" rowspan="1" colspan="1" aria-label="Acciones">Acciones</th>', '');
        var inicio = aux.indexOf("<td><a class", 0);
        while (inicio > 0) {
            var fin = aux.indexOf("</td>", inicio) + 5;
            var strBorrar = aux.substring(inicio, fin);
            aux = aux.replace(strBorrar, "");
            inicio = aux.indexOf("<td><a class", 0);
        }
        $("#html").val(aux);
         $("#apellido").val(nombres);
          $("#misede").val(misede);
         $("#mimateria").val(mimateria);
          $("#micarrera").val(micarrera);
           $("#micurso").val(micurso);
        $("#imprimir" + tipo).submit();
    };            
    
    //Se muestra el modal vacio para poder agregar un registro
    app.modalAgregar = function (tipo) {
        app.limpiarModal(tipo);
        
     var ultimoNro =     parseInt($("#numero").val()); 
     ultimoNro = ultimoNro + 1;
    
  //alert("sume 1 a : " +ultimoNro);
        // recupero el valor escondido del formulario de la cabecera
        var titulo = tipo;
         titulo = "";
//         alert("voy a tomar el contenkido de cabeceraid");
     var sigoCabecera =  $("#cabeceraid").val();
//         alert("ya tome el contenido de sigocabecer" +sigoCabecera);

//        $("#calendario").datepicker({
//            onSelect: function (date) {
//                alert(date);
//            }
//        });

        $("#tituloModal").html("Nuevo Tema" + titulo);
       // inyecto en el otro id escondido en el modal 
          $("#idmodalCabecera").html(sigoCabecera);
          
           $("#nro").val( ultimoNro);
             
        $("#modal" + tipo).modal({show: true});  
    };
    
    //Se muestra el modal con todos los datos del registro que se quiera editar
    app.modalEditar = function (tipo, contexto) {
      var titulo = tipo;
        $("#id").val($(contexto).attr("data-id_persona"));
      
        
     //   $("#nro").val($(contexto).parent().parent().children().first().html());
        $("#nro").val($(contexto).parent().parent().children().first().next().html());
   
     $("#tema").val($(contexto).parent().parent().children().first().next().next().html());
              
        $("#caracter").val($(contexto).parent().parent().children().first().next().next().next().html());
        $("#unidad").val($(contexto).parent().parent().children().first().next().next().next().next().html());
          $("#actividad").val($(contexto).parent().parent().children().first().next().next().next().next().next().html());
        $("#tituloModal").html("Modificar Tema  " );
        
        $("#modal" + tipo).modal({show: true});
        
        
        
        
    };
    
    //Se activan los oyentes para todos los eventos
    app.oyentes = function (tipo) {
        
         $("#myModal").on('click', function (event) {
          
        
            $("#myModal" ).modal({show: true});  
        }); 
        
        

        
       
        //Oyente para cuando se hace click en el boton Imprimir
        
        
        
          
          
        $("#imprimir").on('click', function (event) {
            app.imprimir(tipo);
        });
        
        //Oyente para cuando se hace click en el boton Editar
        $("#cuerpoTabla").on('click', '.editar', function (event) {
          
            app.modalEditar(tipo, this);
        });
        
        //Oyente para cuando se hace click en el boton Eliminar
        $("#cuerpoTabla").on('click', '.eliminar', function () {
            app.eliminarPersona(tipo, $(this).attr("data-id_persona"));
        });
        
        //Oyente para cuando se hace click en el boton Guardar
        $("#guardar").on("click", function (event) {
            if ($("#id").val() == 0) {
     //           alert("Entre por agregar");
     // tomo el numero del modal y refresco en la cabecera aumentado en 1
           $("#numero").val( $("#nro").val( ));
     
               
                app.guardarPersona(tipo);
                
                
                
            } else {
          //      alert("Entre por modificar");
                app.modificarPersona(tipo);
            }
        });
        
       
        
        
        //Se configuran las validaciones de bootstrap
        $("#form" + tipo).bootstrapValidator({
            excluded: []
        });
    };           
};