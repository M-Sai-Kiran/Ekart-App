const User = require('../models/user')
const Cart = require('../models/cart')

exports.signin = (req,res)=>{
    User.findOne(req.body,(err,result)=>{
        return res.json(result)
    })
}

exports.register = (req,res)=>{
    var user = new User(req.body);
    user.save((err,resultuser)=>{
        if(err){
            return res.status(400).json({
                err : "unable to save user to database"
            })
        }
        return res.json(resultuser);
    })
}

exports.getAllEmailIds = (req,res)=>{
    User.find({},'email',(err,result)=>{
        return res.json(result)
    })
}

exports.updateUser = (req,res)=>{
    User.updateOne(req.body.id,req.body.updateObj,(err,result)=>{
        if(err) return res.json({message : "Some error occured while updating"} )
        return res.json({message : "updated successfully"} )
    })
}

exports.addToCart = (req,res)=>{
    var arr = req.body;
    Cart.update({userid:arr.userid,productId:arr.productId},{$set: arr},{upsert:true},(err,result)=>{
        res.json(result);
    });
}

exports.getCart = (req,res)=>{
    Cart.find(req.body,{userid:1,_id:0, productId:1, productName:1, productImage:1, quantity:1,price:1},(err,result)=>{
        return res.json(result)
    })
}

exports.deleteItem=(req,res)=>{
    Cart.deleteMany(req.body,(err,result)=>{
        return res.json(result)
    })
}