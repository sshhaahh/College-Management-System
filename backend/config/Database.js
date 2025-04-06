const mongoose=require("mongoose");
require("dotenv").config();
const dbConnection=()=>{
    mongoose.connect(process.env.URL)
    .then(()=>console.log("Database connected successfully."))
    .catch((e)=>console.log("Failed to connect Database. : ",e))
}

module.exports=dbConnection;