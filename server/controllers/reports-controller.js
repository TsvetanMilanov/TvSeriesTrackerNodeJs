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

        Report.find()
            .then(function(response) {
                res.json(response);
            })
            .catch(function(err) {
                console.log(err);
                res.status(401)
                    .json(err);
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

        Report.find(filter)
            .then(function(reports) {
                res.json(reports);
            })
            .catch(function(err) {
                res.status(400)
                    .json({
                        message: 'The filter you entered was not in the correct format.',
                        error: err
                    });
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
                })
                .then(function(episode) {
                    if (!episode) {
                        res.status(400)
                            .json({
                                message: 'There is no episode with such id to report.'
                            });
                        return;
                    }

                    Report.create(requestModel)
                        .then(function(report) {
                            res.status(201)
                                .json(report);
                        })
                        .catch(function(err) {
                            res.status(400)
                                .json({
                                    message: 'Cannot create report!',
                                    error: err
                                });
                        });
                })
                .catch(function(err) {
                    res.status(400)
                        .json({
                            message: 'There is no episode with such id to report.',
                            error: err
                        });
                });
        } else {
            TvSeries.findOne({
                    _id: requestModel.tvSeriesId
                })
                .then(function(tvSeries) {
                    if (!tvSeries) {
                        res.status(400)
                            .json({
                                message: 'There is no TV Series with such id to report.'
                            });
                        return;
                    }

                    Report.create(requestModel)
                        .then(function(report) {
                            res.status(201)
                                .json(report);
                        })
                        .catch(function(err) {
                            res.status(400)
                                .json({
                                    message: 'Cannot create report!',
                                    error: err
                                });
                        });
                })
                .catch(function(err) {
                    res.status(400)
                        .json({
                            message: 'There is no TV Series with such id to report.',
                            error: err
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
            })
            .then(function(report) {
                if (!report) {
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
            })
            .catch(function(err) {
                res.status(400)
                    .json({
                        message: 'Cannot edit this report.',
                        error: err
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
            })
            .then(function(report) {
                if (!report) {
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
            })
            .catch(function(err) {
                res.send(400)
                    .json({
                        message: 'Cannot handle this report.',
                        erro: err
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
            })
            .then(function() {
                res.json({
                    message: 'Report deleted successfully.'
                });
            })
            .catch(function(err) {
                res.send(400)
                    .json({
                        message: 'Cannot delete this report.',
                        erro: err
                    });
            });
    }
};
