'use strict';
let express = require('express'),
    usersController = require('./../../controllers/users-controller');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/', usersController.getAllUsers)
        .post('/', usersController.createUser);

    app.use('/api/users', router);
};
