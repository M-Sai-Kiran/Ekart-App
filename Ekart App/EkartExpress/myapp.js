//Imports
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = process.env.PORT || 7000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const ekartRoutes = require('./routes/ekartroutes');

//middlewears
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

//db connection
mongoose.connect(process.env.CONNECTION_STRING,{useNewUrlParser:true}).then(()=>{
    console.log("DB CONNECTED")
})

//routes
app.use('/api',ekartRoutes);


//server start
app.listen(port,()=> console.log(`express server running on port ${port}`))