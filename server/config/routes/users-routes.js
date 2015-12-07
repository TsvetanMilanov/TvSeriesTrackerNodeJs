'use strict';
let express = require('express');

module.exports = function(app) {
    let router = express.Router();

    router.get('/', function(req, res) {
        res.json({
            msg: 'Success!'
        });
    });

    app.use('/api/users', router);
};
