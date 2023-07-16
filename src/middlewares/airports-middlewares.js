const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");


function validateCreateRequest(req, res, next){
    // console.log("inside Airplane MiddleWare folder");
    if(!req.body.name){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["Name not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["City Code not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["CityId not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next){
    if(!req.body.name && !req.body.code && !req.body.address && !req.body.cityId){
        ErrorResponse.message = "Something went wrong while updating airport";
        ErrorResponse.error = new AppError(["Name, Code, Address or cityId  are not found in the incoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
}