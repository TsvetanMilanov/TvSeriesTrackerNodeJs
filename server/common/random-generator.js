'use strict';
module.exports = {
    generateRandomDate: function(parameter) {
        return new Date(2015 - (parameter % 10), 11 - (parameter % 10), 28 - (parameter % 20));
    }
};
