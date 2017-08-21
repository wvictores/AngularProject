/*global alert, angular */
(function () {
    "use strict";
    //Using the "two-argument" call to module defines a module.  The second argument allows you to supply a list of other modules that you "inject" into this module.  Not going to bother with this for now.
    angular.module("myApp", ["storeProducts", "avatar", "ngRoute"]);
    //Using the "one-argument" call will fetch a previously defined module from the angular runtime.
    angular.module("myApp").controller("myController", ['$scope', '$http', 'AvatarFactory', function ($scope, $http, AvatarFactory) {
        $scope.Avatar = AvatarFactory;
        $http.get('products.json').then(function (result) {
            $scope.Model = result.data;
            
            $scope.Register = function () {
                firebase.auth().createUserWithEmailAndPassword($scope.email, $scope.password).catch(function (error) { //HandleErrorshere.
                    var errorCode = error.code;
                    var errorMessage = error.message; //...
                });
            }
            
            $scope.Login = function () {
                firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password).catch(function (error) { //HandleErrorshere.
                    var errorCode = error.code;
                    var errorMessage = error.message; //...
                });
            }
            
            $scope.Logout = function () {
                firebase.auth().signOut();
            }
            
            $scope.OnAuthStateChanged = firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    $scope.authenticated = true;
                    $scope.$apply();
                }
                else {
                    $scope.authenticated = false;
                    $scope.$apply();
                }
            });
        });
    }]);
    angular.module("myApp").config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        //$locationProvider.html5Mode(true);   
        $routeProvider.when("/", {
            templateUrl: "main.html"
        }).when("/page1", {
            templateUrl: "page1.html"
        }).when("/page2", {
            templateUrl: "page2.html"
            , controller: function () {}
        });
    }]);
    //This is a custom directive that I've defined, not something built into angular.  I can stitch the div into my code by putting <my-directive /> into a page, as long as it is a descendant of myApp.
    angular.module("myApp").directive("myDirective", function () {
        return {
            templateUrl: "myDirective.html"
        };
    });
}());