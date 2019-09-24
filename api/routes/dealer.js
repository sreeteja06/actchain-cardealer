let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let dealerDB = require( '../models/dealer' );
let userDB = require( '../models/user' )
let car = require( '../models/car' );
let requestDB = require( '../models/request' )
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


router.get( '/', awaitHandler( async ( req, res ) => {
    res.send( 'You are in dealer route' )
} ) )

router.post(
    '/quoteDiscount', authenticate,
    awaitHandler( async ( req, res ) => {
        console.log( req.body )
        let dealer = req.user._id, point;
        console.log( "TCL: dealer", dealer )
        let flag = false;
        var quote = { "dealerID": dealer, "Pricequote": req.body.Pricequote };
        let requested = await requestDB.findOne( { _id: req.body.requestID } );
        for ( let i = 0; i < requested.quotes.length; i++ ) {
            if ( requested.quotes[i].dealerID == dealer.toString() ) {
                flag = true;
                point = i;
            }
        }
        if ( flag == false ) {
            requested.quotes.push( quote );
        }
        if ( flag == true ) {
            console.log( "succesfully updated" );
            requested.quotes[point].Pricequote = req.body.Pricequote;
        }
        console.log( requested.quotes )
        //sorting the array
        let n = requested.quotes.length;
        for ( let i = 0; i < n; i++ ) {
            for ( let j = 1; j < ( n - i ); j++ ) {
                if ( requested.quotes[j - 1].Pricequote < requested.quotes[j].Pricequote ) {
                    // let temp = requested.quotes[j - 1];
                    // requested.quotes[j - 1] = requested.quotes[j];
                    // requested.quotes[j] = temp;
                    [requested.quotes[j], requested.quotes[j - 1]] = [requested.quotes[j - 1], requested.quotes[j]]
                }
            }
        }
        //calculating rank
        for ( let k = 0; k < requested.quotes.length; k++ ) {
            requested.quotes[k].rank = k + 1;
        }
        requested.markModified( 'quotes' );
        requested.save( function ( err ) {
            if ( err ) throw err;
            console.log( 'car successfully saved.' );
        } )
        res.send( requested );
    } ) );
router.get( '/market', authenticate, awaitHandler( async ( req, res ) => {
    let requested = await requestDB.find( { sold: false } );
    let detailsArray = [];
    let details = {};
    let dealerData = await dealerDB.findOne( { _user: req.user._id } );
    let access = [];
    access = dealerData.manufacturerAccess;
    for ( let i = 0; i < requested.length; i++ ) {
        let carData = await car.findOne( { _id: requested[i].carID } );

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
                    }
                }
            }
            detailsArray.push( details );
            deatils = {}
        }
    }
    res.send( detailsArray );
} ) )

router.post( '/addSubscription', authenticate, awaitHandler( async ( req, res ) => {
    let dealerData = await dealerDB.findOne( { _user: req.user._id } ); // replace req.body.dealer with user._id
    if(!dealerData.manufacturerAccess.includes(req.body.subscribe)){
        dealerData.manufacturerAccess.push( req.body.subscribe );
        dealerData.save( function ( err ) {
            if ( err ) throw err;
            res.send( dealerData );
        } )
    }else {
        res.end(501)
     }
} ) )

router.get( '/subscriptions', authenticate, awaitHandler( async ( req, res ) => {
    let dealerData = await dealerDB.findOne( { _user: req.user._id } );
    let subscriptions = dealerData.manufacturerAccess;
    res.send(subscriptions);
} ) )
module.exports = router