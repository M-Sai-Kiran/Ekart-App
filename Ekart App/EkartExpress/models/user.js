const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        maxlength:32,
        trim:true
    },
    email :{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:Number,
        default:0
    },
    mobile :{
        type:String,
        maxlength:10
    }
})

userSchema.methods={
    authenticate : function(providedpassword){
        return this.password === providedpassword;
    }
}
module.exports = mongoose.model("User",userSchema);