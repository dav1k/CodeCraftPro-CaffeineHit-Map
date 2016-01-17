/**
 * Created by Dave on 1/17/16.
 */
var app = angular.module('caffeinehit.controllers', []);

app.controller('YelpCtrl', function ($scope, YelpService) {
  $scope.yelp = YelpService;

  // doRefresh
  $scope.doRefresh = function () {
    if (!$scope.yelp.isLoading) {
      $scope.yelp.refresh().then(function () {
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  }

  // loadMore
  $scope.loadMore = function () {
    console.log('loadMore');

    if (!$scope.yelp.isLoading && $scope.yelp.hasMore) {
      $scope.yelp.next().then(function () {
        $scope.$broadcast('scroll.infiniteScrollComplete');
      });
    }
  };

  // getDirections
  $scope.getDirections = function (cafe) {
    console.log('Getting directions for cafe');

    var destination = [
      cafe.location.coordinate.latitude,
      cafe.location.coordinate.longitude
    ];

    var source = [
      $scope.yelp.lat,
      $scope.yelp.lon
    ];

    launchnavigator.navigate(destination, source);
  };

});
