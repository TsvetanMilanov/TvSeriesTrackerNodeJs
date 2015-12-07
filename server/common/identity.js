'use strict';
let passport = require('passport');

module.exports = {
    requiresAuthentication: function() {
        return passport.authenticate('bearer', {
            session: false
        });
    }
};
