const mongoose=require("mongoose")
const tokenBlacklistSchema= new mongoose.Schema({
     token:{
        type:String,
        required:[true,"Token is required to BlackList"],
        unique:[true,"Token is already BlackListed"]
    },
},{
    timestamps:true
})
tokenBlacklistSchema.index({createdAt:1},{expireAfterSeconds:60*60*24*3})
const tokenBlacklistModel=mongoose.model("BlackList",tokenBlacklistSchema)
module.exports=tokenBlacklistModel