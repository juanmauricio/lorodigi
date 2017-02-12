(function (app) {
  'use strict';

  app.registerModule('identity', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  // app.registerModule('identity.admin', ['core.admin']);
  //app.registerModule('identity.client.routes', ['core.admin.routes']);
  app.registerModule('identity.services');
  app.registerModule('identity.routes', ['ui.router', 'core.routes', 'identity.services']);
}(ApplicationConfiguration));
