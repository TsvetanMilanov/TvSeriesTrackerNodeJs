'use strict';
let express = require('express'),
    profileController = require('./../../controllers/profile-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/myTvSeriesWithNewEpisodes', identity.requiresAuthentication(), profileController.getMyTvSeriesWithNewEpisodes)
        .get('/myLastAiredEpisodes', identity.requiresAuthentication(), profileController.getMyLastAiredEpisodes)
        .get('/myTvSeries', identity.requiresAuthentication(), profileController.getMyTvSeries);

    app.use('/api/profile', router);
};
