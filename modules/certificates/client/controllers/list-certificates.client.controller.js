(function () {
  'use strict';

  angular
    .module('certificates')
    .controller('CertificatesListController', CertificatesListController);

  CertificatesListController.$inject = ['CertificatesService'];

  function CertificatesListController(CertificatesService) {
    var vm = this;

    vm.certificates = CertificatesService.query();
  }
}());
