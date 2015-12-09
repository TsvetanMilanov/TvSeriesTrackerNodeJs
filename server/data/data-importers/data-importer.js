'use strict';
let usersImporter = require('./users-importer'),
    episodesImporter = require('./episodes-importer'),
    tvSeriesImporter = require('./tv-series-importer');

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
            .catch(function(err) {
                console.log(err);
            });
    }
};
