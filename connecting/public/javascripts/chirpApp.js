var app = angular.module("chirpApp", ['ngRoute', 'ngResource']).run(function($rootScope){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";
	$rootScope.signout = function(){
		$http.get('auth/signout');
		$rootScope.authenticated = false;
		$rootScope.current_user = "";
	}
});

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl : "main.html",
		controller: "mainController"
	})
	.when('/login', {
		templateUrl : "login.html",
		controller: "authController"
	})
	.when('/signup', {
		templateUrl : "register.html",
		controller: "authController"
	});
});


/*
// with factory and get all
app.factory('postService', function($http){
	var factory = {};
	factory.getAll = function(){
		return $http.get('/api/posts');
	}
	return factory;
})
*/
app.factory('postService', function($resource){
	return $resource('/api/posts/:id');
})


app.controller("mainController", function($scope, postService,$rootScope){

		$scope.posts = postService.query();
		$scope.newPost = {created_by: "", text : "", created_at : ""};
	/*
		// with factory and get all
    $scope.posts = [];
		$scope.newPost = {created_by :'', text:'', created_at : ''};
		
		postService.getAll().success(function(data){
			$scope.posts = data;
		});
		*/
    $scope.post = function(){
				$scope.newPost.created_by = $rootScope.current_user;
				$scope.newPost.created_at = Date.now();
				postService.save($scope.newPost, function(){
					$scope.posts = postService.query();
					$scope.newPost = {created_by :'', text:'', created_at : ''};
					
				});

    }
});

app.controller('authController', function($scope, $http, $rootScope, $location){
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';
	
    $scope.login = function(){
			$http.post('/auth/login', $scope.user).success(function(data){
				if(data.state == 'success'){
					$rootScope.authenticated = true;
					$rootScope.current_user = data.user.username;
					$location.path('/');
				}
				else{
					$scope.error_message = data.message;
				}
			});


      //placeholder until authentication is implemented
      $scope.error_message = 'login request for ' + $scope.user.username;
    };
  
    $scope.register = function(){
			$http.post('/auth/signup', $scope.user).success(function(data){
				if(data.state == 'success'){
					$rootScope.authenticated = true;
					$rootScope.current_user = data.user.username;
					$location.path('/');
				}
				else{
					$scope.error_message = data.message;
				}
			});

		};
  });