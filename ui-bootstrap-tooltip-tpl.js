/**
 * @ngdoc directive
 * @name mib-ui-bootstrap-tooltip-tpl
 *
 * @description
 * The 'mib-ui-bootstrap-tooltip-tpl' directive allows you to use templates with standard
 * ui-bootstrap tooltips.
 *
 * The default tooltip directives of ui-bootstrap can be used as always.
 *
 * Following example describes how to use the directive:
 *
 * To load a simple html template without any scope variables.
 *
 * ```html
 *   <div mib-ui-bootstrap-tooltip-tpl="'myTooltipTpl.html'"
 *        tooltip-placement="right">
 *   </div>
 *
 *   <script type="text/ng-template" id="myTooltipTpl.html">
 *      <div><b>Simple Html Template</b></div>
 *   </script>
 * ```
 *
 * To load a template containing scope variables, that need to be compiled by angular.
 *
 * ```html
 *   <div mib-ui-bootstrap-tooltip-tpl="'myTooltipTpl.html'"
 *        tooltip-placement="right"
 *        mib-tooltip-scope="myScopeModel">
 *   </div>
 *
 *   <script type="text/ng-template" id="myTooltipTpl.html">
 *      <div>{{myScopeModel | json}}</div>
 *   </script>
 * ```
 */

'use strict';

angular.module( 'mbrand.angular-ui-bootstrap-tooltip-tpl', ['ui.bootstrap'] )
  .directive( 'mibUiBootstrapTooltipTpl', [
    '$compile',
    '$timeout',
    '$http',
    '$templateCache',
    '$parse',
    function ( $compile, $timeout, $http, $templateCache, $parse )
    {
      return {
        restrict: 'A',
        scope: {
          mibTooltipScope: "="
        },
        compile: function ( tElem )
        {
          //Add bootstrap directive if it's not already there
          if ( !tElem.attr( 'tooltip-html-unsafe' ) )
          {
            tElem.attr( 'tooltip-html-unsafe', '{{__tooltip}}' );
          }
          return {
            post: function ( scope, element, attrs )
            {
              var tplUrl = $parse( attrs.mibUiBootstrapTooltipTpl )( scope );

              /**
               * Gets the template by either loading it directly from the server or using it from the
               * template cache. Compiles, binds and puts it into the actualy bootstrap tooltip-html-unsafe
               * directive.
               */
              function loadAndBindTemplate()
              {
                $http.get( tplUrl, {cache: $templateCache} )
                  .success( function ( tplContent )
                  {
                    var tpl = $compile( '<div>' + tplContent.trim() + '</div>' )( scope );
                    $timeout( function ()
                    {
                      scope.__tooltip = tpl.html();
                    } );
                  } )
                  .error( function ()
                  {
                    throw 'couldn\'t find tooltip template: ' + tplUrl + '!';
                  } );
              }

              //remove our directive to avoid infinite looping
              element.removeAttr( 'mib-ui-bootstrap-tooltip-tpl' );

              //compile element to attach tooltip binding
              $compile( element )( scope );

              /**
               * Binds the directives "scope data" from "mib-tooltip-scope" attribute, to the actual
               * scope of the directive to be able to use the same scope model as specified in the
               * "mib-tooltip-attribute" and calls #loadAndBindTemplate().
               */
              function templateLoadingProxy( old, newV, $scope )
              {
                scope[attrs.mibTooltipScope] = $scope.mibTooltipScope;
                loadAndBindTemplate();
              }

              if ( angular.isDefined( scope.mibTooltipScope ) )
              {
                // add a watcher or a collection watcher depending on if it's and array or not.
                if ( angular.isArray( scope.mibTooltipScope ) )
                {
                  scope.$watchCollection( 'mibTooltipScope', templateLoadingProxy );
                }
                else
                {
                  scope.$watch( 'mibTooltipScope', templateLoadingProxy, true );
                }
              }
              else
              {
                loadAndBindTemplate();
              }
            }
          };
        }
      };
    }
  ] );