const { Model, DataTypes } = require('sequelize');

class Brand extends Model {
    static init(sequelize){
        super.init({
            description: DataTypes.STRING,
        }, {
            tableName: 'brands',
            sequelize
        });
    }
}

module.exports = Brand;