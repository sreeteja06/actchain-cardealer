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
    '/requestACar',authenticate,
    awaitHandler( async ( req, res ) => {
        const carDetails = await requestDB.findOne({carID:req.body.carID,sold:false});
        if(carDetails){
            res.status(400).send("you already asked for a quote");
            return ; 
        }
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
    '/acceptDeal',authenticate,
    awaitHandler( async ( req, res ) => {

        let requestData = await requestDB.findOne( { _id: req.body.requestID } );
        requestData.sold = true;
        let dealerData = await dealerDB.findOne({_user :requestData.quotes[0].dealerID });
        let customerData = await customerDB.findOne( { _user: requestData.customerID } ); // can get customer from x-auth
        customerData.ownedCars.push( { carID: requestData.carID, requestID: requestData._id, dealerID: requestData.quotes[0].dealerID } );
        dealerData.soldCars.push({ carID: requestData.carID, requestID: requestData._id,customerID:requestData.customerID});
        await customerData.save( function ( err ) {
            if ( err ) throw err;
        }
        )
        await dealerData.save( function ( err ) {
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

router.get( '/getQuotableCars', awaitHandler( async ( req, res ) => {
    let data = await carDB.find();
    for(let i=0;i<data.length;i++){
    let flag = await requestDB.findOne({carID: data[i]._id, customerID: req.query.customerID,sold:false} );
    let quotable = false
    if(flag){
        quotable = true
    }
    let temp = {...data[i]._doc}
   
    data[i] = {...temp,quotable:quotable}
    }
    res.send( data );
} ) )
module.exports = router