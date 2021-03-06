let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let dealerDB = require("../models/dealer")
let car = require( '../models/car' );
let requestDB = require('../models/request')
let { authenticate } = require('../middleware/authentication')
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
    res.send('You are in carInfo route')
}))

router.post(
    '/createCar',authenticate,
    awaitHandler( async ( req, res ) => {
        
       let carData = new car({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        trim: req.body.trim,
        year: req.body.year,
        Msrp : req.body.Msrp,
    });
       carData.save(function(err) {
        if (err) throw err;
         
        console.log('car successfully saved.');
        res.send( carData );}
        )}
));
//get car
router.get('/getCar',authenticate,awaitHandler(async(req,res)=>{
    let data =  await car.findOne({_id: req.query.carID});  
  res.send(data);
}))

router.get( '/getAllCars',authenticate, awaitHandler( async ( req, res ) => {
    let dealer = await dealerDB.findOne({_user: req.user._id})
    let data = await car.find( {manufacturer: dealer.Brand} );
    res.send( data );
} ) )

module.exports = router