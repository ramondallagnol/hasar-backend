const express = require('express');
const multer = require('multer')

const EquipmentController = require('./controllers/EquipmentController');
const UserController = require('./controllers/UserController');
const BrandController = require('./controllers/BrandController');
const uploadConfig = require('./config/upload');

require('./db');

const routes = express.Router();
const upload = multer(uploadConfig);

//Equipments routes
routes.post('/equipments', EquipmentController.store);
routes.get('/equipments', EquipmentController.show);

//Users routes
routes.post('/users', upload.single('image'), UserController.store);
routes.post('/users/auth', UserController.auth);
routes.get('/users', UserController.getUserByToken);

//Brands routes
routes.post('/brands', BrandController.store);
routes.get('/brands', BrandController.index);
routes.delete('/brands/:brand_id', BrandController.delete);
routes.put('/brands/:brand_id', BrandController.update);

module.exports = routes;