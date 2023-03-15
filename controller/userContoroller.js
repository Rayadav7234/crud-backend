const User = require('../model/usermodel');
const multer =require('multer')
const path =require('path')
const mongoose=require('mongoose');
const { countDocuments } = require('../model/usermodel');
const { options, search } = require('../Routes/routes');


//console.log("directory :"+__dirname+"\\uploads");


//get and read api
const getallUser = async(req,res)=>{
 console.log(req.query)       
 const {  options } = req.query;
 const { page,limit,search,sorting} = options 
//console.log('hrlrlor--->',search);
 //const {Firstname ,Lastname , Email ,Phoneno}= user

// use serch keyword, and regex to work like a LIKE CLAUSE in MYSQL
 let filterObj = {$or: [{Firstname: {$regex: search}},{Lastname: {$regex: search}} ,{Email: {$regex: search }},{Phoneno: {$regex: search }}]}
 let sortObj = {Firstname:sorting}; // { }
 console.log("search",search);
  

 let skip = (page - 1) * limit;
 const totalCount = await User.countDocuments(filterObj);
  const users = await User.find(filterObj)
 .skip(skip)
 .limit(limit)
 .sort(sortObj)
  res.status(200).json({
users,
totalCount: totalCount

  })
} 





// Add user api
const createUser = async (req,res)=>{

  const {Firstname,Lastname,Email,Password,Gender,Phoneno} = req.body;
  const {filename} = req.file;
  try {
    const user = await User.create({Firstname,Lastname,Email,Password,Gender,Phoneno,Uploadimage:filename})
    res.status(200).json(user)
  }   
  catch (error){
    console.log('error',error)
   res.status(400).json({error: error.message})
  }
} 


//api delete user

const deleteUser = async( req,res)=>{
  const { id } =req.params
  //console.log("dksfjskdhks",req.params )

 if(!(mongoose.Types.ObjectId.isValid(id))){
   res.status(400).json({message:'no user details'});
  }

  const user = await User.findOneAndDelete({_id:id});
  if(!user){
    return res.status(400).json({error:'no user details '})
  }
  res.status(200).json({message:'delete succesfully'})
}


const updateUser =async (req, res)=>{
  const{ id } =req.params
 // console.log("fuydsugfudus",req.params)
if(!(mongoose.Types.ObjectId.isValid(id))){
  res.status(400).json({msg:'no find any user '})
}

const user = await User.findOneAndUpdate({_id:id},{
  ...req.body
  
});
if(!user){
  res.status(400).json({error:'no update any user'})
}
res.status(200).json({message:'Update succesfully'})

}


const upload = multer({
  storage:multer.diskStorage({
    destination: function(req,file,cb){
      cb(null, `uploads`)
    },
    filename: function(req,file,cb){
      cb(null , file.fieldname + "-" +Date.now() + ".jpg")
    }
  })
}).single("user_file");
 

module.exports={
    getallUser,
    createUser,
    deleteUser,
    updateUser,
    upload
}