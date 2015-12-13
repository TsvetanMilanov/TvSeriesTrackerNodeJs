'use strict';
let mongoose = require('mongoose'),
    TvSeries = mongoose.connection.model('TvSeries'),
    modelValidator = require('./../common/model-validator');

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

            res.json(tvSeries);
        });
    },
    createTvSeries: function(req, res) {
        let tvSeriesRequestModel = req.body;

        if (!modelValidator.isTvSeriesRequestModelValid(tvSeriesRequestModel)) {
            res.status(400)
                .json({
                    message: 'The TV Series was not valid!'
                });

            return;
        }

        tvSeriesRequestModel.authorId = req.user._id;

        TvSeries.create(tvSeriesRequestModel, function(err, savedTvSeries) {
            if (err) {
                console.log(err);
                res.status(400)
                    .json({
                        message: 'The TV Series was not valid!'
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
                    message: 'The TV Series was not valid!'
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
    }
};
