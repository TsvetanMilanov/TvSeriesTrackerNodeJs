'use strict';
let express = require('express'),
    mongoose = require('mongoose');

module.exports = function(app) {
    let router = express.Router(),
        User = mongoose.model('User');

    router.get('/', function(req, res) {
        res.json({
            result: User.find({})
        });
    });

    app.use('/api/users', router);
};
