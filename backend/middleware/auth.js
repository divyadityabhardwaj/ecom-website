import { User } from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken"

export const isAuthenticatedUser = asyncHandler(async(req , res , next) => {
    const {token} = req.cookies ; 

    if(!token){
        return next(new ErrorHandler("Please login to access this resource" , 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECRET);
        
    req.user = await User.findById(decodedData.id);  

    next() ; 

})

export const authorizeRoles = (...roles)=>{

    return (req , res , next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`Roles: ${req.user.role} is not allowed to access this resource` , 403));
        }

        next();
    };
     
};