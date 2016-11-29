(function(){
     
     var app = angular.module("githubViewer", [])
     
     var MainController = function($scope,$http,$interval) {


     var onUserComplete = function(response){
          $scope.user = response.data;
          $http.get($scope.user.repos_url).then(onRepos,onError);
     };

     var onRepos = function(response){
          
          $scope.repos = response.data;
     }

     var onError = function(reason){
          $scope.error = "Can't retrieve data."
     };
     
     var decrementCount = function(){
          
          $scope.countdown -= 1;
          
          if ($scope.countdown < 1){
               
               $scope.search($scope.username);
               
          }
     };
     
     var startCount = function(){
          
          $interval(decrementCount, 1000, $scope.countdown);
     };
     
     
     
     $scope.search = function(username){
          $http.get("https://api.github.com/users/" + username )
     .then(onUserComplete,onError);
     };
 
     $scope.username = "Angular";
     $scope.message = "Github Viewer";
     $scope.repoSortOrder = "-stargazers_count"
     $scope.countdown = 5;
     startCount();
     
     };

app.controller("MainController",MainController);

}());
