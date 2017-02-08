(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('certificates.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Administrar Certificados',
      state: 'admin.certificates.list'
    });
  }
}());
