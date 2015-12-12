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
            res.status(401)
                .json({
                    message: 'The TV Series was not valid!'
                });

            return;
        }

        tvSeriesRequestModel.authorId = req.user._id;

        TvSeries.create(tvSeriesRequestModel, function(err, savedTvSeries) {
            if (err) {
                console.log(err);
                res.status(401)
                    .json({
                        message: 'The TV Series was not valid!'
                    });

                return;
            }

            res.status(201)
                .json(savedTvSeries);
        });
    }
};
