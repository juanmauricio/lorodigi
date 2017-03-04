(function () {
  'use strict';

  angular
    .module('identity')
    .controller('IdentityController', IdentityController);

  IdentityController.$inject = ['$scope', '$state', 'Identity', 'Authentication'];

  function IdentityController($scope, $state, Identity, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.user = Authentication.user;
    //var user = new UsersService(vm.user);

    //vm.identity = identity;
    //vm.authentication = Authentication;

    vm.getFacebookScoreVariables = function(){
      //service call
      return Identity.getFacebookScoreVariables();

      // return "variables xxxx";
    }

  }
}());
