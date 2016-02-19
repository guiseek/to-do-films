(function() {
    'use strict';
    
    angular
        .module('films')
        .controller('FilmController', FilmController);
    
    FilmController.$inject = ['FilmService'];
    
    function FilmController(FilmService) {
        var vm = this;
        vm.empty = {};
        
        vm.findAll = function() {
            FilmService.findAll().then(function(response) {
                vm.films = response.data;
            },function(error) {
                console.error(error);
            });
        }        
        vm.reset = function() {
            vm.film = angular.copy(vm.empty);
        }
        vm.populate = function(film) {
            vm.film = angular.copy(film);
        }
        vm.done = function(film) {
            FilmService.update(film).then(function(response) {
                console.log(response);
                vm.success = response.data;
                vm.findAll();
                vm.reset();
            },function(error) {
                console.error(error);
                vm.error = error.data;
            });
        }
        vm.remaining = function () {
            var count = 0;
            angular.forEach(vm.films, function (film) {
                count += film.done ? 0 : 1;
            });
            return count;
        };
        vm.save = function(film) {
            if (film._id) {
                FilmService.update(film).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                },function(error) {
                    console.log(error);
                    vm.error = error.data;
                });
            } else {
                FilmService.create(film).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                    vm.reset();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
        vm.remove = function(film) {
            if (confirm('Tem certeza que gostaria de remover o filme ' + film.name + '?')) {
                FilmService.remove(film._id).then(function(response) {
                    vm.success = response.data;
                    vm.findAll();
                }, function(error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
    }
})();