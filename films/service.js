(function() {
    'use strict';
    
    angular
        .module('films')
        .service('FilmService', FilmService);
    
    FilmService.$inject = ['API','$http'];
    
    function FilmService(API,$http) {
        this.findRemote = function(search) {
            var config = {
                params: {
                    s: search,
                    type: 'movie',
                    r: 'json'
                }
            }
            return $http.get(API.urlRemote, config);
        }
        this.findAll = function() {
            return $http.get(API.url + 'films');
        }
        this.create = function(film) {
            return $http.post(API.url + 'films', film);
        }
        this.like = function(film, who) {
            return $http.get(API.url + 'films/' + film._id + '/like/' + who);
        }
        this.update = function(film) {
            return $http.put(API.url + 'films/' + film._id, film);
        }
        this.archive = function() {
            return $http.delete(API.url + 'films');
        }
    }
})();