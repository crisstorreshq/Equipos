const express = require("express");
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');

// Controllers
const { renderIndex } = require("../controller/index.controller");

router.get("/index", isAuthenticated, renderIndex);

module.exports = router;