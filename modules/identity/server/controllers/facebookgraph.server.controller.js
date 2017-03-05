'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  graph = require('fbgraph'),
  config = require(path.resolve('./config/config'));


/**
 * Get facebook variables to calculate score for an specific user.
 */
exports.getfacebookvariables = function (req, res) {

  User.findOne({
    _id: req.user._id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + id));
    }

    getFacebookVariables(user, config);
  });


  function getFacebookVariables(user, config) {
    var access_token = user.additionalProvidersData.facebook.accessToken;
    graph.setAccessToken(access_token);
    graph.setAppSecret(config.facebook.clientSecret)

  // pass it in as part of the url
    graph.post("129954010860422" + "/feed?access_token=" + access_token,{message: "prueba"}, function(err, res) {
        // returns the post id
        console.log(res); // { id: xxxxx}
    })

  }



  // config.facebook.clientID
  // config.facebook.clientSecret

}