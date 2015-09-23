angular.module('1000Things', ['ui.router'])
	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('index', {
					url: '/index',
					templateUrl: '/index.html',
					controller: 'MainController'
				});
			$urlRouterProvider.otherwise('index');
		}
	])
	.controller('MainController', [
		'$scope',
		function($scope){
			return $scope;
		}
	]);