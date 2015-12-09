'use strict';
let randomGenerator = require('./../../common/random-generator');

module.exports = {
    importTvSeries: function() {
        let promise = new Promise(function(resolve, reject) {
            let TvSeries = require('mongoose').model('TvSeries'),
                User = require('mongoose').model('User');

            TvSeries.find()
                .then(function(data) {
                    if (data.length <= 0) {
                        console.log('Adding Tv Series to database.');
                        
                        User.find({}, function(err, users) {
                            if (err) {
                                console.log(err);
                                reject(err);
                                return;
                            } else {
                                let usersCount = users.length,
                                    countOfTvSeriesToImport = 30,
                                    listOfTvSeriesToAdd = [];

                                for (let i = 0; i < countOfTvSeriesToImport; i++) {
                                    let currentTvSeries = {
                                        title: `TV series title #${i}`,
                                        rating: i % 10,
                                        releaseDate: randomGenerator.generateRandomDate(i),
                                        runtimeMinutes: i % 2 === 0 ? 40 : 20,
                                        authorId: users[i % usersCount]._id,
                                        description: `Default Tv Series description #${i}`
                                    };

                                    listOfTvSeriesToAdd.push(currentTvSeries);
                                }

                                TvSeries.create(listOfTvSeriesToAdd, function(err, data) {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                        return;
                                    }

                                    console.log('TV Series added to database!');
                                    resolve(data);
                                });
                            }
                        });
                    } else {
                        resolve();
                    }
                });
        });

        return promise;
    }
};
