const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const mongoose=require('mongoose')
function ConnectDB(){
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Mongodb connected successfully")
}
)
.catch((err)=>{
    console.log("mongodb connection error: ",err)
    process.exit(1);
})
}
module.exports=ConnectDB