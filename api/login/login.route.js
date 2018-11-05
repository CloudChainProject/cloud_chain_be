var express = require("express");
var controller = require ("./login.controller.js");
var router = express.Router();

router.post('/user/token', controller.getToken);

module.exports = router;


/*
curl --request POST --header "Content-Type: application/json" 'http://localhost:3000/api/v1/login/user/token' --data-binary '{"User":{"email": "christianpengu@gmail.com", "password": "miao", "name": "christian"}}'
*/
