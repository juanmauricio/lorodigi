(function () {
  'use strict';

  angular
    .module('certificates.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('certificates', {
        abstract: true,
        url: '/certificates',
        template: '<ui-view/>'
      })
      .state('certificates.list', {
        url: '',
        templateUrl: '/modules/certificates/client/views/list-certificates.client.view.html',
        controller: 'CertificatesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Certificates List'
        }
      })
      .state('certificates.view', {
        url: '/:certificateId',
        templateUrl: '/modules/certificates/client/views/view-certificate.client.view.html',
        controller: 'CertificatesController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getCertificate
        },
        data: {
          pageTitle: 'Certificate {{ certificateResolve.title }}'
        }
      });
  }

  getCertificate.$inject = ['$stateParams', 'CertificatesService'];

  function getCertificate($stateParams, CertificatesService) {
    return CertificatesService.get({
      certificateId: $stateParams.certificateId
    }).$promise;
  }
}());
