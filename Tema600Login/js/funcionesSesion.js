$(function() {
    var FuncionesSesion = {};

    (function(app) {

        app.init = function() {
            app.comprobarSesion();
        };

        //Se comprueba que haya una session activa
        app.comprobarSesion = function() {            
            var url = "controlador/ruteador/Ruteador.php";
            $.ajax({
                url: url,
                dataType: 'json',
                success: function(data) {
                    if(data == false){
                        window.location = "index1.html";
                    }
                },
                error: function() {
                    alert('Hubo un error al combrobar la sesion');
                    window.location = "index1.html";
                }
            });
        };
        
        app.init();

    })(FuncionesSesion);

});


