(function () {
  'use strict';

  angular
    .module('identity')
    .controller('IdentityController', IdentityController);

  IdentityController.$inject = ['$scope', 'IdentityResolve', 'Authentication'];

  function IdentityController($scope, identity, Authentication) {
    var vm = this;

    vm.identity = identity;
    vm.authentication = Authentication;

  }
}());
