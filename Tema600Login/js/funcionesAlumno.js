$(function () {
    var FuncionesAlumno = {};

    (function (app) {      
            //       alert ("Estoy en funciones Alumnos"); 
        app.init = function () {
            //Se comparten todas las funciones del archivo funcionesGeneral con la app
            compartirFunciones(app);
            //Se verifica que haya una sesion iniciada
            app.comprobarSesion();
            //Se cargan los datos de todos los alumnos
            app.cargarCabecera("Alumno");
          //  alert ("voy a cargar el dat table");
       //     app.cargarDataTable("Alumno");
            //Se inicializan los oyentes para los eventos
            app.oyentes("Alumno");
        };

        app.init();

    })(FuncionesAlumno);    
});