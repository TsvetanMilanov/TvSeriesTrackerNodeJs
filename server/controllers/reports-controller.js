'use strict';
let url = require('url'),
    mongoose = require('mongoose'),
    TvSeries = mongoose.connection.model('TvSeries'),
    Episode = mongoose.connection.model('Episode'),
    Report = mongoose.connection.model('Report'),
    constants = require('./../common/constants'),
    identity = require('./../common/identity'),
    modelValidator = require('./../common/model-validator');

module.exports = {
    getAll: function(req, res) {
        let currentUser = req.user;

        if (!identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE)) {
            res.status(401)
                .json({
                    message: 'You are not authorized to get this information.'
                });
            return;
        }

        Report.find({}, function(err, response) {
            if (err) {
                console.log(err);
                res.status(401)
                    .json(err);
                return;
            }
            res.json(response);
        });
    },
    getFiltered: function(req, res) {
        let currentUser = req.user,
            parts = url.parse(req.url, true),
            filter = parts.query;

        if (!identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE)) {
            res.status(400)
                .json({
                    message: 'You are not authorized to get this information.'
                });
            return;
        }

        Report.find(filter, function(err, reports) {
            if (err) {
                res.status(400)
                    .json({
                        message: 'The filter you entered was not in the correct format.',
                        error: err
                    });
                return;
            }

            res.json(reports);
        });
    },
    createReport: function(req, res) {
        let currentUser = req.user,
            requestModel = req.body;

        if (!modelValidator.isReportCreateRequestModelValid(requestModel)) {
            res.status(400)
                .json({
                    message: 'The report information id not valid.'
                });
            return;
        }

        requestModel.authorId = currentUser._id;
        requestModel.createdOn = new Date(Date.now());
        requestModel.isHandled = false;

        if (requestModel.type == constants.REPORT_TYPE_EPISODE) {
            Episode.findOne({
                _id: requestModel.episodeId
            }, function(err, episode) {
                if (!err || !episode) {
                    res.status(400)
                        .json({
                            message: 'There is no episode with such id to report.'
                        });
                    return;
                }

                Report.create(requestModel, function(err, report) {
                    if (err) {
                        res.status(400)
                            .json({
                                message: 'Cannot create report!',
                                error: err
                            });
                        return;
                    }
                    res.status(201)
                        .json(report);
                });
            });
        } else {
            TvSeries.findOne({
                _id: requestModel.tvSeriesId
            }, function(err, tvSeries) {
                if (err || !tvSeries) {
                    res.status(400)
                        .json({
                            message: 'There is no TV Series with such id to report.'
                        });
                    return;
                }

                Report.create(requestModel, function(err, report) {
                    if (err) {
                        res.status(400)
                            .json({
                                message: 'Cannot create report!',
                                error: err
                            });
                        return;
                    }
                    res.status(201)
                        .json(report);
                });
            });
        }
    },
    editReport: function(req, res) {
        let currentUser = req.user,
            requestModel = req.body,
            id = req.params.id;

        if (!identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE)) {
            res.status(400)
                .json({
                    message: 'You are not authorized to get this information.'
                });
            return;
        }

        if (!modelValidator.isReportEditRequestModelValid(requestModel)) {
            res.status(400)
                .json({
                    message: 'The report information id not valid.'
                });
            return;
        }

        Report.findOne({
            _id: id
        }, function(err, report) {
            if (err || !report) {
                res.status(404)
                    .json({
                        message: 'Cannot edit this report.'
                    });

                return;
            }

            report.description = requestModel.description || report.description;
            report.createdOn = requestModel.createdOn || report.createdOn;
            report.authorId = requestModel.authorId || report.authorId;
            report.type = requestModel.type || report.type;
            report.episodeId = requestModel.episodeId || report.episodeId;
            report.tvSeriesId = requestModel.tvSeriesId || report.tvSeriesId;
            report.importance = requestModel.importance || report.importance;

            report.save(function(err, savedReport) {
                if (err) {
                    res.send(400)
                        .json({
                            message: 'Cannot edit this report.',
                            erro: err
                        });
                    return;
                }

                res.json(savedReport);
            });
        });
    },
    handleReport: function(req, res) {
        let currentUser = req.user,
            id = req.params.id;

        if (!identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE)) {
            res.status(400)
                .json({
                    message: 'You are not authorized to get this information.'
                });
            return;
        }

        Report.findOne({
            _id: id
        }, function(err, report) {
            if (err || !report) {
                res.status(404)
                    .json({
                        message: 'There is no report with such id.'
                    });
                return;
            }

            report.isHandled = true;
            report.save(function(err) {
                if (err) {
                    res.send(400)
                        .json({
                            message: 'Cannot handle this report.',
                            erro: err
                        });
                    return;
                }

                res.json({
                    message: 'Report was handled successfully.'
                });
            });
        });
    },
    deleteReport: function(req, res) {
        let currentUser = req.user,
            id = req.params.id;

        if (!identity.isAuthorizedForRole(currentUser, constants.ADMIN_ROLE) &&
            !identity.isAuthorizedForRole(currentUser, constants.MODERATOR_ROLE)) {
            res.status(400)
                .json({
                    message: 'You are not authorized to get this information.'
                });
            return;
        }

        Report.remove({
            _id: id
        }, function(err) {
            if (err) {
                res.send(400)
                    .json({
                        message: 'Cannot delete this report.',
                        erro: err
                    });
                return;
            }

            res.json({
                message: 'Report deleted successfully.'
            });
        });
    }
};
