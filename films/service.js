(function() {
    'use strict';
    
    angular
        .module('films')
        .service('FilmService', FilmService);
    
    FilmService.$inject = ['API','$http'];
    
    function FilmService(API,$http) {
        this.findAll = function() {
            return $http.get(API.url + 'films');
        }
        this.create = function(film) {
            return $http.post(API.url + 'films', film);
        }
        this.update = function(film) {
            return $http.put(API.url + 'films/' + film._id, film);
        }
        this.archive = function() {
            return $http.delete(API.url + 'films/archive');
        }
    }
})();