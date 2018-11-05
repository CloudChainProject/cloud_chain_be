var express = require("express");
var controller = require ("./signup.controller.js");
var router = express.Router();

router.post('/new_user/', controller.new_user);

module.exports = router;


/*
curl --request POST --header "Content-Type: application/json" 'http://localhost:3000/api/v1/signup/new_user/' --data-binary '{"User":{"email": "christianpengu@gmail.com", "password": "miao" }}'
*/
