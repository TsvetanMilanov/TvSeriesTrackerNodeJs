'use strict';
let crypto = require('crypto');

module.exports = {
    createHash: function(text, key) {
        key = key || 'magic unicorns key';

        let hash = crypto.createHmac('sha1', key).update(text).digest('hex');

        return hash;
    }
};
