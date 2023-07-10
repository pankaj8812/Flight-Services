const CrudRepository = require("./crud-repository");
const {City} = require('../models');

class CityRespository extends CrudRepository{
    constructor(){
        super(City);
    }
    
}

module.exports = CityRespository;