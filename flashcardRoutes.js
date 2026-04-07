const express=require("express");
const Flashcard=require("../models/Flashcard");

const router=express.Router();



router.post("/",async(req,res)=>{

const card=new Flashcard(req.body);

await card.save();

res.json(card);

});



router.get("/",async(req,res)=>{

const cards=await Flashcard.find();

res.json(cards);

});

module.exports=router;