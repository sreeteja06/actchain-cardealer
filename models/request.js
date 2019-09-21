const mongoose = require( 'mongoose' );
let requestSchema = new mongoose.Schema({
    
    carID:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
        
    },
    customerID:{
        type:  mongoose.Schema.Types.ObjectId,
        required: true,
       
    },
    quotes:[{
        dealerID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        Pricequote: {
            type: Number,
            required: true
        },
        rank :{
            type:Number,
            required : true,    
        }
    }]  
});
module.exports = mongoose.model( 'request', requestSchema );
