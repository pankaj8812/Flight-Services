const express = require("express");

const {AirportController} = require("../../controllers");
const { AirportMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/Airports POST
router.post("/", 
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport);

// /api/v1/Airports GET
router.get("/", AirportController.getAirports);

// /api/v1/Airports/:id GET
router.get("/:id", AirportController.getAirport);

// /api/v1/Airports/:id DELETE
router.delete("/:id", AirportController.destroyAirport);

// /api/v1/Airports/:id PATCH
router.patch("/:id", 
    AirportMiddlewares.validateUpdateRequest,
    AirportController.updateAirport
);


module.exports = router;