'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Identity = mongoose.model('Identity'),
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

    if (req.params.sourcetype === "server") {
      getFacebookVariablesServer(user, config);
    }
    else if (req.params.sourcetype === "local") {
      getFacebookVariablesLocal(user, config);
    }
  });

  function getFacebookVariablesServer(user, config) {
    var access_token = user.additionalProvidersData.facebook.accessToken;
    graph.setAccessToken(access_token);
    graph.setAppSecret(config.facebook.clientSecret);

    var options = {
      timeout: 3000
      , pool: { maxSockets: Infinity }
      , headers: { connection: "keep-alive" }
    };
    var params = { fields: "picture,age_range,name,about,email,birthday,cover,first_name,gender,hometown,is_verified,last_name,public_key,verified,work" };
    graph
      .setOptions(options)
      .get("129954010860422", params, function (err, resFacebook) {
        if (err) {
          return next(err);
        }
        //console.log(resFacebook);
        var identity = new Identity();
        identity.score = "0.77";
        identity.user.email = user.email;
        identity.user.displayName = user.displayName;
        identity.user.userName = user.userName;
        identity.user.idType = user.idType;
        identity.user.idNumber = user.idNumber;
        identity.user.created = user.created;
        identity.user.profileImageURL = user.profileImageURL;
        identity.user.password = user.password;
        identity.user.firstName = user.firstName;
        identity.user.lastName = user.lastName;
        identity.socialNetworkIdentities = {};
        identity.socialNetworkIdentities["facebook"] = resFacebook;

        //Guarda el resultado en la base de datos
        identity.save(function (err) {
          if (err) {
            return res.send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            // vm.identity = identity;
            res.json(identity);
          }
        });

      });
  }

  function getFacebookVariablesLocal(user, config) {

    //Identity.findOne()

    }

}