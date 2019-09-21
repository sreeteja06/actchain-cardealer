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
let nodemailer = require('nodemailer')

let { mongoose } = ( '../db/mongoose' );

let User = require( '../models/user' );
let Dealer = require( '../models/dealer' );
let Customer = require( '../models/customer' );
let tempUserModel = require('../models/tempUser');
let { authenticate } = require( '../middleware/authentication' );
require( '../config/config' );

const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            res.setHeader( 'Content-Type', 'application/json; charset=utf-8' );
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.post('/users/signup', awaitHandler( ( req, res ) => {
    let body = {
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        OTP: Math.round( Math.random() * 1000000 ),
        ID: req.body.ID
    }
    console.log(body.email + ": OTP = " +  body.OTP)
    //using nodemailer to send the otp to mail
    var transporter = nodemailer.createTransport( {
        host: "smtp.office365.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'sreeteja@activa.one',
            pass: process.env.EPASS
        }
    } );

    var mailOptions = {
        from: 'sreeteja@activa.one',
        to: body.email,
        subject: 'OTP for Actchain Car Dealer ',
        text: 'OTP is '+body.OTP
    };

    transporter.sendMail( mailOptions, function ( error, info ) {
        if ( error ) {
            console.log( error );
        } else {
            console.log( 'Email sent: ' + info.response );
        }
    } );
    //end of nodemailer
    let tempUser = new tempUserModel( body );
    tempUser.save(function(err){
        if(err){
            res.end(500)
        }
    })
    res.send(tempUser._id);
} ))

router.post( '/users/verify', awaitHandler(async ( req, res ) => {
    let tempUser = await tempUserModel.findOne({_id: req.body.tempuserID})
    if(tempUser.OTP != req.body.OTP){
        res.status( 401 ).end();
    } else{
        let body = {
            email: tempUser.email,
            password: req.body.password,
            role: tempUser.role,
            firstName: tempUser.firstName,
            lastName: tempUser.lastName,
        }
        let userData = {};
        let user = new User( body );
        user.save().then( () => {
            return user.generateAuthToken();
        } ).then( async ( token ) => {
            let Obj
            if ( tempUser.role === 'Dealer' ) {
                userData = {
                    dealerRegId: tempUser.ID,
                    _user: user._id
                }
                let dealer = new Dealer( userData )
                Obj = await dealer.save();
            }
            else if ( tempUser.role === 'Buyer' ) {
                userData = {
                    SSN: tempUser.ID,
                    _user: user._id
                }
                let customer = new Customer( userData );
                Obj = await customer.save();
            }
            res.header( 'x-auth', token ).send( { user, Obj } );
        } ).catch( ( e ) => {
            console.log( e )
            res.status( 400 ).send( e );
        } )
    }
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