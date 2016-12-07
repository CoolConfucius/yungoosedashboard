var mongoose = require('mongoose');

var YungooseSchema = new mongoose.Schema({
 name: String,
 age: Number
})

var Yungoose = mongoose.model('Yungoose', YungooseSchema); 
