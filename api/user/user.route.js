var express = require("express");
var controller = require ("./user.controller.js");
var router = express.Router();

router.get('/info/:id', controller.get_info);

module.exports = router;
