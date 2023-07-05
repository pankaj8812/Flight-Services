const { StatusCodes } = require('http-status-codes');

const { AirplaneRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try{
        console.log("inside airplaneServices folder");
        const airplane = await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        console.log("inside airplaneServices Error");
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirplane
}