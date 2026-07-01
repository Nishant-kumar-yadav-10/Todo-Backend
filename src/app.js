const express =require('express');
const cors=require('cors')
const todoRoutes=require("../src/routes/TodoRoutes")
const cookieParser=require("cookie-parser")
const userRoutes=require("./routes/userRoutes")
const app=express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth',userRoutes)
app.use("/api", todoRoutes);


module.exports=app;