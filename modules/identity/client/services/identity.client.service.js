(function () {
  'use strict';

  angular
    .module('identity.services')
    .factory('Identity', IdentityService);

  IdentityService.$inject = ['$resource', '$log'];

  function IdentityService($resource, $log) {

    var FacebookScoreVariables = $resource('/api/facebook/facebookscorevariables', {
      identityId: '@_id'
    }, {
        update: {
          method: 'PUT'
        }
      });

    // var Identity = $resource('/api/identity/:identityId', {
    //   identityId: '@_id'
    // }, {
    //     update: {
    //       method: 'PUT'
    //     }
    //   });

    angular.extend(FacebookScoreVariables.prototype, {
      createOrUpdate: function () {
        var facebookScoreVariables = this;
        return createOrUpdate(facebookScoreVariables);
      }
    });

    return FacebookScoreVariables;
    

    // function GetIdentityScore($resource, $log) {
    //   var IdentityScore = $resource('/api/score/:identityId', {
    //     identityId: '@_id'
    //   }, {
    //       update: {
    //         method: 'PUT'
    //       }
    //     });
    // }


    function createOrUpdate(identity) {
      if (identity._id) {
        return identity.$update(onSuccess, onError);
      } else {
        return identity.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(identity) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
