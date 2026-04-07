const express=require("express");
const bcrypt=require("bcryptjs");
const User=require("../models/User");

const router=express.Router();

/* REGISTER */

router.post("/register",async(req,res)=>{

const hashed=await bcrypt.hash(req.body.password,10);

const user=new User({
name:req.body.name,
email:req.body.email,
password:hashed
});

await user.save();

res.json(user);

});

/* LOGIN + STREAK SYSTEM */

router.post("/login",async(req,res)=>{

const user=await User.findOne({email:req.body.email});

if(!user){
return res.json({message:"User not found"});
}

const valid=await bcrypt.compare(req.body.password,user.password);

if(!valid){
return res.json({message:"Wrong password"});
}

/* STREAK SYSTEM */

const today=new Date();
const last=user.lastLogin;

if(last){

const diff=(today-last)/(1000*60*60*24);

if(diff<=1){
user.streak+=1;
}else{
user.streak=1;
}

}else{
user.streak=1;
}

user.lastLogin=today;

await user.save();

res.json(user);

});

module.exports=router;