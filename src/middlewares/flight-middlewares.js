const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { compareTime } = require("../utils/helpers/dateTime-helper");


function validateCreateRequest(req, res, next){
    // console.log("inside flight MiddleWare folder");
    if(!req.body.flightNumber){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["FlightNumber not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body. airplaneId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["airplaneId not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["DepartureAirportId not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["arrivalAirportId not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["departureTime not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["arrivalTime not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["price not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.totalSeat){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["totalSeat not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    
    if(compareTime(req.body.departureTime, req.body.arrivalTime)){
        ErrorResponse.message = "Something went wrong while creating flight";
        ErrorResponse.error = new AppError(["departure time is greater than arrival time in the incoming request"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    console.log('Middleware');
    next();
}

function validateUpdateSeatsRequest(req, res, next){
    if(!req.body.seats ){
        // console.log("Inside Middleware");
        ErrorResponse.message = "Something went wrong while updating airport";
        ErrorResponse.error = new AppError(["seats not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside flight MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateSeatsRequest
}