// chreate controllers
//
angular.module('myApp').controller('MyController', MyController).controller('AboutController', AboutController);

function MyController() {
	var vm = this;
	vm.name = 'Duane';

}
function AboutController() {
	var vm = this;
	vm.bio = 'This is my bio';
}
