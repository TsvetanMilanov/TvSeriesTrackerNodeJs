'use strict';
let mongoose = require('mongoose'),
    TvSeries = mongoose.connection.model('TvSeries'),
    Episode = mongoose.connection.model('Episode'),
    UsersTvSeries = mongoose.connection.model('UsersTvSeries'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants'),
    tvSeriesHelper = require('./../common/tv-series-helper.js');

module.exports = {
    getMyTvSeries: function(req, res) {
        UsersTvSeries.find({
            userId: req.user._id
        }, function(err, tvSeries) {
            let result = {};
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'Can\'t load the information for your TV Series.'
                    });
                return;
            }

            let tvSeriesIds = tvSeries.map(i => i.tvSeriesId),
                lastWatchedEpisodesIds = tvSeries.map(i => i.lastWatchedEpisodeId);

            TvSeries.find({
                _id: {
                    $in: tvSeriesIds
                }
            }, function(err, response) {
                if (err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'Can\'t load the information for the tv series.'
                        });
                    return;
                }

                result.allTvSeries = response;

                Episode.find({
                    _id: {
                        $in: lastWatchedEpisodesIds
                    }
                }, function(err, response) {
                    if (err) {
                        console.log(err);
                        res.status(400)
                            .json({
                                message: 'Can\'t load the information for the last watched episodes.'
                            });
                        return;
                    }

                    result.lastWatchedEpisodes = response;

                    res.json(result);
                });
            });
        });
    },
    getMyLastAiredEpisodes: function(req, res) {
        UsersTvSeries.find({
            userId: req.user._id
        }, function(err, tvSeries) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'Can\'t load the information for your TV Series.'
                    });
                return;
            }

            let tvSeriesIds = tvSeries.map(i => i.tvSeriesId);

            tvSeriesHelper.findLastAiredEpisodesForMultipleTvSeries(tvSeriesIds)
                .then(function(data) {
                    res.json(data);
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'Can\'t load the information for the last aired episodes for your TV Series.'
                        });
                });
        });
    }
};
