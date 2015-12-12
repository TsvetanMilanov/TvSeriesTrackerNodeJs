'use strict';
module.exports = {
    generateRandomDate: function(parameter) {
        return new Date(2015 - (parameter % 10), 11 - (parameter % 10), 28 - (parameter % 20));
    },
    generateRandomFloatNumber: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    generateRandomIntegerNumber: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};
