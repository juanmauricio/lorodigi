(function () {
  'use strict';

  angular
    .module('certififcates')
    .controller('CertificatesController', CertificatesController);

  CertificatesController.$inject = ['$scope', 'certificateResolve', 'Authentication'];

  function CertificatesController($scope, certificate, Authentication) {
    var vm = this;

    vm.certificate = certificate;
    vm.authentication = Authentication;

  }
}());
