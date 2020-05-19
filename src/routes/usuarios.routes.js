const express = require("express");
const router = express.Router();

const { registroForm, registro, registrarse, registrarseForm, logout } = require("../controller/usuarios.controller");

router.get('/usuarios/registro', registroForm);

router.post('/usuarios/registro', registro);

router.get('/usuarios/registrarse', registrarseForm);

router.post('/usuarios/registrarse', registrarse);

router.get('/usuarios/logout', logout);

module.exports = router;