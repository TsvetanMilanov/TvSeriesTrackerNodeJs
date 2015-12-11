'use strict';
let express = require('express'),
    episodesController = require('./../../controllers/episodes-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/forTvSeries/:id', episodesController.getByTvSeriesId)
        .get('/:id', episodesController.getById)
        .get('/:tvSeriesId/:season/:number', episodesController.getByTvSeriesIdSeasonAndNumber)
        .get('/', identity.requiresAuthentication(), episodesController.getAll);

    app.use('/api/episodes', router);
};
