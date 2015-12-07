'use strict';
let express = require('express'),
    expressConfig = require('./server/config/express-config'),
    routeConfig = require('./server/config/routes'),
    app = express(),
    port = 4000;

expressConfig.configure(app);
routeConfig.registerRoutes(app);

app.listen(port);
console.log(`Server running on port: ${port}`);
