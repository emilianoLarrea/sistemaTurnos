function compartirFunciones(app) {
  app.cerrarSesion = function() {
    var url = "controlador/ruteador/CerrarSesion.php";
    $.ajax({
      url: url,
      dataType: "json",
      success: function() {},
      error: function() {}
    });
    window.location = "index.html";
  };

  //Se comprueba que haya una session activa
  app.comprobarSesion = function(tipo) {
    var url = "controlador/ruteador/Ruteador.php?tipo=" + tipo;
    $.ajax({
      url: url,
      dataType: "json",
      success: function(data) {
        if (data == false) {
          window.location = "index.html";
        }
      },
      error: function(cosa1, cosa2, error) {
        alert(error);
        alert("Hubo un error al comprobar la sesión");
        window.location = "index.html";
      }
    });
  };

  //Encender Calendario de selección:
  app.calendario = function(tipo) {
    $(function() {
      $("#calendarioSeleccion" + tipo).datetimepicker({
        format: "DD/MM/YYYY"
      });
    });
  };

  app.agregarSelector = function(data, tipo) {
    var lineas = "<option>Seleccione " + tipo + "</option>";
    $.each(data, function(index, data) {
      lineas =
        lineas +
        "<option value='" +
        data.id +
        "'>" +
        data.nombreUsuario +
        " " +
        data.apellido +
        "</option>";
    });
    lineas = lineas + "</select></div>";
    $("#select" + tipo).html(lineas);
  };

  //buscar un peluquero o lo que sea que se necesite para armar un select:
  app.buscar = function(tipo) {
    var url =
      "controlador/ruteador/Ruteador.php?accion=buscarPeluquero&Formulario=Cliente&tipo=Cliente";
    $.ajax({
      url: url,
      method: "POST",
      dataType: "json",
      success: function(data) {
        app.agregarSelector(data, tipo);
        console.log(data);
      },
      error: function(data, data1, error) {
        alert("Error en el Servidor");
        console.log(data);
        console.log(error);
      }
    });
  };
  //Funciones Nico

  //Funciones Emi

  //Se activan los oyentes para todos los eventos
  app.oyentes = function(tipo) {
    $("#datos" + tipo).hide();
    $("#turnos" + tipo).hide();
    //Oyente para cuando se hace click en el boton Agregar
    $("#cerrarSesion" + tipo).on("click", function(event) {
      app.cerrarSesion();
    });
    $("#misTurnos" + tipo).on("click", function(event) {
      $("#turnos" + tipo).show();
      $("#registroTurno" + tipo).hide();
      $("#datos" + tipo).hide();
      $("#btnMisTurnos").addClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").removeClass("active");
    });
    $("#turno" + tipo).on("click", function(event) {
      $("#datos" + tipo).hide();
      $("#registroTurno" + tipo).show();
      $("#turnos" + tipo).hide();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").addClass("active");
      $("#btnMisDatos").removeClass("active");
    });
    $("#misDatos" + tipo).on("click", function(event) {
      $("#registroTurno" + tipo).hide();
      $("#turnos" + tipo).hide();
      $("#datos" + tipo).show();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").addClass("active");
    });

    //oyente de mis datos en menú superior
    $("#misDatos" + tipo + "Nav").on("click", function() {
      $("#registroTurno" + tipo).hide();
      $("#turnos" + tipo).hide();
      $("#datos" + tipo).show();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").addClass("active");
    });
    //Oyentes Nico

    //Oyentes Emi
  };
}
