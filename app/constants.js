(function() {
    'use strict';
    
    angular
        .module('app')
        .constant('API', {
            // url: 'https://api-to-do-films.herokuapp.com/api/'
            url: 'http://localhost:3000/api/',
            urlRemote: 'http://www.omdbapi.com/'
        });
})();