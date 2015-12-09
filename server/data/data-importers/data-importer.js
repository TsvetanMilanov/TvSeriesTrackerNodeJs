'use strict';
let usersImporter = require('./users-importer'),
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
            })
            .catch(function(err) {
                console.log(err);
            });
    }
};
