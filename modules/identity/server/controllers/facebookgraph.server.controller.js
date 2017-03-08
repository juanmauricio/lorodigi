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
    graph.setAppSecret(config.facebook.clientSecret);

    var options = {
      timeout: 3000
      , pool: { maxSockets: Infinity }
      , headers: { connection: "keep-alive" }
    };

    // var params = { fields: "id,cover,picture,age_range,verified" };
    var params = { fields: "picture,age_range,name,about,email,birthday,cover,first_name,gender,hometown,is_verified,last_name,public_key,verified,work" };


    graph
      .setOptions(options)
      .get("129954010860422", params, function (err, res) {
        console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
      });

    // pass it in as part of the url
    // graph.get("https://graph.facebook.com/me",{message: "prueba"}, function(err, res) {
    //     // returns the post id
    //     console.log(res); // { id: xxxxx}
    // })

    // pass it in as part of the url
    // graph.post("129954010860422" + "/me?access_token=" + access_token,{message: "prueba"}, function(err, res) {
    //     // returns the post id
    //     console.log(res); // { id: xxxxx}
    // })

  }



  // config.facebook.clientID
  // config.facebook.clientSecret

}