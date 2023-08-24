const { Sequelize} = require("sequelize");
const CrudRepository = require("./crud-repository");
const { Flight, Airplane, Airport, City } = require("../models");
const db = require("../models");
const { addRowLockOnFlight } = require("./queries");


class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }
    
    async getAllFlights(filter, sort){
        const flights = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail'
                },
                {
                    model: Airport,
                    required: true,
                    as: 'departureAirport',
                    on: {
                        col1: Sequelize.where( Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code")),
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    required: true,
                    as: 'arrivalAirport',
                    on: {
                        col1: Sequelize.where( Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code")),
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ]
        });
        return flights;
    }

    async  updateRemainingSeats(flightId, seats, dec = true){
        // console.log("inside REPO");
        await db.sequelize.query( addRowLockOnFlight(flightId));
        const flight = await Flight.findByPk(flightId);
        // console.log("FLight :", flight);
        // console.log(+dec);
        if(+dec){
            await flight.decrement('totalSeat' , {by: seats});
        }else{
            await flight.increment('totalSeat' , {by: seats});
        }
        return flight;
    }
}

module.exports = FlightRepository;