/**
 */

'use strict';

angular.module( 'myApp' ).controller( 'HomeCtrl', [
  '$scope', function ( $scope )
  {
    var count = 0;
    $scope.something = {};
    $scope.something.things = ['first-thing', 'second-thing', 'third-thing'];

    $scope.addSome = function ()
    {
      count++;
      $scope.something.things.push( 'another-thing-' + count );
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
    };

    $scope.repeatedObj = [
      {
        thing1: 'thing-1'
      }
    ];
    var repeatedCount = 1;

    $scope.addToRepeated = function ()
    {
      repeatedCount++;

      var temp = {};
      temp ['thing' + repeatedCount] = 'thing-' + repeatedCount;

      $scope.repeatedObj.push( temp )

    };


  }
] );