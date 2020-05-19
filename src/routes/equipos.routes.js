const express = require("express");
const router = express.Router();

// Controllers
const { renderEquipoForm, createNewEquipo, renderEquipos, renderEditForm, updateEquipo, renderDeleteForm } = require("../controller/equipos.controller");


const { isAuthenticated } = require('../helpers/auth');

router.get("/equipos/nuevo", isAuthenticated, renderEquipoForm);//add

router.post("/equipos/nuevo-equipo", isAuthenticated, createNewEquipo);//new-note

router.get("/equipos", isAuthenticated, renderEquipos);

router.get("/equipos/edit/:id", isAuthenticated, renderEditForm);

router.get("/equipos/delete/:id", isAuthenticated, renderDeleteForm);

router.put("/equipos/edit/:id", isAuthenticated, updateEquipo);

module.exports = router;