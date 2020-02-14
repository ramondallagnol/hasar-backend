const Sequelize = require('sequelize');
const dbConfig = require('../config/db');

const Equipment = require('../models/Equipment');
const User = require('../models/User');
const Brand = require('../models/Brand');

const connection = new Sequelize(dbConfig);

Equipment.init(connection);
User.init(connection);
Brand.init(connection);

module.exports = connection;