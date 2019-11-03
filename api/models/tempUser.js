/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Saturday, 21st September 2019 11:11:29 am
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


let TempUserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
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
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: false
    },
    ID: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
        required: true
    },
    OTP: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    contact_name: {
        type: String

    },
    contact_email: {
        type: String

    },
    contact_title: {
        type: String

    },
    contact_mobile: {
        type: String

    },
    website :{
        type:String
    },
    Brand:{
        type:String
    },
    mobile:{
        type:Number
    }
});

TempUserSchema.statics.findByCredentials = function (email, password) {
    let User = this;

    return User.findOne({ email }).then((user) => {
        if (!user) {
            return Promise.reject();
        }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
};

TempUserSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

module.exports = mongoose.model('tempUser', TempUserSchema);