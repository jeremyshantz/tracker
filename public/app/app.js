var app = angular.module('app', [ 'ngResource', 'ngRoute']);

app.config([ '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main', controller: 'mainCtrl'});


}]);


app.controller('mainCtrl', ['$scope', function($scope){

    $scope.myVar = 'Hello, angular';

}]);

