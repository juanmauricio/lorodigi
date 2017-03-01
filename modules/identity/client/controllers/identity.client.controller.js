(function () {
  'use strict';

  angular
    .module('identity')
    .controller('IdentityController', IdentityController);

  IdentityController.$inject = ['$scope', '$state', 'UsersService', 'Authentication'];

  function IdentityController($scope, $state, UsersService, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    //var user = new UsersService(vm.user);

    //vm.identity = identity;
    //vm.authentication = Authentication;

  }
}());
