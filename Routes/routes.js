const express= require('express')
const multer =require ('multer')
const { getallUser ,createUser,deleteUser, updateUser , upload }= require('../controller/userContoroller') 


const router =express.Router(); 

router.get('/users',getallUser);


router.post('/add',upload,createUser);

router.delete('/:id',deleteUser)
 

router.put('/:id',updateUser)





module.exports=router