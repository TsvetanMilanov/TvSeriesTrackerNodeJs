'use strict';
let mongoose = require('mongoose'),
    TvSeries = mongoose.connection.model('TvSeries');

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
    }
};
