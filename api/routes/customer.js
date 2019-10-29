/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Tuesday, 29th October 2019 12:54:09 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let dealerDB = require( '../models/dealer' );
let carDB = require( '../models/car' );
let requestDB = require( '../models/request' );
let soldCarsDB = require( '../models/soldCars' )
let userDB = require( '../models/user' );
const { authenticate } = require( '../middleware/authentication' );
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

router.get( '/', awaitHandler( async ( req, res ) => {
    res.send( 'You are in customer route' )
} ) )

router.get( '/getBroughtCars', authenticate, awaitHandler( async ( req, res ) => {
    let BroughtCars = ( await soldCarsDB.find( { soldTO: req.user._id } ) )
    console.log( BroughtCars );
    let arr = []
    let obj = {}
    for ( let i = 0; i < BroughtCars.length; i++ ) {
        obj = {}
        let user = ( await userDB.findOne( { _id: BroughtCars[i].dealerID } ) )
        obj.dealerName = user.firstName + " " + user.lastName
        let car = await carDB.findOne( { _id: BroughtCars[i].carID } )
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.Msrp = car.Msrp
        arr.push( obj )
    }
    res.send( arr );
} ) )

module.exports = router