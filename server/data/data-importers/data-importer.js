'use strict';
let usersImporter = require('./users-importer');

module.exports = {
    seedInitialData: function(shouldSeedData) {
        if (!shouldSeedData) {
            return;
        }

        usersImporter.importUsers()
            .then(function() {
                console.log('Users added to database!');
            })
            .catch(function(error) {
                console.log(error);
            });
    }
};
