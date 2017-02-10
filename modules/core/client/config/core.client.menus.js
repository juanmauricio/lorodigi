(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Edit Profile Picture',
      state: 'settings.picture'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Change Password',
      state: 'settings.password'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Manage Social Accounts',
      state: 'settings.accounts'
    });

    menuService.addMenuItem('topbar', {
      title: 'Sobre nosotros',
      state: 'info',
      type: 'dropdown',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'info', {
      title: 'Cómo funciona?',
      state: 'info.comofunciona',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'info', {
      title: 'Preguntas frecuentes',
      state: 'info.preguntasfrecuentes',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'info', {
      title: 'Contacto',
      state: 'info.contactanos',
      roles: ['*']
    });

    menuService.addSubMenuItem('topbar', 'info', {
      title: 'info.prueba01',
      state: 'info.prueba01',
      roles: ['*']
    });

  }
} ());
