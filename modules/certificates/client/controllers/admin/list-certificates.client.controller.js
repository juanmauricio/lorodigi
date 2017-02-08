(function () {
  'use strict';

  angular
    .module('certificates.admin')
    .controller('CertificatesAdminListController', CertificatesAdminListController);

  CertificatesAdminListController.$inject = ['CertificateService'];

  function CertificatesAdminListController(CertificatesService) {
    var vm = this;

    vm.certificates = CertificatesService.query();
  }
}());
