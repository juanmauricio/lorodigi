(function () {
  'use strict';

  angular
    .module('certificates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Mis certificados',
      state: 'miscertificados',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'certificates', {
      title: 'Ver certificados',
      state: 'certificados.list',
      roles: ['*']
    });
  }
}());
