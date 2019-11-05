let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let dealerDB = require( '../models/dealer' );
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
        let data = await customerDB.findOne({_user : req.user._id});
        if(data.quote_tokens ==0){
            throw new Error;
        }
        else{
        const carDetails = await requestDB.findOne( { carID: req.body.carID, sold: false } );
        if ( carDetails ) {
            res.status( 400 ).send( "you already asked for a quote" );
            return;
        }
        let requestData = new requestDB( {
            carID: req.body.carID,
            buyerID: req.user._id,
        } );
        requestData.save( function ( err ) {
            if ( err ) throw err;
            console.log( 'car successfully saved.' );
            data.quote_tokens=data.quote_tokens-1;
            data.save(function(Err){
                if (Err){throw new Err}
            })
            res.send( requestData );
        }
        )
    }}
    ) );

router.get( '/requestedCars', authenticate, awaitHandler( async ( req, res ) => {
    let requestsByCustomer = await requestDB.find( { buyerID: req.user._id, sold: false } );
    let responseArray = []
    let obj = {}
    for ( let i = 0; i < requestsByCustomer.length; i++ ) {
        obj = {}
        obj.requestID = requestsByCustomer[i]._id;
        if ( requestsByCustomer[i].quotes[0] ) {
            obj.discount = requestsByCustomer[i].quotes[0].Pricequote;
            let tempDealer = await userDB.findOne( { _id: requestsByCustomer[i].quotes[0].dealerID } )
            obj.dealerName = tempDealer.firstName + tempDealer.lastName
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
        let customerData = await customerDB.findOne( { _user: requestData.buyerID } ); // can get customer from x-auth
        customerData.ownedCars.push( { carID: requestData.carID, requestID: requestData._id, dealerID: requestData.quotes[0].dealerID } );
        dealerData.soldCars.push({ carID: requestData.carID, requestID: requestData._id,buyerID:requestData.buyerID});
        await customerData.save( function ( err ) {
            if ( err ) throw err;
        }
        )
        await dealerData.save( function ( err ) {
            if ( err ) throw err;
        }
        )
        await requestData.save( function ( err ) {
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
        let tempDealer = await userDB.findOne( { _id: broughtCars[i].dealerID } )
        obj.dealerName = tempDealer.firstName + tempDealer.lastName
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

router.get( '/getQuotableCars', authenticate, awaitHandler( async ( req, res ) => {
    let data = await carDB.find();
    let quotable;
    let dataCustomer = await customerDB.findOne({_user:req.user._id});
    for ( let i = 0; i < data.length; i++ ) {
       if(dataCustomer.quote_tokens == 0){
           quotable=false;
       }
       else{
        let flag = await requestDB.findOne( { carID: data[i]._id, buyerID: req.user._id, sold: false } );
        quotable = true
        if ( flag ) {
            quotable = false
        }}
        let temp = { ...data[i]._doc }
        data[i] = { ...temp, quotable: quotable }
    }
    res.send( data );
} ) )
//to get a single request details for testing
router.get( '/getARequestDetails', awaitHandler( async ( req, res ) => {
    let data = await requestDB.findOne( { _id: req.query.requestID } );
    res.send( data );
} ) )

router.get( '/getNoOfTokens',authenticate, awaitHandler( async ( req, res ) => {
    let data = await customerDB.findOne( { _user: req.user._id } ); 
    let tokens = data.quote_tokens;
    res.send({tokens});
} ) )

router.post(
    '/buyTokens',authenticate,
    awaitHandler( async ( req, res ) => {
        let data = await customerDB.findOne( {_user: req.user._id} );
        console.log(data);
        let token = req.body.tokens;
        data.quote_tokens=data.quote_tokens+parseInt(token);
        await data.save( function ( err ) {
            if ( err ) throw err;
            console.log( 'tokens updated.' );
            res.send( "tokens updated" +"  "+ data.quote_tokens );
        })
    }))
       
    
module.exports = router