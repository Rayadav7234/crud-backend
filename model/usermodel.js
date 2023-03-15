const mongoose = require("mongoose");
const  bcrypt = require ("bcrypt") 

const Schema = mongoose.Schema;

const userSchema = new Schema({
  Firstname: {
    type: String,
    require: true,
  },
  Lastname: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  Phoneno: {
    type: String,
    require: true,
  },
  Password: {
    type: String,
    require: true,
  },
  Gender: {
    type: String,
    require: true,
  },
  Uploadimage:{
    type:String
    
  }
});


userSchema.pre("save", async function (next){
  
 // console.log(`this is your current password  ${this.Password}`)
  this.Password = await bcrypt.hash(this.Password, 10);
 console.log(`this is your current password  ${this.Password}`)
  
  next();
})


module.exports = mongoose.model("User", userSchema);
