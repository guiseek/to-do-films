(function() {
    'use strict';
    
    angular
        .module('films')
        .config(Config);
    
    function Config($routeProvider) {
        $routeProvider
            .when('/films', {
                templateUrl: 'films/films.html',
                controller: 'FilmController',
                controllerAs: 'vm'
            });
    }
})();