const mongoose = require('mongoose');
let requestSchema = new mongoose.Schema({

    carID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,

    },
    quotes: [{
        dealerID: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        Pricequote: {
            type: Number,
            required: true
        },
        rank: {
            type: Number,
            required: true,
        }
    }],
    sold: {
        type: Boolean,
        required: true,
        default: false
    }
});
module.exports = mongoose.model('request', requestSchema);
