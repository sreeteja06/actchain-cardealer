const mongoose = require('mongoose');
let carCostsSchema = new mongoose.Schema({
    carID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    dealerID:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    carCost:{
        type: Number,
        required:true
    }
   
});
carCostsSchema.index({carID:1,dealerID:1},{unique :true})
module.exports = mongoose.model('carCosts', carCostsSchema);
