const express = require('express');
const router = express.Router();  
const {signin,register,getAllEmailIds,updateUser,addToCart,getCart,deleteItem} = require('../controllers/ekartroutes')

router.post('/signin',signin)
router.post('/register',register)
router.get('/allemail',getAllEmailIds)
router.post('/updateuser',updateUser)
router.post('/addtocart',addToCart)
router.post('/getcart',getCart)
router.post('/deleteitem',deleteItem)

module.exports = router;