'use strict';
let express = require('express'),
    bodyParser = require('body-parser'),
    ejs = require('ejs'),
    enableCors = require('./utilities/cors-service'),
    viewsPath = `${__dirname}/../../public/views`;

module.exports = {
    configure: function(app) {
        app.use(bodyParser.json());
        app.use(enableCors);
        app.set('views', viewsPath);
        app.engine('html', ejs.renderFile);
        app.use(express.static(__dirname + '/../../public/'));
    }
};
