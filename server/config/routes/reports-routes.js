'use strict';
let express = require('express'),
    reportsController = require('./../../controllers/reports-controller'),
    identity = require('./../../common/identity');

module.exports = function(app) {
    let router = express.Router();

    router
        .get('/filtered', identity.requiresAuthentication(), reportsController.getFiltered)
        .get('/', identity.requiresAuthentication(), reportsController.getAll)
        .get('/:id', identity.requiresAuthentication(), reportsController.getById)
        .post('/', identity.requiresAuthentication(), reportsController.createReport)
        .put('/handle/:id', identity.requiresAuthentication(), reportsController.handleReport)
        .put('/unhandle/:id', identity.requiresAuthentication(), reportsController.unhandleReport)
        .delete('/:id', identity.requiresAuthentication(), reportsController.deleteReport)
        .put('/', identity.requiresAuthentication(), reportsController.editReport);

    app.use('/api/reports', router);
};
