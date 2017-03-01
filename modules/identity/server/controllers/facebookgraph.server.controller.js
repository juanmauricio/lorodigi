'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Identity = mongoose.model('Identity'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  graph = require('fbgraph');


/**
 * Get facebook variables to calculate score for an specific user.
 */
exports.getfacebookvariables = function(req, res) 
{
  var user = req.user;
  var access_token = req.user.AdditionalProvidersData["facebook"].access_token;

  graph.setAccessToken(access_token);

// config.facebook.clientID
// config.facebook.clientSecret

}