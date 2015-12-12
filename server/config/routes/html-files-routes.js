'use strict';
let express = require('express');

module.exports = function(app) {
    let router = express.Router();

    router.get('/partials/:area/:partialName', function(req, res) {
        res.redirect(`/partials/${req.params.area}/${req.params.partialName}.html`);
    });

    router.get('/', function(req, res) {
        res.render('index.html');
    });

    app.use('/', router);
};
