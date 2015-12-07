'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    viewsPath = `${__dirname}/../../public`;

module.exports = {
    configure: function(app) {
        app.use(bodyParser.json());
        app.set('views', viewsPath);
        app.engine('html', ejs.renderFile);
        app.use(express.static(__dirname + '/public/partials'));
    }
};
