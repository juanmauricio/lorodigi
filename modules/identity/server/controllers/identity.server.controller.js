'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Identity = mongoose.model('Identity'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  request = require('request').defaults({ encoding: null }),
  crypto = require('crypto'),
  fs = require('fs');

exports.getImageFromURL = function (url) {
  return new Promise((resolve, reject) => {
    var data = request.get(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        data = new Buffer(body).toString('base64');
        return resolve(data);
      };
      return reject(error)
    });
  });
}

exports.signIdentity = function (identity) {
  var pem = fs.readFileSync(path.resolve('./modules/identity/server/files/key.pem'));
  var key = pem.toString('ascii');
  var sign = crypto.createSign('RSA-SHA256');
  sign.update(identity.toString());
  var sig = sign.sign(key, 'hex');
  return sig;
}


/**
 * Crea una identidad.
 */
exports.create = function (req, res) {
  var identity = new Identity(req.body);
  identity.user = req.user;

  identity.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(identity);
    }
  });
};

/**
 * Show the current identity
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var identity = req.identity ? req.identity.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  identity.isCurrentUserOwner = !!(req.user && identity.user && identity.user._id.toString() === req.identity._id.toString());

  res.json(identity);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var article = req.article;

  article.title = req.body.title;
  article.content = req.body.content;

  article.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var article = req.article;

  article.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(article);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function (err, articles) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(articles);
    }
  });
};

/**
 * Article middleware
 */
exports.identityByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Identity is invalid'
    });
  }

  Identity.findById(id).populate('user', 'displayName').exec(function (err, identity) {
    if (err) {
      return next(err);
    } else if (!article) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.identity = identity;
    next();
  });
};

/**
 * FACEBOOK VARIABLES
 */
