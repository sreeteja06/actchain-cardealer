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
    name:{
        type:string,
        required:true
    },
    email:{
        type:string,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    quote_tokens:{
        type:Number
    },
    ownedCars: {
        type:Array,
        
    }
});


module.exports = mongoose.model( 'customer', CustomerSchema );
