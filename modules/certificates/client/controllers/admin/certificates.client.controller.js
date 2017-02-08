(function () {
  'use strict';

  angular
    .module('certificates.admin')
    .controller('CertificatesAdminController', CertificatesAdminController);

  CertificatesAdminController.$inject = ['$scope', '$state', '$window', 'certificateResolve', 'Authentication', 'Notification'];

  function CertificatesAdminController($scope, $state, $window, certificate, Authentication, Notification) {
    var vm = this;

    vm.certificate = certificate;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Certificate
    function remove() {
      if ($window.confirm('Está seguro que desea eliminar el Certificado?')) {
        vm.article.$remove(function() {
          $state.go('admin.certificates.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Eliminación exitosa!' });
        });
      }
    }

    // Save Certificate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.certificateForm');
        return false;
      }

      // Create a new certificate, or update the current instance
      vm.certificate.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.certificates.list'); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Certificado creado!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Error al crear certificado!' });
      }
    }
  }
}());
