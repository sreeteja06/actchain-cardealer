
const validator = require('validator');

const mongoose = require( 'mongoose' );
let dealerSchema = new mongoose.Schema({
    dealerRegId:{
        type: String,
        required: true,
        unique : true
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    manufacturerAccess: {
        type:Array
    },
    soldCars: {
        type:Array,
        
    }
});


module.exports = mongoose.model( 'dealer', dealerSchema );
