const userModel=require("../model/UserModel")
const jwt=require("jsonwebtoken")
async function userRegister(req,res)
{
const {name,password,email}=req.body
const isExist=await userModel.findOne({
    email:email,
})
if(isExist){
    return res.status(422).json({
        message:"User already exist with this email"
    })
}
const user=await userModel.create({
    email,password,name
})

const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
res.cookie("token",token)
res.status(201).json({
    message:"Registered Successfully",
    token

}

)
}

async function userLoginController(req,res)
{
    
const {email,password}=req.body
const user=await userModel.findOne({email}).select("+password")
if(!user){
    return res.status(404).json({
        message:"User not found with this email"
    })

}
const isValidPassword= await user.comparePassword(password)
if(!isValidPassword){
    return res.status(401).json({
        message:"password is invalid"
    })
}
const token=jwt.sign({userId:user._id},process.env.JWT_SECRET)
res.cookie("token",token)
res.status(200).json({
    message:"Login successfully",
    token
}

)
}
module.exports={
    userLoginController,
    userRegister
}