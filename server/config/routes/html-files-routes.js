'use strict';
let express = require('express');

module.exports = function(app) {
    let router = express.Router();

    router.get('/views/partials/:area/:partialName', function(req, res) {
        res.redirect(`/views/partials/${req.params.area}/${req.params.partialName}.html`);
    });

    router.get('/views/directives/:area/:directiveName', function(req, res) {
        res.redirect(`/views/directives/${req.params.area}/${req.params.directiveName}.html`);
    });

    router.get('/', function(req, res) {
        res.render('index.html');
    });

    app.use('/', router);
};
