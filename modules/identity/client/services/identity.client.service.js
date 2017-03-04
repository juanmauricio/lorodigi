(function () {
  'use strict';

  angular
    .module('identity.services')
    .factory('Identity', IdentityService);

  IdentityService.$inject = ['$resource', '$log'];

  function IdentityService($resource, $log) {


    // IdentityService.getFacebookScoreVariables = function () {
    //   return $resource('/api/facebook/scorevariables').get();
    // };


    return {
      getFacebookScoreVariables: function () {
        return $resource('/api/facebook/scorevariables').get();
      },
      sayGoodbye: function (text) {
        return "Factory says \"Goodbye " + text + "\"";
      }
    }

    // Handle error response
    function onError(errorResponse) {
      var error = errorResponse.data;
      // Handle error internally
      handleError(error);
    }


    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
