'use strict';
let express = require('express'),
    mongooseConfig = require('./server/config/mongoose-config'),
    expressConfig = require('./server/config/express-config'),
    passportConfig = require('./server/config/passport-config'),
    routeConfig = require('./server/config/routes'),
    app = express(),
    port = 4000;

mongooseConfig.configure();
passportConfig.configure();
expressConfig.configure(app);
routeConfig.registerRoutes(app);

app.listen(port);
console.log(`Server running on port: ${port}`);
