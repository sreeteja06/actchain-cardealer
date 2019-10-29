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
    }
  
});
carSchema.index({manufacturer:1,model:1,trim:1,year:1},{unique:true});

module.exports = mongoose.model( 'car', carSchema );
//request model carid,customerId