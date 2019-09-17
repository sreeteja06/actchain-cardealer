/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 13th August 2019 8:04:47 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)
 */
let env = process.env.NODE_ENV || 'development';

if ( env === 'development' || env === 'test' ) {
   let config = require( './config.json' );
   let envConfig = config[env];

   Object.keys( envConfig ).forEach( ( key ) => {
      process.env[key] = envConfig[key];
   } );
}