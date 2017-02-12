(function () {
  'use strict';

  angular
    .module('identity')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Identidad',
      state: 'identity',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'identity', {
      title: 'Mi identidad',
      state: 'identity.view',
      url: '/',
      roles: ['*']
    });
  }
}());
