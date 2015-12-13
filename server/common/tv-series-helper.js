'use strict';
let Episode = require('mongoose').model('Episode');

function getLastAiredEpisodeForTvSeries(id) {
    let promise = new Promise(function(resolve, reject) {
        Episode.find({
                tvSeriesId: id,
                airDate: {
                    $lte: new Date(Date.now())
                }
            })
            .sort({
                airDate: -1
            })
            .exec(function(err, episodes) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(episodes[0]);
            });
    });

    return promise;
}
module.exports = {
    getLastAiredEpisodeForTvSeries: getLastAiredEpisodeForTvSeries,
    findLastAiredEpisodesForMultipleTvSeries: function(ids) {
        let promises = [],
            promise = new Promise(function(resolve, reject) {
                ids.forEach(function(id) {
                    promises.push(getLastAiredEpisodeForTvSeries(id));
                });

                Promise.all(promises)
                    .then(resolve)
                    .catch(reject);
            });

        return promise;
    }
};
