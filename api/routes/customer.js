let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let carDB = require( '../models/car' );
let requestDB = require( '../models/request' );
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

router.post(
    '/requestACar', authenticate,
    awaitHandler( async ( req, res ) => {

        let requestData = new requestDB( {
            carID: req.body.carID,
            // customerID: req.user._id,
            customerID: req.body.customerID,
            

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
    let requestsByCustomer = await requestDB.find( { customerID: req.user._id, sold: false } );
    let responseArray = []
    let obj = {}
    for ( let i = 0; i < requestsByCustomer.length; i++ ) {
        obj = {}
        obj.requestID = requestsByCustomer[i]._id;
        if ( requestsByCustomer[i].quotes[0] ) {
            obj.discount = requestsByCustomer[i].quotes[0].Pricequote;
            obj.dealerName = ( await userDB.findOne( { _id: requestsByCustomer[i].quotes[0].dealerID } ) ).firstName
        }
        let car = await carDB.findOne( { _id: requestsByCustomer[i].carID } )
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.Msrp = car.Msrp
        responseArray.push( obj )
    }
    res.send( responseArray );
} ) )

router.post(
    '/acceptDeal',
    awaitHandler( async ( req, res ) => {

        let requestData = await requestDB.findOne( { _id: req.body.requestID } );
        requestData.sold = true;
        let customerData = await customerDB.findOne( { _user: requestData.customerID } ); // can get customer from x-auth
        customerData.ownedCars.push( { carID: requestData.carID, requestID: requestData._id, dealerID: requestData.quotes[0].dealerID } );
        await customerData.save( function ( err ) {
            if ( err ) throw err;
        }
        )
        requestData.save( function ( err ) {
            if ( err ) throw err;
            console.log( 'car successfully saved.' );
            res.send( requestData );
        }
        )
    }
    ) );

router.get( '/getBroughtCars', authenticate, awaitHandler( async ( req, res ) => {
    let broughtCars = ( await customerDB.findOne( { _user: req.user._id } ) ).ownedCars
    console.log( broughtCars );
    let arr = []
    let obj = {}
    for ( let i = 0; i < broughtCars.length; i++ ) {
        obj = {}
        obj.discount = ( await requestDB.findOne( { _id: broughtCars[i].requestID } ) ).quotes[0].Pricequote
        obj.dealerName = ( await userDB.findOne( { _id: broughtCars[i].dealerID } ) ).firstName
        let car = await carDB.findOne( { _id: broughtCars[i].carID } )
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.Msrp = car.Msrp
        arr.push(obj)
    }
    res.send(arr);
} ) )
//to get a single request details for testing
router.get( '/getARequestDetails', awaitHandler( async ( req, res ) => {
    let data = await requestDB.findOne( { _id: req.query.requestID } );
    res.send( data );
} ) )
module.exports = router