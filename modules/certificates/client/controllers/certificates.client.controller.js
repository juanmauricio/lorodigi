(function () {
  'use strict';

  angular
    .module('certificates')
    .controller('CertificatesController', CertificatesController);

  CertificatesController.$inject = ['$scope', 'certificateResolve', 'Authentication'];

  function CertificatesController($scope, certificate, Authentication) {
    var vm = this;

    vm.certificate = certificate;
    vm.authentication = Authentication;

  }
}());
