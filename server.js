'use strict';
let express = require('express'),
    expressConfig = require('./server/config/express-config'),
    routeConfig = require('./server/config/routes'),
    mongooseConfig = require('./server/config/mongoose-config'),
    app = express(),
    port = 4000;

expressConfig.configure(app);
mongooseConfig.configure();
routeConfig.registerRoutes(app);

app.listen(port);
console.log(`Server running on port: ${port}`);
