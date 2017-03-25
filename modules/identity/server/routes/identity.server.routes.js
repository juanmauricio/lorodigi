'use strict';

/**
 * Module dependencies
 */
var identityPolicy = require('../policies/identity.server.policy'),
  identities = require('../controllers/identity.server.controller'),
  facebookgraphvariables = require('../controllers/facebookgraph.server.controller');

module.exports = function (app) {
  // Identity collection routes
  // app.route('/api/identities').all(identityPolicy.isAllowed)
  //   .get(identities.list)
  //   .post(identities.create);

  // Single identity routes
  app.route('/api/identities/:identityId').all(identityPolicy.isAllowed)
    .get(identities.read)
    .delete(identities.delete);

  // facebook variables route
  app.route('/api/facebook/scorevariables/:sourcetype').all(identityPolicy.isAllowed)
    .get(facebookgraphvariables.getfacebookvariables);

  // Finish by binding the identity middleware
  app.param('identityId', identities.identityByID);




};