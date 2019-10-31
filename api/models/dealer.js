
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
    dealership_name:{
        type:string
    },
    Brand:{
        type:string
    },
    website:{
        type:string
    },
    contact_name:{
        type:string,
        required:true
    },
    contact_email:{
        type:string,
        required:true
    },
    contact_title:{
        type:string,
        required:true
    },
    contact_mobile:{
        type:string,
        required:true
    },
    soldCars: {
        type:Array,
        
    }
});


module.exports = mongoose.model( 'dealer', dealerSchema );
