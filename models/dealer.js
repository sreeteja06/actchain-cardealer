
const validator = require('validator');

const mongoose = require( 'mongoose' );
let accessSchema = new mongoose.Schema({
    dealerRegId:{
        type: String,
        required: true,
        unique : true
        },
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


module.exports = mongoose.model( 'dealer', accessSchema );
