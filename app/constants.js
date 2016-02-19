(function() {
    'use strict';
    
    angular
        .module('app')
        .constant('API', {
            url: 'https://api-to-do-films.herokuapp.com/api/'
        });
})();