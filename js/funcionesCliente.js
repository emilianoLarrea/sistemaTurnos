$(function () {
    var FuncionesCliente = {};

    (function (app) {      
                    
        app.init = function () {
            
            
            
            
        
            //Se comparten todas las funciones del archivo funcionesGeneral con la app
            compartirFunciones(app);
            //Se verifica que haya una sesion iniciada
            app.comprobarSesion();
            //Encender calendario
            app.calendario('Cliente');
            //Se cargan los datos de todos los alumnos         
            //app.cargarDataTable("Alumno");
            //Se inicializan los oyentes para los eventos
            app.oyentes("Cliente");
        };

        app.init();

    })(FuncionesCliente);    
});