'use strict';
let Episode = require('mongoose').model('Episode');

module.exports = {
    getLastAiredEpisodeForTvSeries: function(id) {
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
};
