$(function () {
    var FuncionesCliente = {};

    (function (app) {      
                    
        app.init = function () {
            
            
            
            
            
            //Se comparten todas las funciones del archivo funcionesGeneral con la app
            compartirFunciones(app);
            //Se verifica que haya una sesion iniciada
            
            app.comprobarSesion('Cliente');
            //Encender calendario
            app.calendario('Cliente');
           
            //Se inicializan los oyentes para los eventos
            app.oyentes("Cliente");
        };

        app.init();

    })(FuncionesCliente);    
});