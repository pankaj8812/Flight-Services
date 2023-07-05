const express = require("express");

const {AirplaneController} = require("../../controllers");
const { AirplaneMiddlewares } = require("../../middlewares");

const router = express.Router();

console.log("inside routes folder airplane");

router.post("/", 
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);

module.exports = router;