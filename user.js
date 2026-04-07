const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

name:String,
email:String,
password:String,
streak:{type:Number,default:0},
lastLogin:Date

});

module.exports=mongoose.model("User",userSchema);