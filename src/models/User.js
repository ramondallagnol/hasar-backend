const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt')

class User extends Model {
    static init(sequelize){
        super.init({
            login: DataTypes.STRING,
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            position: DataTypes.STRING,
            image: DataTypes.STRING            
        }, {
            sequelize,
            hooks: {
                beforeCreate: async function(user, option) {
                    const salt = await bcrypt.genSalt(10);
                    const passwordHash = await bcrypt.hash(user.password, salt);
                    user.password = passwordHash;
                }
            },
            classMethods: {
                isValidPassword: async function(password){
                    console.log(password)
                    return await bcrypt.compare(password, user.password)
                }
            }
        });
    }
}

module.exports = User;