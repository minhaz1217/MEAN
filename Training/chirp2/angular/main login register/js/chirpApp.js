var app = angular.module("chirpApp", []) ;
app.controller("mainController", function($scope){
    $scope.posts = [];
    $scope.newPost = {created_by :'', text:'', created_at : ''};
    $scope.post = function(){
        $scope.newPost.created_at = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {created_by :'', text:'', created_at : ''};
    }
});

app.controller('authController', function($scope){
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';
  
    $scope.login = function(){
      //placeholder until authentication is implemented
      $scope.error_message = 'login request for ' + $scope.user.username;
    };
  
    $scope.register = function(){
      //placeholder until authentication is implemented
      $scope.error_message = 'registeration request for ' + $scope.user.username;
    };
  });