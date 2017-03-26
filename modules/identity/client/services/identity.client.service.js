(function () {
  'use strict';

  
  angular
    .module('identity.services')
    .factory('IdentityService', IdentityService);

  IdentityService.$inject = ['$resource', '$log'];

  function IdentityService($resource, $log) {

    var Identity = $resource('/api/facebook/scorevariables/:sourcetype', {
      sourcetype: '@sourcetype'
    }, {
        query: {
          method: 'GET'
        }
      }
    );

    angular.extend(Identity, {
      getFacebookVariables: function (sourcetype1) {
        return this.query({ sourcetype: sourcetype1 }).$promise;
      }
    });


    return Identity;


    // IdentityService.getFacebookScoreVariables = function () {
    //   return $resource('/api/facebook/scorevariables').get();
    // };


    // return {
    //   getFacebookScoreVariables: function () {
    //     return $resource('/api/facebook/scorevariables').get();
    //   },
    //   sayGoodbye: function (text) {
    //     return "Factory says \"Goodbye " + text + "\"";
    //   }
    // }

    // // Handle error response
    // function onError(errorResponse) {
    //   var error = errorResponse.data;
    //   // Handle error internally
    //   handleError(error);
    // }


    // function handleError(error) {
    //   // Log error
    //   $log.error(error);
    // }
  }
}());
