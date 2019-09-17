const mongoose = require( 'mongoose' );

let carSchema = new mongoose.Schema({
    
    carName:{
        type: String,
        required: true,
        unique : true
    },
    manufacturer:{
        type: String,
        required: true,
        unique : true
    },
    model:{
        type: String,
        required: true,
        unique : true
    },
    trim:{
        type: String,
        required: true,
        unique : true
    },
    year:{
        
        type: Number,
        required: true,
        unique : true
    },
    Msrp:{
        type:Number,
        required:true,
        unique : true
    },
});


module.exports = mongoose.model( 'car', carSchema );
//request model carid,customerId