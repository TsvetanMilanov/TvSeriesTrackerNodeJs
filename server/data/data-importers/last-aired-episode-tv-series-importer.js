'use strict';
let randomGenerator = require('./../../common/random-generator'),
    mongoose = require('mongoose'),
    constants = require('./../../common/constants');

module.exports = {
    importLastAiredEpisodesToTvSeries: function() {
        let promise = new Promise(function(resolve, reject) {
            let Episode = mongoose.model('Episode'),
                TvSeries = mongoose.model('TvSeries'),
                promises = [];

            TvSeries.find({}, function(err, allTvSeries) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                if (allTvSeries[0].lastAiredEpisodeId) {
                    return;
                }

                console.log('Adding Last Aired Episodes to database.');
                for (let i = 0; i < allTvSeries.length; i++) {
                    let currentTvSeries = allTvSeries[i],
                        seasonNumberForLastAiredEpisode =
                        randomGenerator.generateRandomIntegerNumber(0, constants.SEASONS_PER_TV_SERIES_COUNT_FOR_SAMPLE_DATA - 1),
                        episodeNumberForLastAiredEpisode =
                        randomGenerator.generateRandomIntegerNumber(0, constants.EPISODES_PER_TV_SERIES_COUNT_FOR_SAMPLE_DATA - 1);

                    Episode.findOne({
                        seasonNumber: seasonNumberForLastAiredEpisode,
                        number: episodeNumberForLastAiredEpisode
                    }, function(err, episode) {
                        if (err) {
                            console.log(err);
                            reject(err);
                            return;
                        }

                        currentTvSeries.lastAiredEpisodeId = episode._id;

                        promises.push(currentTvSeries.save());
                    });
                }

                Promise.all(promises)
                    .then(function(data) {
                        console.log('Last Aired Episodes added to database.');
                        resolve(data);
                    })
                    .catch(function(err) {
                        reject(err);
                    });
            });

            return promise;
        });
    }
};
