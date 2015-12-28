'use strict';
let express = require('express'),
    episodesController = require('./../../controllers/episodes-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/latest', episodesController.getLatest)
        .get('/forTvSeries/:id', episodesController.getByTvSeriesId)
        .get('/:id', episodesController.getById)
        .get('/:tvSeriesId/:season/:number', episodesController.getByTvSeriesIdSeasonAndNumber)
        .get('/', identity.requiresAuthentication(), episodesController.getAll)
        .put('/:id', identity.requiresAuthentication(), episodesController.editEpisode)
        .delete('/:id', identity.requiresAuthentication(), episodesController.deleteEpisode)
        .post('/', identity.requiresAuthentication(), episodesController.createEpisode)
        .post('/setLastWatchedEpisode', identity.requiresAuthentication(), episodesController.setLastWatchedEpisode);

    app.use('/api/episodes', router);
};
