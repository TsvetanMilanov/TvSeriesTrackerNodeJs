'use strict';
let mongoose = require('mongoose'),
    TvSeries = mongoose.connection.model('TvSeries'),
    Episode = mongoose.connection.model('Episode'),
    UsersTvSeries = mongoose.connection.model('UsersTvSeries'),
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
    },
    getMyTvSeriesWithNewEpisodes: function(req, res) {
        UsersTvSeries.find({
                userId: req.user._id
            })
            .populate('lastWatchedEpisodeId')
            .select({
                lastWatchedEpisodeId: 1,
                tvSeriesId: 1
            })
            .exec(function(err, result) {
                if (err) {
                    console.log(err);
                    res.status(400)
                        .json('Can\'t load the information of your TV Series.');
                    return;
                }

                let resultTvSeriesIds = [];

                tvSeriesHelper.findLastAiredEpisodesForMultipleTvSeries(result.map(r => r.tvSeriesId))
                    .then(function(lastAiredEpisodes) {
                        lastAiredEpisodes.forEach(function(episode) {
                            let currentLastWatchedEpisode = {};

                            result.forEach(function(lastWatchedEpisode) {
                                if (lastWatchedEpisode.tvSeriesId.toString() == episode.tvSeriesId.toString()) {
                                    currentLastWatchedEpisode = lastWatchedEpisode.lastWatchedEpisodeId;
                                }
                            });

                            if (currentLastWatchedEpisode._id.toString() != episode._id.toString()) {
                                resultTvSeriesIds.push(episode.tvSeriesId);
                            }
                        });

                        TvSeries.find({
                            _id: {
                                $in: resultTvSeriesIds
                            }
                        }, function(err, data) {
                            if (err) {
                                console.log(err);
                                res.status(400)
                                    .json('Can\'t load the information of your TV Series.');
                                return;
                            }

                            res.json(data);
                        });
                    })
                    .catch(function(err) {
                        console.log(err);
                        res.status(400)
                            .json('Can\'t load the information of your TV Series.');
                        return;
                    });
            });
    }
};
