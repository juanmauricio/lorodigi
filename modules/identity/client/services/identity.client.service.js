(function () {
  'use strict';

  angular
    .module('identity.services')
    .factory('Identity', IdentityService);

  IdentityService.$inject = ['$resource', '$log'];

  function IdentityService($resource, $log) {
    var Identity = $resource('/api/identity/:identityId', {
      identityId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Identity.prototype, {
      createOrUpdate: function () {
        var identity = this;
        return createOrUpdate(identity);
      }
    });

    return Identity;

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
