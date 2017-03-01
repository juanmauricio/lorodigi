(function () {
  'use strict';

  angular
    .module('identity')
    .controller('IdentityController', IdentityController);

  IdentityController.$inject = ['$scope', '$state', 'IdentityService', 'Authentication'];

  function IdentityController($scope, $state, IdentityService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    //var user = new UsersService(vm.user);

    //vm.identity = identity;
    //vm.authentication = Authentication;

  }
}());
