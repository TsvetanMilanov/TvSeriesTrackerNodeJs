'use strict';
let mongoose = require('mongoose'),
    Episode = mongoose.connection.model('Episode'),
    identity = require('./../common/identity'),
    constants = require('./../common/constants');

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
    }
};
