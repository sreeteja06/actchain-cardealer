
const validator = require('validator');

const mongoose = require( 'mongoose' );
let dealerSchema = new mongoose.Schema({
    dealerRegId:{
        type: String,
        required: true,
    },
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    dealership_name:{
        type:String,
        required:true
    },
    Brand:{
        type:String,
        required:true
    },
    website:{
        type:String
    },
    contact_name:{
        type:String,
        required:true
    },
    contact_email:{
        type:String,
        required:true
    },
    contact_title:{
        type:String,
        required:true
    },
    contact_mobile:{
        type:String,
        required:true
    },
    soldCars: {
        type:Array,
        
    }
});


module.exports = mongoose.model( 'dealer', dealerSchema );
