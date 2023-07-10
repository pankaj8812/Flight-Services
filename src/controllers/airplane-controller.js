const { StatusCodes } = require("http-status-codes");
const {AirplaneService} = require("../services");
const { SuccessResponse, ErrorResponse } = require("../utils/common");


/**
 * POST : /airplanes 
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */

async function createAirplane(req, res){
    try {
        console.log(req.body);
        // console.log("inside Airplane Controller folder");
        const airplane = await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.CREATED)
                   .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        // console.log("inside Airplane Controller Error");
        // console.log("inside  Airplane Controller Error: ", error.name, error.message, error.explanation);
        // console.log("Errorresponse :", ErrorResponse);
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * GET : /airplanes
 * req-body {}
 */

async function getAirplanes(req, res){
    try{
        const airplanes = await AirplaneService.getAirplanes();
        SuccessResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }

}

/**
 * GET : /airplanes/:id 
 * req-body {}
 */

async function getAirplane(req, res){
    try {
        const airplane = await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE : /airplanes/:id
 * req-body {}
 */

async function destroyAirplane(req, res){
    try {
        const airplane = await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * PATCH : /airplanes/:id
 * req-body {modelNumber: 'airbus320', capacity: 200}
 */

async function updateAirplane(req, res){
    try {
        const airplane = await AirplaneService.updateAirplane(req.params.id,{
            modelNumber: req.body.modelNumber,
            capacity: req.body.capacity
        });
        SuccessResponse.data = airplane;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        return res.status(error.statusCode).json(ErrorResponse);  
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}








// {
//     "success": false,
//     "message": "Something went wrong",
//     "data": {},
//     "error": {
//         "statusCode": 400,
//         "explanation": [
//             "Validation isAlphanumeric on modelNumber failed"
//         ]
//     }
// }

// const error = {
//     success: false,
//     message: 'Something went wrong',
//     data: {},
//     error: {}
// }