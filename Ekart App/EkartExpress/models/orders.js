const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
var smallProductsSchema = require('./smallproduct')

var orderSchema = new mongoose.Schema({
    user : {
        type:ObjectId,
        ref:"User"
    },
    products:[smallProductsSchema]
    
},{timestamps:true});

module.exports = mongoose.model("Order",orderSchema)