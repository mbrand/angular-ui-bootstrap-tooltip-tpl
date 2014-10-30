/**
 */

'use strict';

angular.module( 'myApp' ).controller( 'HomeCtrl', [
  '$scope', function ( $scope )
  {
    var count = 0;
    $scope.things = ['first-thing', 'second-thing', 'third-thing'];

    $scope.addSome = function ()
    {
      count++;
      $scope.things.push( 'another-thing-' + count );
      console.log( $scope.things );
    };

    $scope.thing = {
      first: 'first',
      second: 'second'
    };
    var thingCount = 0;

    $scope.addToObj = function ()
    {
      thingCount++;
      $scope.thing['another' + thingCount] = 'another ' + thingCount;
      console.log( $scope.thing );

    };

  }
] );