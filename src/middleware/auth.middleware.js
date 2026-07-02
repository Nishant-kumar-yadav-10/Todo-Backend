const userModel=require('../model/UserModel')
const tokenBlackListModel=require("../model/tokenBlacklistModel")
const jwt=require('jsonwebtoken')
async function authMiddleware(req,res,next){
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Unathorized access token is missing"
        })
    }
      const isBlackListed=await tokenBlackListModel.findOne({token})
    if(isBlackListed){
      return res.status(401).json({
        message:"token is invalid"
      })

    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded.userId);
        req.user=user;
        next()

    }catch(err){
return res.status(401).json({
    message:"Unathorized access, Token is invalid"
})
    }
}


module.exports={
    authMiddleware
}