import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({

    name:{
        type : String , 
        required: [true , "please enter your name"] , 
        maxLength: [30 , "name cannot exceed 30 characters"] , 
        minlength: [4 , "name should have more than 5 characters"]
    } , 
    email : {
        type : String , 
        required: [true , "please enter your email"] , 
        unique : [true , "emaila already linked with an account"] , 
        validate: [validator.isEmail , "please enter a valid email "]
    } , 
    password : {
        type: String , 
        required: [true , "please enter password"] , 
        minlength: [8 , "password should be atleast 8 characters"] , 
        //so that pass does not show up in find method 
        select: false , 
    } , 
    avatar :{
        public_id : {
            type : String , 
            required : true 
        } , 
        url : {
            type : String , 
            required: true , 
        }
    } , 
    role: {
        type: String , 
        default : "user" , 

    } , 
    resetPasswordToken : String , 
    resetPasswordExpire: Date , 



}) ; 

userSchema.pre("save" , async function(next){
    if(!this.isModified("password")){
        return next() ; 
    }
    this.password = await bcrypt.hash(this.password , 10);
    next() ; 
})

//jwt token generate and store in cookie to login as registering 
userSchema.methods.getJWTToken = function() {
    return jwt.sign({id:this._id} , process.env.JWT_SECRET , {expiresIn:process.env.JWT_EXPIRE});
};


//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword , this.password); 
}

//generating password reset token 
userSchema.methods.getResetPasswordToken = function () {

    //generate token 
    const resetToken = crypto.randomBytes(20).toString("hex");

    //hasing and add to userSchema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now + 15 * 60 * 1000 ; 

    return resetToken ; 
};

export const User = mongoose.model("User" , userSchema) ; 
