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
      error: function() {
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
      },
      error: function(data) {
        alert("Error en el Servidor");
        console.log(data);
      }
    });
  };

  //Se activan los oyentes para todos los eventos
  app.oyentes = function(tipo) {
    $("#datos" + tipo).hide();
    $("#turnos" + tipo).hide();
    //Oyente para cuando se hace click en el boton Agregar
    $("#cerrarSesion").on("click", function(event) {
      app.cerrarSesion();
    });
    $("#misTurnosCliente").on("click", function(event) {
      $("#turnos" + tipo).show();
      $("#registroTurno" + tipo).hide();
      $("#datos" + tipo).hide();
      $("#btnMisTurnos").addClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").removeClass("active");
    });
    $("#turnoCliente").on("click", function(event) {
      $("#datos" + tipo).hide();
      $("#registroTurno" + tipo).show();
      $("#turnos" + tipo).hide();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").addClass("active");
      $("#btnMisDatos").removeClass("active");
    });
    $("#btnMisDatos").on("click", function(event) {
      $("#registroTurno" + tipo).hide();
      $("#turnos" + tipo).hide();
      $("#datos" + tipo).show();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").addClass("active");
    });
    //oyente de click en selector de pelquero
    $("#selectPeluquero").on("click", function() {
      app.buscar("Peluquero");
    });
    //oyente de mis datos en menú superior
    $("#misDatos").on('click', function(){
      $("#registroTurno" + tipo).hide();
      $("#turnos" + tipo).hide();
      $("#datos" + tipo).show();
      $("#btnMisTurnos").removeClass("active");
      $("#btnTurno").removeClass("active");
      $("#btnMisDatos").addClass("active");
    });
  };
}
