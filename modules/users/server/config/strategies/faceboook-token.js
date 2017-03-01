'use strict';

var passport = require('passport'),
    users = require('../../controllers/users.server.controller'),
    FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function (config) {
    passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret
    }, function (accessToken, refreshToken, profile, done) {

        User.findOrCreate({ facebookId: profile.id }, function (error, user) {
            return done(error, user);
        });
        
    }
    ));
}