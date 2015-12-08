'use strict';
let express = require('express'),
    usersController = require('./../../controllers/users-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/', usersController.getAllUsers)
        .post('/', usersController.createUser)
        .put('/token', usersController.loginUser)
        .put('/:id', identity.requiresAuthentication(), usersController.editUser);

    app.use('/api/users', router);
};
