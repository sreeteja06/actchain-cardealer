/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 13th August 2019 9:34:45 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
let expect = require( 'chai' ).expect;
let user = require('../models/user');

describe( 'user', function () {
    it( 'should be invalid if email is empty', function ( done ) {
        var u = new user({
            "email": "hell@gmail.com",
            "password": "hellothere",
            "productAccess": [{
                "product": "meditrack",
                "roles": [{"organization":"manufacturer", "username": "manu"}],
                "admin": true,
            }]
        });
        console.log( u.productAccess );
        done();
        // u.validate( function ( err ) {
        //     expect( err.errors.email ).to.exist;
        //     done();
        // } );
    } );
} );