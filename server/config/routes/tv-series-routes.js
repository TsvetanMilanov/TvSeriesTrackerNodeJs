'use strict';
let express = require('express'),
    tvSeriesController = require('./../../controllers/tv-series-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/latest', tvSeriesController.getLatest)
        .get('/:id', tvSeriesController.getById)
        .get('/', tvSeriesController.getAll)
        .put('/:id', identity.requiresAuthentication(), tvSeriesController.editTvSeries)
        .delete('/unsubscribe/:id', identity.requiresAuthentication(), tvSeriesController.unsubscribeFromTvSeries)
        .delete('/:id', identity.requiresAuthentication(), tvSeriesController.deleteTvSeries)
        .post('/subscribe', identity.requiresAuthentication(), tvSeriesController.subscribeForTvSeries)
        .post('/', identity.requiresAuthentication(), tvSeriesController.createTvSeries);

    app.use('/api/tvSeries', router);
};
