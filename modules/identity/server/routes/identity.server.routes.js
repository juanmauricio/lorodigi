'use strict';

/**
 * Module dependencies
 */
var identityPolicy = require('../policies/identity.server.policy'),
  identities = require('../controllers/identity.server.controller');

module.exports = function (app) {
  // Identity collection routes
  // app.route('/api/identities').all(identityPolicy.isAllowed)
  //   .get(identities.list)
  //   .post(identities.create);

  // Single article routes
  app.route('/api/identities/:identityId').all(identityPolicy.isAllowed)
    .get(identities.read)
    .delete(identities.delete);

  // Finish by binding the identity middleware
  app.param('identityId', identities.identityByID);
};