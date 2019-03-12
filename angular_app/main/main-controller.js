angular.module('myApp').controller('MainController', MainController);
function MainController($http) {
        var vm = this;
        $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(response) {
                vm.films = response.data;
        });
        vm.name = 'Duane';
}

