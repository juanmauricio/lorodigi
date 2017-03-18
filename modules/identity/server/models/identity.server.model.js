'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  crypto = require('crypto');



/**
 * Identity Schema
 */
var IdentitySchema = new Schema({
  score: Number,
  user: {
    firstName: {
      type: String,
      trim: true,
      default: ''
    },
    lastName: {
      type: String,
      trim: true,
      default: ''
    },
    userName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: ''
    },
    idType: {
      type: String,
      trim: true
    },
    idNumber: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      default: ''
    },
    salt: {
      type: String
    },
    profileImageURL: {
      type: String,
      default: 'modules/users/client/img/profile/default.png'
    },
    provider: {
      type: String
    },
    providerData: {},
    additionalProvidersData: {},
    created: {
      type: Date,
      default: Date.now
    }
  },
  socialNetworkIdentities: [{
    //picture,age_range,name,about,email,birthday,cover,first_name,gender,hometown,is_verified,last_name,public_key,verified,work
    id: String,
    socialNetworkName: String,
    age_range: String,
    about: String,
    email: String,
    birthday: String,
    cover: String,
    gender: String,
    is_verified: String,
    public_key: String,
    verified: String,
    name: String,
    last_name: String,
    profileURL: String,
    profileImageURL: String,
    Score: Number
  }]
});

mongoose.model('Identity', IdentitySchema);
