/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 13th August 2019 8:05:33 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)
 */

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const lodash = require('lodash');

let UserSchema = new mongoose.Schema( {
   email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
         validator: validator.isEmail,
         message: '{VALUE} is not a valid email'
      }
   },
   password: {
      type: String,
      require: true,
      minlength: 6
   },
   role: {
      type: String,
      default: false
   },
   tokens: [{
      access: {
         type: String,
         required: true
      },
      token: {
         type: String,
         required: true
      }
   }]
} );

UserSchema.methods.generateAuthToken = function () {
   let user = this;
   let access = 'auth';
   let token = jwt.sign( { _id: user._id.toHexString(), access }, process.env.JWT_SECRET ).toString();
   user.tokens.push( { access, token } );
   return user.save().then( () => {
      return token;
   } );
};

UserSchema.methods.removeToken = function ( token ) {
   let user = this;

   return user.update( {
      $pull: {
         tokens: { token }
      }
   } );
};

UserSchema.statics.findByToken = function ( token ) {
   let User = this;
   let decoded;

   try {
      decoded = jwt.verify( token, process.env.JWT_SECRET );
   } catch ( e ) {
      return Promise.reject();
   }

   return User.findOne( {
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
   } );
};

UserSchema.statics.findByCredentials = function ( email, password ) {
   let User = this;

   return User.findOne( { email } ).then( ( user ) => {
      if ( !user ) {
         return Promise.reject();
      }

      return new Promise( ( resolve, reject ) => {
         bcrypt.compare( password, user.password, ( err, res ) => {
            if ( res ) {
               resolve( user );
            } else {
               reject();
            }
         } );
      } );
   } );
};

UserSchema.pre( 'save', function ( next ) {
   let user = this;

   if ( user.isModified( 'password' ) ) {
      bcrypt.genSalt( 10, ( err, salt ) => {
         bcrypt.hash( user.password, salt, ( err, hash ) => {
            user.password = hash;
            next();
         } );
      } );
   } else {
      next();
   }
} );

module.exports = mongoose.model('user', UserSchema);