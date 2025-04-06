const jwt =require("jsonwebtoken")
const User = require("../models/User");
require('dotenv').config()

exports.authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Unauthorized - No Token" });
        // console.log(token)
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        if (!decoded) return res.status(401).json({ message: "Unauthorized - Invalid Token" });


        const user = await User.findOne({ _id: decoded.id, token });
        if (!user) return res.status(401).json({ message: "Unauthorized - Token Expired" });

        req.user = user;
        next();
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized - Token Error" });
    }
};


exports.isAdmin=async(req,res,next)=>{
    if(req.user.role!=="Admin"){
        return res.status({success:false,message:"Forbidden - Admin Only"})
    }

    next();
}

exports.isStudent=async(req,res,next)=>{
    if(req.user.role!=="Student"){
        return res.status({success:false,message:"Forbidden - Students Only"})
    }

    next();
}

exports.isTeacher=async(req,res,next)=>{
    if(req.user.role!=="Teacher"){
        return res.status({success:false,message:"Forbidden - Teachers Only"})
    }

    next();
}