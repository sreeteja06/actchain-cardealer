/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 13th August 2019 8:05:22 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)
 */
let User = require( '../models/user' );

let authenticate = ( req, res, next ) => {
   let token = req.header( 'x-auth' );

   User.findByToken( token ).then( ( user ) => {
      if ( !user ) {
         return Promise.reject();
      }
      req.user = user;
      req.token = token;
      next();
   } ).catch( ( e ) => {
      res.status( 401 ).send();
   } );
};

module.exports = { authenticate };
