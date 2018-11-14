$(function() {
  var FuncionesLogIn = {};

  (function(app) {
    app.init = function() {
      app.bindings();
    };

    app.cerrarSesion = function() {
      var url = "controlador/ruteador/CerrarSesion.php";
      $.ajax({
        url: url,
        dataType: "json",
        success: function(data) {
          alert();
        },
        error: function() {}
      });
    };
    app.calendario = function(tipo) {
      $(function() {
        $("#calendarioFechaNacimiento").datetimepicker({
          format: "YYYY-MM-DD"
        });
      });
    };

    app.modal = function(tipo) {
      app.limpiarModalCliente();
      $("body #tituloModal").html("Iniciar Sesión");
      $("body #modal" + tipo).modal({ show: true });
    };

    app.limpiarModalCliente = function() {
      $("#txtClave").val("");
      $("#txtUsuario").val("");
      $("#loginUsuario").attr("disabled");
    };

    app.registroUsuario = function(tipo) {
      $("#modalCliente").modal("hide");

      $("#modalAgregarUsuario").modal({ show: true });
      $("#form" + tipo)[0].reset();
      app.calendario();
      app.contrasenas();
    };

    app.contrasenas = function() {
      var pass1 = document.getElementById("password").value;

      var pass2 = document.getElementById("rePassword").value;

      if (pass1 == "" || pass2 == "") {
        if ($("#error2").hasClass("glyphicon-ok")) {
          $("#error2").removeClass("glyphicon-ok");
        }
        $("#error2").addClass("glyphicon-remove");
        $("#comprobarPass").val(0);
      } else if (pass1 === pass2) {
        if ($("#error2").hasClass("glyphicon-remove")) {
          $("#error2").removeClass("glyphicon-remove");
        }
        $("#error2").addClass("glyphicon-ok");
        $("#comprobarPass").val(1);
      } else {
        if ($("#error2").hasClass("glyphicon-ok")) {
          $("#error2").removeClass("glyphicon-ok");
        }
        $("#error2").addClass("glyphicon-remove");
        $("#comprobarPass").val(0);
      }
    };
    app.agregarUsuario = function(tipo) {
      if (
        $("#nombreUsuario").val() != "" &&
        $("#apellidoUsuario").val() != "" &&
        $("#mailUsuario").val() != "" &&
        $("#celularUsuario").val() != "" &&
        $("#sexoUsuario").val() != "" &&
        $("#comprobarPass").val() != 0
      ) {
        var url =
          "controlador/ruteador/Ruteador.php?accion=agregar&Formulario=" +
          tipo +
          "&bool=hola";
        var datosEnviar =
          $("#form" + tipo).serialize() +
          "&pass=" +
          btoa($.md5($("#password").val()));
        alert(datosEnviar);
        $.ajax({
          url: url,
          method: "POST",
          dataType: "json",
          data: datosEnviar,
          success: function(datosRecibidos) {
            $("#modalAgregarUsuario").modal("hide");
          },
          error: function(datosRecibidos) {
            alert("Hubo un error al guardar los datos del registro");
            console.log(datosRecibidos);
          }
        });
      }
    };

    app.bindings = function() {
      //Al enviar el formulario, se encriptan el usuario y la clave
      $("#login").on("click", function(event) {
        app.modal("Cliente");
      });

      $("#loginUsuario").on("click", function() {
        var datos =
          "u=" +
          btoa(btoa($("#txtUsuario").val())) +
          "&c=" +
          btoa($.md5($("#txtClave").val()));
        //Se envian al RuteadorSesion
        $.ajax({
          type: "POST",
          url: "./controlador/ruteador/RuteadorSesion.php",
          data: datos
        })
          //Se obtuvo una respuesta del servidor
          .done(function(data) {
            //El usuario es Cliente
            if (data == 0) {
              window.location = "sesionCliente.html";
            }
            //El usuario es Secretario
            if (data == 3) {
              window.location = "sesionSecretario.html";
            }
            //El usuario es Peluquero
            if (data == 4) {
              window.location = "sesionPeluquero.html";
            }
            //La clave no era correcta
            if (data == 1) {
              alert("El mail y contraseña ingresada no coinciden");
            }
            //El usuario no era correcto
            if (data == 2) {
              alert("El usuario ingresado es incorrecto");
            }
          })
          //No se obtuvo una respuesta del servidor
          .fail(function() {
            alert("Hubo un error en la conexion");
          });
        return false;
      });
      $("#password").on("input", function() {
        app.contrasenas();
      });
      $("#rePassword").on("input", function() {
        app.contrasenas();
      });
      $("#registroUsuario").on("click", function(event) {
        app.registroUsuario("Cliente");
      });
      $("#registroUsuarioGuardar").on("click", function(event) {
        app.agregarUsuario("Cliente");
      });
      $("#formCliente").bootstrapValidator({
        excluded: []
      });
      function comprobarRegistros() {
        if ($("#txtClave").val() !== "" && $("#txtUsuario").val() !== "") {
          $("#loginUsuario").removeAttr("disabled");
        } else {
          $("#loginUsuario").attr("disabled");
        }
      }
      setInterval(comprobarRegistros, 100);
    };

    app.init();
  })(FuncionesLogIn);
});
