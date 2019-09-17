/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 13th August 2019 8:05:12 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)
 */
var mongoose = require( 'mongoose' );

mongoose.Promise = global.Promise;
mongoose.connect( "mongodb://localhost:27017/actchain-cardealer", { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false } );

module.exports = { mongoose };