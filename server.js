const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const userRoutes=require("./routes/userRoutes");
const lessonRoutes=require("./routes/lessonRoutes");
const flashcardRoutes=require("./routes/flashcardRoutes");

const app=express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/microlearning");

mongoose.connection.on("connected",()=>{
console.log("MongoDB connected");
});

app.use("/api/users",userRoutes);
app.use("/api/lessons",lessonRoutes);
app.use("/api/flashcards",flashcardRoutes);

app.listen(5000,()=>{
console.log("Server running on port 5000");
});

const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);