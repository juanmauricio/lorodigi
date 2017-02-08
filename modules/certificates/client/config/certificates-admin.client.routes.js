(function () {
  'use strict';

  angular
    .module('certificates.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.certificates', {
        abstract: true,
        url: '/certificates',
        template: '<ui-view/>'
      })
      .state('admin.certificates.list', {
        url: '',
        templateUrl: '/modules/certificates/client/views/admin/list-certificates.client.view.html',
        controller: 'CertificatesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.certificates.create', {
        url: '/create',
        templateUrl: '/modules/certificates/client/views/admin/form-certificate.client.view.html',
        controller: 'CertificatesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          certificateResolve: newCertificate
        }
      })
      .state('admin.certificates.edit', {
        url: '/:certificateId/edit',
        templateUrl: '/modules/certificates/client/views/admin/form-certificate.client.view.html',
        controller: 'CertificatesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          certificateResolve: getCertificate
        }
      });
  }

  getCertificate.$inject = ['$stateParams', 'Certificates Service'];

  function getCertificate($stateParams, CertificatesService) {
    return CertificatesService.get({
      certificateId: $stateParams.certificateId
    }).$promise;
  }

  newCertificate.$inject = ['CertificatesService'];

  function newCertificate(CertificatesService) {
    return new CertificatesService();
  }
}());
