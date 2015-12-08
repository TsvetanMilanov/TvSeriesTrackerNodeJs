'use strict';
module.exports = {
    compareArrays: function(first, second) {

        if (first.length != second.length) {
            return false;
        }

        for (var i = 0; i < first.length; i++) {
            let firstElement = first[i];
            let secondElement = second[i];

            if (firstElement != secondElement) {
                return false;
            }
        }

        return true;
    },
    compareDates: function(first, second) {
        return first.toString() == second.toString();
    }
};
