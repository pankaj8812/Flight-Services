const { Logger } = require("../config");

class CrudRepository{
    constructor(model){
        this.model = model;
    }

    async create(data){    
        try{
            console.log("inside Repo create folder");
            const response = await this.model.create(data);
            return response;
        }catch(error){
            console.log(error);
            console.log("inside Airplane Repo Error");
            Logger.error("Something went wrong in the Crud Repo: Create");
            throw error;
        }
        
    }
  
    async destory(data){
        try{
            const response = await this.model.destory({
                where: {
                    id: data
                }
            });
            return response;
        } catch(error){
            Logger.error("Something went wrong in the Crud Repo: destory");
            throw error;
        }
    }

    async get(data){
        try {
            const response = await this.model.findByPk(data);
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud Repo: get");
            throw error;
        }
    }

    async getAll(data){
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud Repo: getAll");
            throw error;
        }
    }

    async update(id, data){
        try {
            const response = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return response;
        } catch (error) {
            Logger.error("Something went wrong in the Crud Repo: Update");
            throw error;
        }
    }

}

module.exports = CrudRepository;