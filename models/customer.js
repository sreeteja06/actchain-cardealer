const validator = require('validator');
const mongoose = require( 'mongoose' );
let CustomerSchema = new mongoose.Schema({
    
    firstName:{
        type: String,
        required: true,
        unique : true
    },
    lastName:{
        type: String,
        required: true,
        unique : true
    },
    SSN:{
        type: Number,
        required: true,
        unique : true,
        minlength:2

    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
           validator: validator.isEmail,
           message: '{VALUE} is not a valid email'
        }
     },
     password: {
        type: String,
        require: true,
        minlength: 6
     },
});


module.exports = mongoose.model( 'customer', CustomerSchema );
