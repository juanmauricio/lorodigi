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

    vm.getFacebookScoreVariables = function () {
      //service call
      IdentityService.getFacebookVariables("server").then(onGetFacebookVariablesSuccess).catch(onGetFacebookVariablesError);
    }

    function onGetFacebookVariablesSuccess(response) {
      // If successful we assign the response to the global user model
      vm.identity = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Variables obtenidas exitosamente!' });
      // And redirect to the previous or home page
      //$state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onGetFacebookVariablesError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Signup Error!', delay: 6000 });
    }

  }
}());
