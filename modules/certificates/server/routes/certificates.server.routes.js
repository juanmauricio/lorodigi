'use strict';

/**
 * Module dependencies
 */
var certificatesPolicy = require('../policies/certificates.server.policy'),
  certificates = require('../controllers/certificate.server.controller');

module.exports = function (app) {
  // Articles collection routes
  app.route('/api/certificates').all(certificatesPolicy.isAllowed)
    .get(certificates.list)
    .post(certificates.create);

  // Single article routes
  app.route('/api/certificates/:certificateId').all(certificatesPolicy.isAllowed)
    .get(certificates.read)
    .put(certificates.update)
    .delete(certificates.delete);

  // Finish by binding the article middleware
  app.param('certificateId', certificates.certificateByID);
};
