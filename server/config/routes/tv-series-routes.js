'use strict';
let express = require('express'),
    tvSeriesController = require('./../../controllers/tv-series-controller');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/:id', tvSeriesController.getById)
        .get('/', tvSeriesController.getAll);

    app.use('/api/tvSeries', router);
};
