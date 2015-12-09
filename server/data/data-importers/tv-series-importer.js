'use strict';

module.exports = {
    importTvSeries: function() {
        let promise = new Promise(function(resolve, reject) {
            let TvSeries = require('mongoose').model('TvSeries'),
                User = require('mongoose').model('User');

            TvSeries.find()
                .then(function(data) {
                    if (data.length <= 0) {
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
                                        releaseDate: new Date(2015 - (i % 10), 11 - (i % 10), 28 - (i % 20)),
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
