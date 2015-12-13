'use strict';
let mongoose = require('mongoose'),
    Episode = mongoose.connection.model('Episode'),
    UsersTvSeries = mongoose.connection.model('UsersTvSeries'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants'),
    modelValidator = require('./../common/model-validator');

module.exports = {
    getAll: function(req, res) {
        if (identity.isAuthorizedForRole(constants.ADMIN_ROLE) ||
            identity.isAuthorizedForRole(constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to get this information!'
                });

            return;
        }

        Episode.find({}, function(err, episodes) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'Episodes not found!'
                    });
                return;
            }

            res.json(episodes);
        });
    },
    getById: function(req, res) {
        Episode.findOne({
            _id: req.params.id
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'Episode not found!'
                    });
                return;
            }

            res.json(data);
        });
    },
    getByTvSeriesId: function(req, res) {
        Episode.find({
            tvSeriesId: req.params.id
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'Episode not found!'
                    });
                return;
            }

            res.json(data);
        });
    },
    getByTvSeriesIdSeasonAndNumber: function(req, res) {
        let id = req.params.tvSeriesId,
            season = req.params.season,
            number = req.params.number;
        Episode.findOne({
            tvSeriesId: id,
            seasonNumber: season,
            number: number
        }, function(err, episode) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'No TV Series found!'
                    });
                return;
            }

            res.json(episode);
        });
    },
    createEpisode: function(req, res) {
        let episodeRequestModel = req.body;

        if (!modelValidator.isEpisodeRequestModelValid(episodeRequestModel)) {
            res.status(401)
                .json({
                    message: 'The information of the episode is invalid'
                });

            return;
        }

        episodeRequestModel.authorId = req.user._id;

        Episode.create(episodeRequestModel, function(err, data) {
            if (err) {
                res.status(401)
                    .json({
                        message: 'The information of the episode is invalid'
                    });

                return;
            }

            res.status(201)
                .json(data);
        });
    },
    editEpisode: function(req, res) {
        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(req.user, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to edit episodes.'
                });

            return;
        }

        let episodeRequestModel = req.body;

        if (!modelValidator.isEpisodeRequestModelValid(episodeRequestModel)) {
            res.status(400)
                .json({
                    message: 'The information of the episode is invalid'
                });

            return;
        }

        Episode.findOne({
            _id: req.params.id
        }, function(err, episode) {
            if (err) {
                console.log(err);
                res.status(404)
                    .json({
                        message: 'Episode not found.'
                    });
                return;
            }

            episode.title = episodeRequestModel.title || episode.title;
            episode.seasonNumber = episodeRequestModel.seasonNumber || episode.seasonNumber;
            episode.number = episodeRequestModel.number || episode.number;
            episode.airDate = episodeRequestModel.airDate || episode.airDate;
            episode.description = episodeRequestModel.description || episode.description;
            episode.authorId = episodeRequestModel.authorId || episode.authorId;
            episode.tvSeriesId = episodeRequestModel.tvSeriesId || episode.tvSeriesId;

            episode.save(function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(400)
                        .json({
                            message: 'The information of the episode is invalid'
                        });
                    return;
                }

                res.json(data);
            });
        });
    },
    deleteEpisode: function(req, res) {
        if (!identity.isAuthorizedForRole(req.user, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(req.user, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to delete episodes.'
                });

            return;
        }

        Episode.remove({
            _id: req.params.id
        }, function(err) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'The information of the episode is invalid'
                    });
                return;
            }

            res.sendStatus(200);
        });
    },
    setLastWatchedEpisode: function(req, res) {
        let tvSeriesId = req.body.tvSeriesId,
            episodeId = req.body.episodeId;

        UsersTvSeries.findOne({
            userId: req.user._id,
            tvSeriesId: tvSeriesId
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'Can\'t load the information for the TV Series with last watched episode.'
                    });
                return;
            }

            if (!data) {
                UsersTvSeries.create({
                    userId: req.user._id,
                    tvSeriesId: tvSeriesId,
                    lastWatchedEpisodeId: episodeId
                }, function(err, createdItem) {
                    if (err) {
                        console.log(err);
                        res.status(400)
                            .json({
                                message: 'Can\'t create new item to the Users - TV Series table.'
                            });
                        return;
                    }

                    res.json(createdItem);
                    return;
                });
            } else {
                data.lastWatchedEpisodeId = episodeId;

                data.save(function(err, editedItem) {
                    if (err) {
                        console.log(err);
                        res.status(400)
                            .json({
                                message: 'Can\'t edit the item in the Users - TV Series table.'
                            });
                        return;
                    }

                    res.json(editedItem);
                });
            }
        });
    }
};
