'use strict';
let mongoose = require('mongoose'),
    Episode = mongoose.connection.model('Episode'),
    TvSeries = mongoose.connection.model('TvSeries'),
    UsersTvSeries = mongoose.connection.model('UsersTvSeries'),
    modelValidator = require('./../common/model-validator'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants'),
    tvSeriesHelper = require('./../common/tv-series-helper.js');

module.exports = {
    getAll: function(req, res) {
        TvSeries.find({}, function(err, tvSeries) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'No TV Series found!'
                    });
                return;
            }

            res.json(tvSeries);
        });
    },
    getById: function(req, res) {
        let id = req.params.id;
        TvSeries.findOne({
            _id: id
        }, function(err, tvSeries) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'No TV Series found!'
                    });
                return;
            }

            tvSeriesHelper.getLastAiredEpisodeForTvSeries(id)
                .then(function(episode) {
                    res.json({
                        tvSeries,
                        lastAiredEpisode: episode
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'Can\'t find last aired episode for this TV Series.'
                        });
                });

        });
    },
    createTvSeries: function(req, res) {
        let tvSeriesRequestModel = req.body;

        if (!modelValidator.isTvSeriesRequestModelValid(tvSeriesRequestModel)) {
            res.status(400)
                .json({
                    message: 'The TV Series information you have entered is not valid!'
                });

            return;
        }

        tvSeriesRequestModel.authorId = req.user._id;

        TvSeries.create(tvSeriesRequestModel, function(err, savedTvSeries) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'The TV Series information you have entered is not valid!'
                    });

                return;
            }

            res.status(201)
                .json(savedTvSeries);
        });
    },
    editTvSeries: function(req, res) {
        let tvSeriesRequestModel = req.body;

        if (!modelValidator.isTvSeriesRequestModelValid(tvSeriesRequestModel)) {
            res.status(400)
                .json({
                    message: 'The TV Series information you have entered is not valid!'
                });

            return;
        }

        TvSeries.findOne({
            _id: req.params.id
        }, function(err, tvSeries) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'The TV Series was not found!'
                    });

                return;
            }

            tvSeries.title = tvSeriesRequestModel.title || tvSeries.title;
            tvSeries.rating = tvSeriesRequestModel.rating || tvSeries.rating;
            tvSeries.releaseDate = tvSeriesRequestModel.releaseDate || tvSeries.releaseDate;
            tvSeries.runtimeMinutes = tvSeriesRequestModel.runtimeMinutes || tvSeries.runtimeMinutes;
            tvSeries.description = tvSeriesRequestModel.description || tvSeries.description;
            tvSeries.authorId = tvSeriesRequestModel.authorId || tvSeries.authorId;
            tvSeries.lastAiredEpisodeId = tvSeriesRequestModel.lastAiredEpisodeId || tvSeries.lastAiredEpisodeId;

            tvSeries.save(function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'The TV Series was not valid!'
                        });
                    return;
                }

                res.json(data);
            });
        });
    },
    deleteTvSeries: function(req, res) {
        let id = req.params.id;

        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(req.user, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to delete TV Series.'
                });

            return;
        }

        Episode.remove({
            tvSeriesId: id
        }, function(err) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'The information of the TV Series is invalid'
                    });
                return;
            }
        });

        TvSeries.remove({
            _id: id
        }, function(err) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'The information of the TV Series is invalid'
                    });
                return;
            }

            res.sendStatus(200);
        });
    },
    subscribeForTvSeries: function(req, res) {
        let tvSeriesId = req.body.tvSeriesId,
            userId = req.user._id;

        Episode.find({
                tvSeriesId: tvSeriesId
            })
            .sort('airDate')
            .exec(function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'Can\'t subscribe to this TV Series.'
                        });
                    return;
                }

                let firstEpisode = data[0];

                let subscribeModel = {
                    userId: userId,
                    tvSeriesId: tvSeriesId
                };

                if (firstEpisode) {
                    subscribeModel.lastWatchedEpisodeId = firstEpisode._id;
                }

                UsersTvSeries.create(subscribeModel, function(err, data) {
                    if (err) {
                        console.log(err);
                        res.status(400)
                            .json({
                                message: 'Can\'t subscribe to this TV Series.'
                            });
                        return;
                    }

                    res.json(data);
                });
            });
    },
    unsubscribeFromTvSeries: function(req, res) {
        let userId = req.user._id,
            tvSeriesId = req.params.id;

        UsersTvSeries.remove({
            userId: userId,
            tvSeriesId: tvSeriesId
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'Can\'t unsubscribe from this TV Series.'
                    });
                return;
            }

            res.json(data);
        });
    }
};
