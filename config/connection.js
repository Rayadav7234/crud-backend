const mongoose =require ('mongoose');
mongoose.connect(process.env.MONGO_URI)
    //connect the mongodb 
    .then(( )=>{
        console.log("db connected ")

    })
    .catch((error)=>{
        console.log(error)

    })

    

