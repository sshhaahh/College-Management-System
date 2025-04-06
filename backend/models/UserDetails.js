const mongoose=require("mongoose")

const detailsSchema=new mongoose.Schema({

    gender:{
        type:String,
        enum:["male","female"],
    },
    address:{
        type:String,
        trim:true,

    },dob:{
        type:String,
        trim:true,
    }
},
{
    timestamps:true,
})

module.exports=mongoose.model("PersonalDetails",detailsSchema);
