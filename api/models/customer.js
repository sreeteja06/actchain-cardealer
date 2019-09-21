const validator = require('validator');
const mongoose = require( 'mongoose' );
let CustomerSchema = new mongoose.Schema({
    SSN:{
        type: String,
        required: true,
        unique : true,
        minlength:2
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    ownedCars: {
        type:Array,
        
    }
});


module.exports = mongoose.model( 'customer', CustomerSchema );
