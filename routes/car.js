let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let car = require( '../models/car' );
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
    res.send('You are in carInfo route')
}))

router.post(
    '/createCar',
    awaitHandler( async ( req, res ) => {
        
       let carData = new car({
        carName : req.body.carName,
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        trim: req.body.trim,
        year: req.body.year,
        Msrp : req.body.Msrp,
        

    });
       carData.save(function(err) {
        if (err) throw err;
         
        console.log('car successfully saved.');
        res.send( car );}
        )}
));
 
module.exports = router