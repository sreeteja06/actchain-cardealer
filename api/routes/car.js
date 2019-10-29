let express = require('express')
let router = express.Router()
let { mongoose } = require('../db/mongoose');
require('../config/config');
let customerDB = require('../models/customer');
let car = require('../models/car');
let requestDB = require('../models/request')
let carCostsDB = require('../models/carCost')
let { authenticate } = require('../middleware/authentication')
const awaitHandler = fn => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};
router.get('/', awaitHandler(async (req, res) => {
    res.send('You are in carInfo route')
}))

router.post(
    '/createCar', authenticate,
    awaitHandler(async (req, res) => {
        let data = await car.findOne({
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            trim: req.body.trim,
            year: req.body.year
        });
        if (data) {//if car already exists check the carCostDB 
            let data1 = await carCostsDB.findOne({ carID: data._id, dealerID: req.user._id });
            if (data) { //if in carCostDB also has a record update its cost
                data1.carCost = req.body.cost;
                data1.save(function (err) {
                    if (err) throw err;
                });
            }
            else { //if no record in carCostDB then insert a new record
                let newCar = new carCostsDB({
                    carID: data._id,
                    dealerID: req.user._id,
                    carCost: req.body.cost
                })
                newCar.save(function (err) {
                    if (err) throw err;
                });
            }
        }
        let carData = new car({ //create new car
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            trim: req.body.trim,
            year: req.body.year,
        });
        carData.save(function (err, car) {
            if (err) throw err;
            let newCar = new carCostsDB({ //create new carCost
                carID: car._id,
                dealerID: req.user._id,
                carCost: req.body.cost
            })
            newCar.save(function (err) {
                if (err) throw err;
                console.log("record saved in costCarDB")
                res.send(newCar);
            });
        }
        )
    }
    ));

    
//get car
router.get('/getCar', authenticate, awaitHandler(async (req, res) => {
    let data = await car.findOne({ _id: req.query.carID });
    res.send(data);
}))

router.get('/getAllCars', authenticate, awaitHandler(async (req, res) => {
    let data = await car.find();
    res.send(data);
}))

router.get( '/getManufs', authenticate, awaitHandler( async ( req, res ) => {
    let data = await car.find().distinct('manufacturer');
    res.send( data );
} ) )

router.get( '/getModels', authenticate, awaitHandler( async ( req, res ) => {
    let data = await car.find( { manufacturer: req.query.manufacturer } ).distinct( 'model' );
    res.send( data );
} ) )

router.get( '/getTrims', authenticate, awaitHandler( async ( req, res ) => {
    let data = await car.find( { manufacturer: req.query.manufacturer, model: req.query.model } ).distinct( 'trim' );
    res.send( data );
} ) )

router.get( '/getYears', authenticate, awaitHandler( async ( req, res ) => {
    let data = await car.find( { manufacturer: req.query.manufacturer, model: req.query.model, trim:req.body.trim } ).distinct( 'year' );
    res.send( data );
} ) )

router.get( '/getBestDeal', authenticate, awaitHandler( async ( req, res ) => {
    let data = await car.findOne( { manufacturer: req.query.manufacturer, model: req.query.model, trim: req.body.trim, year: req.body.year } );
    let carCosts = carCostsDB.find( { carID: data._id } ).sort( {carCost: 1}).limit(1);
    res.send( carCosts );
} ) )

module.exports = router