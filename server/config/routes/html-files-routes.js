'use strict';
let express = require('express');

module.exports = function(app) {
    let router = express.Router();

    router.get('/partials/:partialName', function(req, res) {
        res.redirect(`/partials/${req.params.partialName}.html`);
    });

    router.get('/', function(req, res) {
        res.render('index.html');
    });

    app.use('/', router);
};
