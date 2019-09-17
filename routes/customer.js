/*
 * SPDX-License-Identifier: Apache-2.0
 *     _____________  ___  
      / ___/ ___/ _ \/ _ \ 
     (__  ) /  /  __/  __/ 
    /____/_/   \___/\___  
 * File Created: Friday, 16th August 2019 1:49:12 pm
 * Author: SreeTeja06 (sreeteja.muthyala@gmail.com)

 */
let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let carDB = require( '../models/car' );
let requestDB = require('../models/request')
const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.get('/',awaitHandler(async(req,res)=>{
    res.send('You are in customer route')
}))

router.post(
    '/requestACar',
    awaitHandler( async ( req, res ) => {
        let request = {
            carID : req.body.carID,
            customerID: req.body.customerID,
        }
       let requestData = new requestDB(request);
       requestData.save(function(err) {
        if (err) throw err;    
        console.log('car successfully saved.');
        res.send( requestDB );}
        )}
));
 
module.exports = router