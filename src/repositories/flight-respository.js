const CrudRepository = require("./crud-repository");
const { flight } = require("../models");

class FlightRepository extends CrudRepository{
    constructor(){
        super(flight);
    }
    
}

module.exports = FlightRepository;