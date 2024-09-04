import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../middleware/catchAsyncErrors.js";
import { User } from "../models/userModel.js";
import { sendToken } from "../utils/jwtToken.js";


//register a new user 

export const createNewUser = async (req , res , next) =>{
    const {name , email , password} = req.body ; 

    const user = await User.create({
        name , email , password , avatar:{
            public_id: "this is a sample id" , 
            url : "profilePictureURL"
        }
    }); 

    sendToken(user , 201 , res);
};


//login user
export const loginUser = asyncHandler(async (req , res , next) => {
    const {email , password} = req.body ; 

    if(!email || !password){
        return next(new ErrorHandler("please enter Email and password" , 400));
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("invalid password or email" , 400));

    }

    const isPassword = await user.comparePassword(password); 

    if(!isPassword){
        return next(new ErrorHandler("invalid email or password" ))
    }

    sendToken(user , 200 , res);

});

export const logoutUser = asyncHandler(async(req , res , next) => {

    res.cookie("token" , null , {
        expires: new Date(Date.now()) , 
        httpOnly:true ,
    })     

    res.status(200).json({
        success:true , 
        message:"logged Out"
    })
});

// forgot password 