const mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    userid : String,
    productId:Number,
    productName:String,
    productImage:String,
    quantity:Number,
    price:Number
    
},{timestamps:true});

module.exports = mongoose.model("Cart",cartSchema)