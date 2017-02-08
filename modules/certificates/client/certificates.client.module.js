(function (app) {
  'use strict';

  app.registerModule('certificates', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('certificates.admin', ['core.admin']);
  app.registerModule('certificates.admin.routes', ['core.admin.routes']);
  app.registerModule('certificates.services');
  app.registerModule('certificates.routes', ['ui.router', 'core.routes', 'certificates.services']);
}(ApplicationConfiguration));
