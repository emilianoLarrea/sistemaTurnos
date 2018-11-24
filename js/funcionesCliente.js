$(function() {
  var FuncionesCliente = {};

  (function(app) {
    app.init = function() {
      //Se comparten todas las funciones del archivo funcionesGeneral con la app
      compartirFunciones(app);
      //Se verifica que haya una sesion iniciada

      app.comprobarSesion("Cliente");
      //Encender calendario
      app.calendario("Cliente");
      //Cargar mensaje bienvenida
      app.buscarUsuarioLogeado("Cliente");
      //Cargar los peluqueros disponibles
      app.buscar("Peluquero");
      //Se llama la funcion para comprobar tiempo de inactividad
      app.cerrarSesionInactiva("Cliente");
      //Se inicializan los oyentes para los eventos
      app.oyentes("Cliente");
    };

    app.init();
  })(FuncionesCliente);
});
