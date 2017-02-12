(function () {
  'use strict';

  // Setting up route
  angular
    .module('identity.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('identity', {
        abstract: true,
        url: '/identity',
        template: '<ui-view/>'
      })
      .state('identity.view', {
        abstract: false,
        url: '',
        templateUrl: '/modules/identity/client/views/admin-identity.client.view.html',
        controller: 'IdentityController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Administra tu identidad'
        }
      });
  }

  getIdentity.$inject = ['$stateParams', 'IdentityService'];

  function getIdentity($stateParams, IdentityService) {
    return IdentityService.get({
      identityId: $stateParams.identityId
    }).$promise;
  }



} ());
