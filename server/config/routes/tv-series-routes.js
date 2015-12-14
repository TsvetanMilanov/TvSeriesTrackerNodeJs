'use strict';
let express = require('express'),
    tvSeriesController = require('./../../controllers/tv-series-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/:id', tvSeriesController.getById)
        .put('/:id', identity.requiresAuthentication(), tvSeriesController.editTvSeries)
        .delete('/unsubscribe/:id', identity.requiresAuthentication(), tvSeriesController.unsubscribeFromTvSeries)
        .delete('/:id', identity.requiresAuthentication(), tvSeriesController.deleteTvSeries)
        .get('/', tvSeriesController.getAll)
        .post('/subscribe', identity.requiresAuthentication(), tvSeriesController.subscribeForTvSeries)
        .post('/', identity.requiresAuthentication(), tvSeriesController.createTvSeries);

    app.use('/api/tvSeries', router);
};
