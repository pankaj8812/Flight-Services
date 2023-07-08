const express = require("express");
const airplaneRoutes = require("./airplane-routes");

const router = express.Router();
// console.log("inside routes folder V1");

router.use("/airplanes", airplaneRoutes);

module.exports = router;