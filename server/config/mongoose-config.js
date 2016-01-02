/*globals process*/
'use strict';
let mongoose = require('mongoose'),
    modelsLoader = require('./../data/models'),
    dataImporter = require('./../data/data-importers/data-importer'),
    env = process.env.NODE_ENV || 'development';

module.exports = {
    configure: function() {
        let connectionString = 'mongodb://localhost:27017/TvSeriesTracker',
            shouldSeedData = true,
            database;

        if (env === 'development') {
            connectionString = 'mongodb://localhost:27017/TvSeriesTracker';
        } else {
            connectionString = process.env.PRODUCTION_DB_CONNECTION_STRING;
            shouldSeedData = false;
        }

        modelsLoader.loadModels();
        mongoose.connect(connectionString);
        database = mongoose.connection;

        database.once('open', function() {
            console.log('Database is running!');
            dataImporter.seedInitialData(shouldSeedData);
        });
    }
};
