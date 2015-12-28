(function() {
    'use strict';

    function HomeController(identity) {
        var vm = this;
        vm.identity = identity;
    }

    angular.module('app')
        .controller('HomeController', ['identity', HomeController]);
}());
