let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let car = require( '../models/car' );
let requestDB = require('../models/request')
let carCostsDB = require('../models/carCost')
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
       let data =  await car.findOne({ manufacturer: req.body.manufacturer,
        model: req.body.model,
        trim: req.body.trim,
        year: req.body.year});
        if(data._id){
            let data1 = await carCostsDB.findOne({carID:data._id,dealerID:req.user._id});
            if(data1._id){
                data1.carCost = req.body.cost;
            }
        }     
       let carData = new car({
        manufacturer: req.body.manufacturer,
        model: req.body.model,
        trim: req.body.trim,
        year: req.body.year,
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
    let data = await car.find( );
    res.send( data );
} ) )

module.exports = router