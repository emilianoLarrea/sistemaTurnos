$(function () {
    var FuncionesProfesor = {};

    (function (app) {

        app.init = function () {
            //Se comparten todas las funciones del archivo funcionesGeneral con la app
            compartirFunciones(app);
            //Se verifica que haya una sesion iniciada
          //  app.comprobarSesion();
            //Se cargan los datos de todos los profesores
        
            //Se inicializan los oyentes para los eventos
            app.oyentes("LoginProfesorCuiles");
        };

        app.init();

    })(FuncionesProfesor);
});