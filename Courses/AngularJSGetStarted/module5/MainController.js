// Code goes here

(function() {
  
  var app = angular.module("githubViewer");
  
  var MainController = function($scope, $interval,$location) {
    
    var countdownInterval = null;
    $scope.$on('$destroy', function () { $interval.cancel(countdownInterval); });

    $scope.search = function(username) {
            
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      
      $location.path("/user/" + username);
    };

    var decrementCountdown = function() {
      $scope.countdown -= 1;

      if ($scope.countdown < 1) {
        $scope.search($scope.username);
      }
    };

    var startCountdown = function() {

      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.username = "Angular";
    $scope.countdown = 10;
    startCountdown();
  };
  app.controller("MainController", MainController);
})();