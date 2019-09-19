const mongoose = require( 'mongoose' );

let carSchema = new mongoose.Schema({
    manufacturer:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    trim:{
        type: String,
        required: true
    },
    year:{
        
        type: Number,
        required: true
    },
    Msrp:{
        type:Number,
        required:true
    },
});


module.exports = mongoose.model( 'car', carSchema );
//request model carid,customerId