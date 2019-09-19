/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 17th September 2019 5:43:04 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
let express = require( 'express' )
let router = express.Router()

let { mongoose } = ( '../db/mongoose' );

let User = require( '../models/user' );
let Dealer = require( '../models/dealer' );
let Customer = require( '../models/customer' );
let { authenticate } = require( '../middleware/authentication' );
require( '../config/config' );

const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.post( '/users', awaitHandler( ( req, res ) => {
    let body = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    }
    let userData = {};
    let user = new User( body );
    user.save().then( () => {
        return user.generateAuthToken();
    } ).then(async ( token ) => {
        let Obj
        if ( req.body.role === 'Dealer' ) {
            userData = {
                dealerRegId: req.body.ID,
                _user: user._id
            }
            let dealer = new Dealer( userData )
            Obj = await dealer.save();
        }
        else if( req.body.role === 'Buyer' ) {
            userData = {
                SSN: req.body.ID,
                _user:user._id
            }
            let customer = new Customer( userData );
            Obj = await customer.save();
        }
        res.header( 'x-auth', token ).send( {user, Obj} );
    } ).catch( ( e ) => {
        console.log(e)
        res.status( 400 ).send( e );
    } )
} ) );

router.post( '/users/login', awaitHandler( ( req, res ) => {
    let body = {
        email: req.body.email,
        password: req.body.password
    }

    User.findByCredentials( body.email, body.password ).then( ( user ) => {
        return user.generateAuthToken().then( ( token ) => {
            res.header( 'x-auth', token ).send( user );
        } );
    } ).catch( ( e ) => {
        res.status( 401 ).send();
    } );
} ) );

router.get( '/users/me', authenticate, awaitHandler( ( req, res ) => {
    res.send( req.user );
} ) );

router.delete( '/users/logout', authenticate, awaitHandler( ( req, res ) => {
    req.user.removeToken( req.token ).then( () => {
        res.status( 200 ).send();
    }, () => {
        res.status( 400 ).send();
    } );
} ) );

module.exports = router