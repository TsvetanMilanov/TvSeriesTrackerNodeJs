'use strict';
let usersImporter = require('./users-importer');

module.exports = {
    seedInitialData: function(database, shouldSeedData) {
        if (!shouldSeedData) {
            return;
        }

        usersImporter.importUsers(database)
            .then(function() {
                console.log('Users added to database!');
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};
