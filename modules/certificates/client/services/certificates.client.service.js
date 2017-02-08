(function () {
  'use strict';

  angular
    .module('certificates.services')
    .factory('Certificates', CertificatesService);

  CertificatesService.$inject = ['$resource', '$log'];

  function CertificatesService($resource, $log) {
    var Certificate = $resource('/api/certificates/:certificateId', {
      certificateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Certificate.prototype, {
      createOrUpdate: function () {
        var certificate = this;
        return createOrUpdate(article);
      }
    });

    return Certificate;

    function createOrUpdate(certificate) {
      if (certificate._id) {
        return certificate.$update(onSuccess, onError);
      } else {
        return certificate.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(certificate) {
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
