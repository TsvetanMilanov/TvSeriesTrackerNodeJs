'use strict';
let bodyParser = require('body-parser'),
    ejs = require('ejs'),
    viewsPath = `${__dirname}/../../public`;

module.exports = {
    configure: function(app) {
        app.use(bodyParser.json());
        app.set('views', viewsPath);
        app.engine('html', ejs.renderFile);
    }
};
