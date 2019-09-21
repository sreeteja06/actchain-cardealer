let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let carDB = require( '../models/car' );
let requestDB = require( '../models/request' );
let userDB = require('../models/user');
const { authenticate } = require( '../middleware/authentication' );
const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.get( '/', awaitHandler( async ( req, res ) => {
    res.send( 'You are in customer route' )
} ) )

router.post(
    '/requestACar', authenticate,
    awaitHandler( async ( req, res ) => {

        let requestData = new requestDB( {
            carID: req.body.carID,
            customerID: req.user._id,

        } );
        requestData.save( function ( err ) {
            if ( err ) throw err;
            console.log( 'car successfully saved.' );
            res.send( requestData );
        }
        )
    }
    ) );

router.get( '/requestedCars', authenticate, awaitHandler( async ( req, res ) => {
    let requestsByCustomer = await requestDB.find({customerID: req.user._id});
    let responseArray = []
    let obj = {}
    for(let i = 0; i<requestsByCustomer.length; i++){
        obj = {}
        obj.requestID = requestsByCustomer[i]._id;
        obj.discount = requestsByCustomer[i].quotes[0].Pricequote;
        obj.dealerName = (await userDB.findOne( { _id: requestsByCustomer[i].quotes[0].dealerID } )).firstName
        let car = await carDB.findOne({_id: requestsByCustomer[i].carID})
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.Msrp = car.Msrp
        responseArray.push(obj)
    }
    res.send(responseArray);
} ) )

module.exports = router