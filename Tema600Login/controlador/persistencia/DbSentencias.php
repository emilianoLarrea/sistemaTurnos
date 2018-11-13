<?php

interface DbSentencias {
   
 // Libro
const INSERTAR_USUARIO = "INSERT INTO `usuarios`(`usuario`,`email`,`password`, keyReg)VALUES (?,?,?,?)";
const BUSCAR_USUARIO_EMAIL = "SELECT usuario FROM usuarios WHERE usuario = ? OR email = ? LIMIT 1"; 
const ULTIMO_USUARIO= "SELECT MAX(id) AS id FROM usuarios"; 
const BUSCAR_USUARIO="SELECT usuario FROM usuarios WHERE usuario = ? AND password = ? AND estado= 1";
const BUSCAR_KEYREG="SELECT usuario,estado FROM usuarios WHERE keyReg = ? and estado=0";
const UPDATE_ESTADO="UPDATE usuarios SET estado = ? WHERE keyReg = ? ";
const BUSCAR_CORREO= "SELECT usuario,email FROM usuarios WHERE email = ? AND estado=1";
//const UPDATE_KEYREG= "UPDATE usuarios SET usuarios.`password` = ?, keyreg = ? WHERE email = ?";
const UPDATE_KEYREG= "UPDATE usuarios SET passwordTrucha = ?, keyreg = ?, estado=3 WHERE email = ?";
const UPDATE_PASS= "UPDATE usuarios SET password = ?, passwordTrucha= NULL, estado=1 WHERE passwordTrucha = ? ";
const BUSCAR_USUARIO_PERDIDO ="SELECT usuario FROM usuarios WHERE usuario = ? AND passwordTrucha = ? AND estado= 3";

   
}
