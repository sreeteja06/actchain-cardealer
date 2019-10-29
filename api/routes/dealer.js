let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let dealerDB = require( '../models/dealer' );
let userDB = require( '../models/user' )
let car = require( '../models/car' );
let soldCarsDB = require( '../models/soldCars' )
let carCostDB = require( '../models/carCost' )
let carDB = require('../models/car')
let { authenticate } = require( '../middleware/authentication' )
const awaitHandler = fn => {
    return async ( req, res, next ) => {
        try {
            await fn( req, res, next );
        } catch ( err ) {
            next( err );
        }
    };
};

router.get( '/getDealerCars', authenticate, awaitHandler( async ( req, res ) => {
    let carCosts = ( await carCostDB.find( { dealerID: req.user._id } ) )
    console.log( carCosts );
    let arr = []
    let obj = {}
    for ( let i = 0; i < carCosts.length; i++ ) {
        obj = {}
        let car = await carDB.findOne( { _id: carCosts[i].carID } )
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.cost = carCosts[i].carCost;
        arr.push( obj )
    }
    res.send( arr );
} ) )

router.get( '/getSoldCars', authenticate, awaitHandler( async ( req, res ) => {
    let soldCars = ( await soldCarsDB.find( { dealerID: req.user._id } ) )
    console.log( soldCars );
    let arr = []
    let obj = {}
    for ( let i = 0; i < soldCars.length; i++ ) {
        obj = {}
        let customer = ( await userDB.findOne( { _id: soldCars[i].soldTO } ) )
        obj.customerName = customer.firstName + " " + customer.lastName
        let carDb = await carCostDB.findOne( { _id: soldCars[i].carCostID } )
        let car = await carDB.findOne( { _id: carDb.carID } )
        obj.manufacturer = car.manufacturer
        obj.model = car.model
        obj.trim = car.trim
        obj.year = car.year
        obj.cost = carDb.carCost
        arr.push(obj)
    }
    res.send(arr);
} ) )

router.get( '/', awaitHandler( async ( req, res ) => {
    res.send( 'You are in dealer route' )
} ) )




router.get( '/addCar', authenticate, awaitHandler( async ( req, res ) => {
    let requested = await requestDB.find( { sold: false } );
    let detailsArray = [];
    let details = {};
    let dealerData = await dealerDB.findOne( { _user: req.user._id } );
    let access = [];
    access = dealerData.manufacturerAccess;
    for ( let i = 0; i < requested.length; i++ ) {
        let carData = await carDB.findOne( { _id: requested[i].carID } );

        let userData = await userDB.findOne( { _id: requested[i].customerID } );
        if ( access.includes( carData.manufacturer ) ) {
            details = {};
            details.requestID = ( requested[i]._id );
            details.carID = ( requested[i].carID );
            details.name = userData.firstName + " " + userData.lastName;
            details.manufacturer = carData.manufacturer;
            details.model = carData.model;
            details.trim = carData.trim;
            details.year = carData.year;
            details.Msrp = carData.Msrp;
            if ( requested[i].quotes ) {
                for ( let m = 0; m < requested[i].quotes.length; m++ ) {
                    if ( requested[i].quotes[m].dealerID == req.user._id.toString() ) { //!replace with dynamic dealerid(userid of dealer)
                        details.rank = requested[i].quotes[m].rank;
                        details.Pricequote = requested[i].quotes[m].Pricequote;
                    }
                }
            }
            detailsArray.push( details );
            deatils = {}
        }
    }
    res.send( detailsArray );
} ) )


module.exports = router