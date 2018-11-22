<?php

interface DbSentencias {
    
//Sesion
const BUSCAR_USUARIO = "SELECT * FROM `usuario` WHERE `mail` = ?  AND `pass` = ?";    
  

//Peluquero
const CREAR_LISTA = "INSERT INTO `listaTurnoPeluquero`(`idListaTurno`, `nombreLista`, `fechaDesde`, `idUsuario`, `estado`) VALUES (?,?,?,?,0);";
const BUSCAR_IDUSUARIO = "SELECT `id` FROM `usuario` WHERE `mail` = ?;";
const BUSCAR_IDLISTA = "SELECT MAX(`idListaTurno`) FROM `listaTurnoPeluquero`";
const BUSCAR_IDPARAMETRO_TURNO = "SELECT MAX(`idParametroTurno`) FROM `parametroTurno`;";
const CREAR_PARAMETROTURNO = "INSERT INTO `parametroTurno`(`idParametroTurno`, `horaDesde`, `horaHasta`, `idListaTurno`,`idDia`) VALUES (?,?,?,?,?);";
const TURNOS_EXISTENTES_EN_ESE_HORARIO = "SELECT `idParametroTurno` FROM `parametroTurno` WHERE (((`horaDesde`= ?)AND(`horaHasta`= ?))OR((`horaDesde`> ?)AND(`horaDesde`< ?))OR((`horaHasta`> ?)AND(`horaHasta`< ?))OR((`horaDesde`= ?))OR((`horaHasta`= ?)))AND((`idDia` = ?)AND(`idListaTurno`=?))";

//Cliente
const INSERTAR_CLIENTE = "INSERT INTO `usuario`(`id`, `nombreUsuario`, `apellido`,`mail`, `fechaNacimiento`,`tel`,`sexo`, `pass`, `dni`,   `tipoUsuario`) VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, 0, 'Cliente')";
const BUSCAR_USUARIO_LOGEADO = "SELECT `nombreUsuario` FROM `usuario` WHERE `mail` = ?";
const BUSCAR_PELUQUERO = "SELECT * FROM `usuario` WHERE `tipoUsuario` = 'Peluquero';";  










const ELIMINAR_ALUMNO = "DELETE FROM `persona2` WHERE id_persona = ? AND estado = 'A'";
const ACTUALIZAR_ALUMNO = "UPDATE `persona2` SET `nombre`= ?,`apellido`= ?, `legajo`= ? WHERE id_persona = ? AND estado = 'A'";
const BUSCAR_ALUMNO = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                       INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                       WHERE `persona2`.`estado` = 'A' AND `persona2`.`id_persona` = ?;";
const BUSCAR_ALUMNOS = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                        INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                        WHERE `persona2`.`estado` = 'A' AND ? = ?;";
const LISTAR_ALUMNOS = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                        INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                        WHERE `persona2`.`estado` = 'A';";
const BUSCAR_ULTIMOALUMNO = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                             INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                             WHERE `persona2`.`estado` = 'A' AND `persona2`.`id_persona` = (SELECT MAX(id_persona) FROM `persona2`);";

//Profesor
const INSERTAR_PROFESOR = "INSERT INTO `usobackend`.`persona2`(`nombre`,`apellido`,`titulo`,`estado`,`fk_domicilio`)VALUES (?,?,?,'P',(SELECT MAX(`id_domicilio`) FROM domicilio));";
const ELIMINAR_PROFESOR = "DELETE FROM `persona2` WHERE id_persona = ? AND estado = 'P'";
const ACTUALIZAR_PROFESOR = "UPDATE `persona2` SET `nombre`= ?,`apellido`= ?, `titulo`= ? WHERE id_persona = ? AND estado = 'P'";
const BUSCAR_PROFESOR = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                         INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                         WHERE `persona2`.`estado` = 'P' AND `persona2`.`id_persona` = ?;";
const BUSCAR_PROFESORES = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                           INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                           WHERE `persona2`.`estado` = 'P' AND ? = ?;";
const LISTAR_PROFESORES = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                           INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                           WHERE `persona2`.`estado` = 'P';";
const BUSCAR_ULTIMOPROFESOR = "SELECT `persona2`.*, `domicilio`.* FROM `usobackend`.`persona2` 
                               INNER JOIN `usobackend`.`domicilio` ON (`persona2`.`fk_domicilio` = `domicilio`.`id_domicilio`) 
                               WHERE `persona2`.`estado` = 'P' AND `persona2`.`id_persona` = (SELECT MAX(id_persona) FROM `persona2`);";

}
