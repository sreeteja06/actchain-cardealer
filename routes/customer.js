let express = require( 'express' )
let router = express.Router()
let { mongoose } = require( '../db/mongoose' );
require( '../config/config' );
let customerDB = require( '../models/customer' );
let carDB = require( '../models/car' );
let requestDB = require('../models/request')
const { authenticate } = require('../middleware/authentication');
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
    res.send('You are in customer route')
}))

router.post(
    '/requestACar', authenticate,
    awaitHandler( async ( req, res ) => {
         
       let requestData = new requestDB({
        carID : req.body.carID,
        customerID: req.user._id,
        
    });
       requestData.save(function(err) {
        if (err) throw err;    
        console.log('car successfully saved.');
        res.send( requestData );}
        )}
));
 
module.exports = router