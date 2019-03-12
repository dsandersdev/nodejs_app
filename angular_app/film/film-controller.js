angular.module('myApp').controller('FilmCoontroller', FilmCoontroller);
function FilmCoontroller($http, $routeParams) {
        var vm = this;
        var id = $routeParams.id;
        $http.get('http://swapi-tpiros.rhcloud.com/films/' + id).then(function(response) {
                vm.file = response.data;
        });
        vm.bio = 'This is my bio';
}

