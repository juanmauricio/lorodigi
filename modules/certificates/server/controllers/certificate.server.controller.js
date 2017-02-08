'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Article = mongoose.model('Certificate'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a certificate
 */
exports.create = function (req, res) {
  var certificate = new Certificate(req.body);
  certificate.user = req.user;

  certificate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(certificate);
    }
  });
};

/**
 * Show the current certificate
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var certificate = req.certificate ? req.certificate.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  certificate.isCurrentUserOwner = !!(req.user && certificate.user && certificate.user._id.toString() === req.user._id.toString());

  res.json(certificate);
};

/**
 * Update an article
 */
exports.update = function (req, res) {
  var certificate = req.certificate;

  certificate.title = req.body.title;
  certificate.content = req.body.content;

  certificate.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(certificate);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var certificate = req.certificate;

  certificate.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(certificate);
    }
  });
};

/**
 * List of Certificates
 */
exports.list = function (req, res) {
  Article.find().sort('-created').populate('user', 'displayName').exec(function (err, certificates) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(certificates);
    }
  });
};

/**
 * Article middleware
 */
exports.certificateByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Certificate is invalid'
    });
  }

  Certificate.findById(id).populate('user', 'displayName').exec(function (err, article) {
    if (err) {
      return next(err);
    } else if (!certificate) {
      return res.status(404).send({
        message: 'No certitificates with that identifier has been found'
      });
    }
    req.certificate = certificate;
    next();
  });
};
