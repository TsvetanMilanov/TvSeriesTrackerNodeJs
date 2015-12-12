'use strict';
let usersImporter = require('./users-importer'),
    episodesImporter = require('./episodes-importer'),
    tvSeriesImporter = require('./tv-series-importer'),
    lasAiredEpisodeTvSeriesImporter = require('./last-aired-episode-tv-series-importer'),
    usersTvSeriesImporter = require('./users-tv-series-importer');

module.exports = {
    seedInitialData: function(shouldSeedData) {
        if (!shouldSeedData) {
            return;
        }

        usersImporter.importUsers()
            .then(function() {
                return tvSeriesImporter.importTvSeries();
            })
            .then(function() {
                return episodesImporter.importEpisodes();
            })
            .then(function() {
                return lasAiredEpisodeTvSeriesImporter.importLastAiredEpisodesToTvSeries();
            })
            .then(function() {
                return usersTvSeriesImporter.importUsersTvSeries();
            })
            .catch(function(err) {
                console.log(err);
            });
    }
};
