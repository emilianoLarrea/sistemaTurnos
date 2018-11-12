function compartirFunciones(app) {

    app.cerrarSesion = function () {
        var url = "controlador/ruteador/CerrarSesion.php";
        $.ajax({
            url: url,
            dataType: 'json',
            success: function () {

            },
            error: function () {

            }
        });
        window.location = "index.html";
    };

    //Se comprueba que haya una session activa
    app.comprobarSesion = function () {
        var url = "controlador/ruteador/Ruteador.php";
        $.ajax({
            url: url,
            dataType: 'json',
            success: function (data) {
                if (data == false) {
                    window.location = "index.html";
                }
            },
            error: function () {
                alert('Hubo un error al combrobar la sesion');
                window.location = "index.html";
            }
        });
    };

    //Encender Calendario de selección:
    app.calendario = function (tipo) {
        $(function () {
            $('#calendarioSeleccion' + tipo).datetimepicker({
                format: 'DD/MM/YYYY'
            });
        });
    };



    app.agregarSelector = function (data, tipo) {
        
        var lineas = "<option>Seleccione " + tipo + "</option>";
        $.each(data, function (index, data) {
            
            lineas = lineas + "<option value='" + data.id+"'>" + data.nombreUsuario +" "+data.apellido+ "</option>";

        });
        lineas = lineas + "</select></div>";
        $("#select"+tipo).html(lineas);
    };

    //buscar un peluquero o lo que sea que se necesite para armar un select:
    app.buscar = function(tipo){       
        
          var url = "controlador/ruteador/Ruteador.php?accion=buscarPeluquero&Formulario=Cliente";
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    app.agregarSelector(data, tipo);
                 },
               error: function(data){
                   alert("Error en el Servidor");
                   console.log(data);
               }
           });
        }; 

    //Se inicializa el complemento DataTable con los datos correspondientes
    app.cargarDataTable = function (tipo) {
        var url = "controlador/ruteador/Ruteador.php?accion=listar&Formulario=" + tipo;
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
                    "dataSrc": ""
                },
                //Configura las columnas que va tener la tabla
                "columns": [
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "legajo" },
                    { "data": "calle" },
                    { "data": "numero" },
                    {
                        "data": "Acciones",
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, row, meta) {
                            var a = '<a class="pull-left editar" data-id_persona="' + row.id_persona + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                                '<a class="pull-right eliminar" data-id_persona="' + row.id_persona + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            return a;
                        }
                    }
                ]
            });
        } else {
            $("#tabla" + tipo).DataTable({
                "language": {
                    "url": "js/DataTables/Spanish.json"
                },
                "autoWidth": false,
                "ajax": {
                    "url": url,
                    "dataSrc": ""
                },
                "columns": [
                    { "data": "nombre" },
                    { "data": "apellido" },
                    { "data": "titulo" },
                    { "data": "calle" },
                    { "data": "numero" },
                    {
                        "data": "Acciones",
                        "orderable": false,
                        "searchable": false,
                        "render": function (data, type, row, meta) {
                            var a = '<a class="pull-left editar" data-id_persona="' + row.id_persona + '"><span class="glyphicon glyphicon-pencil"></span>Editar</a>' +
                                '<a class="pull-right eliminar" data-id_persona="' + row.id_persona + '"><span class="glyphicon glyphicon-remove"></span>Eliminar</a>';
                            return a;
                        }
                    }
                ]
            });
        }
    };

    //Actualiza la tabla de la vista usando DataTable
    app.actualizarDataTable = function (tipo) {
        var tabla = $("#tabla" + tipo).DataTable();
        tabla.ajax.reload();
    };

    //Se agrega un registro a la base de datos
    app.guardarPersona = function (tipo) {
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
                alert("Hubo un error al guardar los datos del registro")
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
            var datosEnviar = { id: id };
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
        $("#nombre").val('');
        $("#apellido").val('');
        if (tipo == "Alumno") {
            $("#legajo").val('');
        } else {
            $("#titulo").val('');
        }
        $("#calle").val('');
        $("#numero").val('');
    };

    //Se imprimen los datos de la tabla en un archivo pdf
    app.imprimir = function (tipo) {
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
        $("#imprimir" + tipo).submit();
    };

    //Se muestra el modal vacio para poder agregar un registro
    app.modalAgregar = function (tipo) {
        app.limpiarModal(tipo);
        $("#tituloModal").html("Nuevo " + tipo);
        $("#modal" + tipo).modal({ show: true });
    };

    //Se muestra el modal con todos los datos del registro que se quiera editar
    app.modalEditar = function (tipo, contexto) {
        $("#id").val($(contexto).attr("data-id_persona"));
        $("#nombre").val($(contexto).parent().parent().children().first().html());
        $("#apellido").val($(contexto).parent().parent().children().first().next().html());
        if (tipo == "Alumno") {
            $("#legajo").val($(contexto).parent().parent().children().first().next().next().html());
        } else {
            $("#titulo").val($(contexto).parent().parent().children().first().next().next().html());
        }
        $("#calle").val($(contexto).parent().parent().children().first().next().next().next().html());
        $("#numero").val($(contexto).parent().parent().children().first().next().next().next().next().html());
        $("#tituloModal").html("Editar " + tipo);
        $("#modal" + tipo).modal({ show: true });
    };

    //Se activan los oyentes para todos los eventos
    app.oyentes = function (tipo) {
        $("#datos"+tipo).hide();
        $("#turnos"+tipo).hide();
        //Oyente para cuando se hace click en el boton Agregar
        $("#cerrarSesion" + tipo).on('click', function (event) {
            app.cerrarSesion();
            
        });
        $("#misTurnosCliente").on('click', function (event) {
            $("#turnos"+tipo).show();
            $("#registroTurno"+tipo).hide();
            $("#datos"+tipo).hide();
            $("#btnMisTurnos").addClass('active');
            $("#btnTurno").removeClass('active');
            $("#btnMisDatos").removeClass('active');

        });
        $("#turnoCliente").on("click", function (event) {
           
            
            $("#datos"+tipo).hide();
            $("#registroTurno"+tipo).show();
           $("#turnos"+tipo).hide();
           $("#btnMisTurnos").removeClass('active');
            $("#btnTurno").addClass('active');
            $("#btnMisDatos").removeClass('active');
           
        });
        $("#btnMisDatos").on("click", function (event) {
           $("#registroTurno"+tipo).hide();
           $("#turnos"+tipo).hide();
           $("#datos"+tipo).show();
           $("#btnMisTurnos").removeClass('active');
            $("#btnTurno").removeClass('active');
            $("#btnMisDatos").addClass('active');
           
        });
        //oyente de click en selector de pelquero
        $('#selectPeluquero').on('click',function(){
            
            app.buscar("Peluquero");
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
                app.guardarPersona(tipo);
            } else {
                app.modificarPersona(tipo);
            }
        });

        
       
        //Se configuran las validaciones de bootstrap
        $("#form" + tipo).bootstrapValidator({
            excluded: []
        });
    };
}
;