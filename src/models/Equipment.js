const { Model, DataTypes } = require('sequelize');

class Equipment extends Model {
    static init(sequelize){
        super.init({
            description: DataTypes.STRING,
            barCode: DataTypes.STRING,
        }, {
            tableName: 'equipments',
            sequelize
        });
    }
}

module.exports = Equipment;