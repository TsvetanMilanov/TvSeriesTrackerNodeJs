/*globals $*/
'use strict';

(function() {
    $('#tabs a').click(function(e) {
        e.preventDefault();
        $(this).tab('show');
    });
}());
