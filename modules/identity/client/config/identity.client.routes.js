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
      })
      .state('identity.facebookScoreVariables', {
        url: '',
        templateUrl: '/modules/identity/client/views/facebookScoreVariables.client.view.html',
        controller: 'IdentityController',
        controllerAs: 'vm',
        resolve: {
          articleResolve: getFacebookScoreVariables
        },
        data: {
          pageTitle: 'Certificate {{ certificateResolve.title }}'
        }
      })
      ;
  }

  getFacebookScoreVariables.$inject = ['$stateParams', 'IdentityService'];

  function getFacebookScoreVariables($stateParams, IdentityService) {
    return IdentityService.get({
      identityId: $stateParams.identityId
    }).$promise;
  }



}());
