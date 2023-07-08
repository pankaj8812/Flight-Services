const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");


function validateCreateRequest(req, res, next){
    // console.log("inside Airplane MiddleWare folder");
    if(!req.body.modelNumber){
        ErrorResponse.message = "Something went wrong while creating airplane";
        ErrorResponse.error = new AppError(["Model Number not found in the oncoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

function validateUpdateRequest(req, res, next){
    if(!req.body.modelNumber && !req.body.capacity){
        ErrorResponse.message = "Something went wrong while updating airplane";
        ErrorResponse.error = new AppError(["Model Number and capacity are not found in the oncoming request in the correct form"], StatusCodes.BAD_REQUEST);
        // console.log("inside Airplane MiddleWare Error");
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}


module.exports = {
    validateCreateRequest,
    validateUpdateRequest
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