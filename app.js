'use strict';

angular.module( 'myApp', [
  'ngAnimate',		//additional angular modules
  'mbrand.angular-ui-bootstrap-tooltip-tpl'
] )
  .config( [
    '$routeProvider',
    '$locationProvider',
    '$compileProvider',
    '$tooltipProvider',
    function ( $routeProvider, $locationProvider, $compileProvider, $tooltipProvider )
    {
      /**
       setup - whitelist, appPath, html5Mode
       @toc 1.
       */
      $locationProvider.html5Mode( false );		//can't use this with github pages / if don't have access to the server

      // var staticPath ='/';
      var staticPath;
      // staticPath ='/angular-directives/angular-ui-bootstrap-tooltip-tpl/';		//local
      staticPath = '/';		//nodejs (local)
      staticPath = '/angular-ui-bootstrap-tooltip-tpl/';		//gh-pages
      var appPathRoute = '/';
      var pagesPath = staticPath + 'pages/';


      $routeProvider.when( appPathRoute + 'home', {templateUrl: pagesPath + 'home/home.html'} );

      $routeProvider.otherwise( {redirectTo: appPathRoute + 'home'} );


      // workaround until ui-utils is adopted to Angular 1.3
      $tooltipProvider.options( {animation: false} );
    }
  ] );