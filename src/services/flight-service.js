const { StatusCodes } = require('http-status-codes');
const { FlightRespository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require('sequelize');

const flightRespository = new FlightRespository();

async function createFlight(data){
    try {
        const flight = flightRespository.create(data);
        return flight;
    } catch (error) {
        console.log(error);
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach( (err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query){
    let customFilter ={};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    if(query.trips){
        [ departureAirportId, arrivalAirportId ] = query.trips.split('-');

        if(departureAirportId == arrivalAirportId){
            throw new AppError('departureAirportId and arrvialAirportId cannot be same', StatusCodes.BAD_REQUEST);
        }
        
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }

    if(query.price){
        [minPrice, maxPrice ] = query.price.split('-');
        // console.log(minPrice, typeof(minPrice) );  // empty string value is 0 coercion

        customFilter.price = {
            [Op.between] : [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]   
        }
    }

    if(query.travellers){
        customFilter.totalSeat = {
            [Op.gte] : query.travellers
        }
    }

    if(query.tripDate)(
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    )
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }
    console.log(customFilter, sortFilter);
    try {
        const flights =  await flightRespository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(data){
    try {
        const flight = await flightRespository.get(data);
        return flight;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports ={
    createFlight,
    getAllFlights,
    getFlight,
}