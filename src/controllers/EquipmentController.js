const Equipment = require('../models/Equipment');

module.exports = {
    async index(req, res){
        const equipments = await Equipment.findAll();
        return res.json( equipments );
    },
    async store(req, res){
        const { description, barCode } = req.body;
        
        const equipment = await Equipment.create({description, barCode});

        return res.json(equipment);
    },
    async show(req, res){
        const equipments = await Equipment.findAll();
        return res.json( equipments );
    }
};