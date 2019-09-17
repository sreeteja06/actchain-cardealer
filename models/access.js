/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Friday, 16th August 2019 1:38:42 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
const mongoose = require( 'mongoose' );

let accessSchema = new mongoose.Schema( {
    product: {
        type: String,
        required: true,
        unique: true
    },
    //roles work in such a way that when a user logs into a spcific product
    //then the user has to choose between roles to select the appropriate one
    roles: [{
        username: {
            type: String,
            required: true,
        },
        organization: {
            type: String,
            required: true
        }
    }],
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
} )

module.exports = mongoose.model( 'productAccess', accessSchema );