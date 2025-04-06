const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,

    },
    password:{
        type:String,
        trim:true,
        required:true,
    },
    role:{
        type:String,
        enum:["Student","Teacher","Admin"],
        required:true,
    },
    personalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Details"
    },
    token:{
        type:String
    },
    course:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ]

},
{
    timestamps:true
})


const bcrypt=require("bcrypt");

userSchema.pre('save', async function(next){
    if(!this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})


module.exports=mongoose.model("User",userSchema);

