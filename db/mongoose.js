var mongoose = require( 'mongoose' );
require('../config/config')

mongoose.Promise = global.Promise;
mongoose.connect( process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true } );

module.exports = { mongoose };