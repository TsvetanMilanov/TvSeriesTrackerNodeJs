'use strict';
let mongoose = require('mongoose'),
    modelsLoader = require('./../data/models'),
    dataImporter = require('./../data/data-importers/data-importer');

module.exports = {
    configure: function() {
        let connectionString = 'mongodb://localhost:27017/TvSeriesTracker',
            shouldSeedData = true,
            database;

        mongoose.connect(connectionString);
        database = mongoose.connection;
        modelsLoader.loadModels();

        database.once('open', function() {
            console.log('Database is running!');
            dataImporter.seedInitialData(database, shouldSeedData);
        });
    }
};
