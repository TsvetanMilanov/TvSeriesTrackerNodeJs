'use strict';
let randomGenerator = require('./../../common/random-generator'),
    mongoose = require('mongoose');

module.exports = {
    importUsersTvSeries: function() {
        let promise = new Promise(function(resolve, reject) {
            let Episode = mongoose.model('Episode'),
                TvSeries = mongoose.model('TvSeries'),
                User = mongoose.model('User'),
                UsersTvSeries = mongoose.model('UsersTvSeries'),
                usersTvSeriesToSave = [];

            UsersTvSeries.find({}, function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                if (data.length > 0) {
                    resolve(data);
                    return;
                }

                console.log('Adding Users-TvSeries to database.');
                User.find({}, function(err, users) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        return;
                    }

                    for (let i = 0; i < users.length; i++) {
                        let currentUser = users[i],
                            tvSeriesForUserCount = randomGenerator.generateRandomIntegerNumber(3, 7);

                        TvSeries.find({}, function(err, tvSeries) {
                            if (err) {
                                console.log(err);
                                reject(err);
                                return;
                            }

                            for (let j = 0; j < tvSeriesForUserCount; j++) {
                                let randomTvSeriesIndex = randomGenerator.generateRandomIntegerNumber(0, tvSeries.length - 1),
                                    currentTvSeries = tvSeries[randomTvSeriesIndex];

                                Episode.find({
                                    tvSeriesId: currentTvSeries._id
                                }, function(err, episodes) {
                                    if (err) {
                                        console.log(err);
                                        reject(err);
                                        return;
                                    }

                                    let randomEpisodeIndex = randomGenerator.generateRandomIntegerNumber(0, episodes.length - 1),
                                        currentEpisode = episodes[randomEpisodeIndex];

                                    usersTvSeriesToSave.push(new UsersTvSeries({
                                        userId: currentUser._id,
                                        tvSeriesId: currentTvSeries._id,
                                        lastWatchedEpisodeId: currentEpisode._id
                                    }).save());
                                });
                            }
                        });
                    }

                    Promise.all(usersTvSeriesToSave)
                        .then(function(data) {
                            console.log('Users-TVSeries added to database!');
                            resolve(data);
                        })
                        .catch(reject);
                });
            });
        });

        return promise;
    }
};
