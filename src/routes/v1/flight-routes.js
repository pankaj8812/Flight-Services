const express = require("express");

const { FlightController } = require("../../controllers");
const { FlightMiddlewares } = require("../../middlewares");

const router = express.Router();

// /api/v1/Flights POST
router.post("/", 
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);

// /api/v1/Flights GET
router.get("/", FlightController.getAllFlights);

// // /api/v1/Flights/:id GET
// router.get("/:id", FlightController.getFlight);

// // /api/v1/Flights/:id DELETE
// router.delete("/:id", FlightController.destroyFlight);

// // /api/v1/Flights/:id PATCH
// router.patch("/:id", 
//     FlightMiddlewares.validateUpdateRequest,
//     FlightController.updateFlight
// );


module.exports = router;