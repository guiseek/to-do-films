(function () {
    'use strict';

    angular
        .module('films')
        .controller('FilmController', FilmController);

    FilmController.$inject = ['$scope','FilmService'];

    function FilmController($scope,FilmService) {
        var vm = this;
        vm.empty = {};

        vm.searchFilmsRemote = function (search) {
            FilmService.findRemote(search).then(function (response) {
                vm.results = response.data;
                console.log(vm.results);
            }, function (error) {
                console.error(error);
            });
        }
        vm.populate = function (result) {
            vm.film = { name: result.Title };
            vm.results = [];
            document.querySelector('#description').focus();
        }
        vm.findAll = function () {
            FilmService.findAll().then(function (response) {
                vm.films = response.data;
            }, function (error) {
                console.error(error);
            });
        }
        vm.reset = function () {
            vm.film = angular.copy(vm.empty);
        }
        vm.done = function (film) {
            FilmService.update(film).then(function (response) {
                vm.success = response.data;
                vm.findAll();
            }, function (error) {
                console.error(error);
                vm.error = error.data;
            });
        }
        vm.like = function (film, who) {
            FilmService.like(film, who).then(function (response) {
                vm.success = response.data;
                vm.findAll();
            }, function (error) {
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
        }
        vm.create = function (film) {
            FilmService.create(film).then(function (response) {
                vm.success = response.data;
                vm.findAll();
                vm.reset();
            }, function (error) {
                console.error(error);
                vm.error = error.data;
            });
        }
        vm.archive = function () {
            if (confirm('Tem certeza que gostaria de remover os ' + (vm.films.length - vm.remaining()) + ' filmes marcados como assistidos?')) {
                FilmService.archive().then(function (response) {
                    vm.success = response.data;
                    vm.findAll();
                }, function (error) {
                    console.error(error);
                    vm.error = error.data;
                });
            }
        }
    }
})();