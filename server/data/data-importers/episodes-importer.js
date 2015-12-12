'use strict';
let randomGenerator = require('./../../common/random-generator'),
    mongoose = require('mongoose'),
    constants = require('./../../common/constants');

module.exports = {
    importEpisodes: function() {
        let promise = new Promise(function(resolve, reject) {
            let Episode = mongoose.model('Episode'),
                TvSeries = mongoose.model('TvSeries'),
                User = mongoose.model('User'),
                episodesToSave = [];

            Episode.find({}, function(err, data) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                if (data.length <= 0) {
                    console.log('Adding Episodes to database.');

                    TvSeries.find({}, function(err, tvSeries) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }

                        User.find({}, function(err, users) {
                            if (err) {
                                console.log(err);
                                reject(err);
                                return;
                            }

                            for (let j = 0; j < tvSeries.length; j++) {
                                let currentUser = users[j % (users.length - 1)],
                                    currentTvSeries = tvSeries[j];

                                for (let k = 0; k < constants.SEASONS_PER_TV_SERIES_COUNT_FOR_SAMPLE_DATA; k++) {
                                    for (let l = 0; l < constants.EPISODES_PER_TV_SERIES_COUNT_FOR_SAMPLE_DATA; l++) {
                                        let episode = {
                                            title: `Episode title s${k}e${l}`,
                                            seasonNumber: k,
                                            number: l,
                                            airDate: randomGenerator.generateRandomDate(l),
                                            tvSeriesId: currentTvSeries._id,
                                            authorId: currentUser._id,
                                            description: `Episode description # s${k}e${l}`
                                        };

                                        episodesToSave.push(episode);
                                    }
                                }
                            }

                            Episode.create(episodesToSave, function(err, data) {
                                if (err) {
                                    console.log(err);
                                    reject(err);
                                    return;
                                }

                                console.log('Episodes added to database.');
                                resolve(data);
                            });
                        });
                    });
                } else {
                    resolve();
                }
            });
        });

        return promise;
    }
};
