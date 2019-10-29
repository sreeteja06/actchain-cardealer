const mongoose = require('mongoose');
let soldCarsSchema = new mongoose.Schema({
    
    dealerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    carCostID:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    soldTO :{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
   
});

module.exports = mongoose.model('soldCars', soldCarsSchema);
