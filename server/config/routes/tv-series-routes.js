'use strict';
let express = require('express'),
    tvSeriesController = require('./../../controllers/tv-series-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/:id', tvSeriesController.getById)
        .get('/', identity.requiresAuthentication(), tvSeriesController.getAll);

    app.use('/api/tvSeries', router);
};
