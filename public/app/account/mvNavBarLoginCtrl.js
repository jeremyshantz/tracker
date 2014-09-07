'use strict'

angular.module('app').controller('mvNavBarLoginCtrl', ['$scope', function($scope){

    $scope.signin = function(username, password){
        console.log('Signed in')
    };

}]);
