(function () {
  'use strict';

  angular
    .module('certificates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Certificates',
      state: 'certificates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'certificates', {
      title: 'List certificates',
      state: 'certificates.list',
      roles: ['*']
    });
  }
}());
