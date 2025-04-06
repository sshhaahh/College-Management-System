const User=require("../models/User");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")
require("dotenv").config()
exports.signUp=async(req,res)=>{
    try{
        const {name,email,password,role}=req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({
                success:false,
                message:"All field are required!"
            })
        }   

        const alreadyUser=await User.findOne({email});
        if(alreadyUser){
            return res.status(403).json({
                success:false,
                message:"Email already found!"
            })
        }

        const newUser=await User.create({name,email,password,role});

        const payload={
            id:newUser._id,
            role:newUser.role,
        }

        const secret=process.env.SECRET_KEY;


        const token=jwt.sign(payload,secret,{expiresIn:"1h"})



        return res.status(201).json({
            success:true,
            message:"Successfully User Created.",
            user:newUser,
            token

        })
        


    }catch(e){
        console.log("failed to create User.",e);
        return res.status(500).json({
            success:false,
            message:"failed to create user!"
        })
    }
}



exports.logIn=async(req,res)=>{
    try{

        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"All fields required!"
            })
        }

        const user=await User.findOne({email});

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not valid."
            })
        }

        const isPassValid = await bcrypt.compare(password,user.password);

        if(!isPassValid){
            return res.status(401).json({
                success:false,
                message:"Invalid Password!"
            })
        }


        const payload = { id: user._id, role: user.role };
        const secret = process.env.SECRET_KEY || "default_secret";
        const token = jwt.sign(payload, secret, { expiresIn: "1h" });

        user.token=token;
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Login Successfull.",
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            },
            token
        })

    }catch(e){
        console.log("Failed to login",e);
        return res.status(500).json({
            success:false,
            message:"Failed to login!"
        })
    }
}

exports.logOut = async (req, res) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(400).json({ message: "Token required!" });

        const user = await User.findOne({ token });
        if (!user) return res.status(401).json({ message: "Invalid token!" });

        
        user.token = null;
        await user.save();

        res.json({ success: true, message: "Logout successful!" });

    } catch (e) {
        res.status(500).json({ message: "Logout failed!", error: e });
    }
};
