$(function() {
  var FuncionesCliente = {};

  (function(app) {
    app.init = function() {
      //Se comparten todas las funciones del archivo funcionesGeneral con la app
      compartirFunciones(app);
      //Se verifica que haya una sesion iniciada

      app.comprobarSesion("Peluquero");
      //Cargar mensaje bienvenida
      app.buscarUsuarioLogeado("Peluquero");
      //Encender calendario
      app.calendario("Peluquero");
      //Se llama la funcion para comprobar tiempo de inactividad
      app.cerrarSesionInactiva("Peluquero");
      //Se inicializan los oyentes para los eventos
      app.oyentes("Peluquero");
    };

    app.init();
  })(FuncionesCliente);
});
