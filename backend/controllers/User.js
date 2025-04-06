const User=require('../models/User')

exports.showAllStudents=async(req,res)=>{
    try{
        const students=await User.find({role:"Student"},"-password");

        return res.status(201).json({
            success:true,
            message:"Successfully feched.",
            data:students,
        })
    }catch(e){
        console.log("Failed to fetched students data.",e);
        return res.status(500).json({
            success:false,
            message:"failed to fetch dtudents data."
        })
    }
}

exports.showAllTeachers=async(req,res)=>{
    try{
        const teachers=await User.find({role:"Teacher"},"-password").populate("course", "name duration");

        return res.status(201).json({
            success:false,
            message:"Successfully feched.",
            data:teachers,
        })
    }catch(e){
        console.log("Failed to fetched teachers data.",e);
        return res.status(500).json({
            success:false,
            message:"failed to fetch teachers data."
        })
    }
}


exports.deleteUser=async(req,res)=>{
    try{
        const {id} = req.params;

        const deletedUser=await User.findByIdAndDelete(id);
        return res.status(201).json({
            success:true,
            message:"Successfully Deleted User.",
            data:deletedUser,
        })
    }catch(e){
        return res.status(500).json({
            success:false,
            message:"FAiled to delete user!"
        })
    }
}