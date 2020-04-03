const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

var smallProductSchema = new mongoose.Schema({
    productId :{
        type:Number,
        required:true
    },
    quantity :{
        type:Number,
        required:true
    },
    name :{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
    
});

module.exports = mongoose.model("SmallProduct",smallProductSchema)