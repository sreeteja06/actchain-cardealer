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
let dealerDB = require( '../models/dealer' );
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
    res.send('You are in dealer route')
}))

router.post(
    '/quoteDiscount',
    awaitHandler( async ( req, res ) => {
        var quote = {"dealerID": req.body.dealerID, "Pricequote": req.body.Pricequote};
       let requested =  await requestDB.findOne({_id: req.body.requestID});
       
       requested.quotes.push(quote);
       requested.save(function(err) {
        if (err) throw err;    
        console.log('car successfully saved.');
        res.send( requested );})
    })  );
 
module.exports = router