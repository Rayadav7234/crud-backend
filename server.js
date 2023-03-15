require('dotenv').config()
const express = require ('express');
const app = express()
const mongoose =require ('mongoose');
const  connection= require('./config/connection');
const cors= require('cors')
const userRoutes= require('./Routes/routes')
const bodyParser = require ('body-parser')
const multer = require ('multer')
const path = require ('path')

app.use(cors())

app.use(express.json());

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use("/uploads",express.static("uploads"))
http://localhost:4000/uploads$user.Uploadimage


app.use('/api/user',userRoutes)


app.listen(process.env.PORT,()=>{
    console.log("app listen the port no ",process.env.PORT)
})