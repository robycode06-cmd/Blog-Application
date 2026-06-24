import User from "../models/user.js";
import {createHmac,randomBytes} from "crypto";
import { createTokenForUser } from "../services/authentication.js";
import { error } from "console";


export async function signInChecker(req,res){
    const {email,password}=req.body;
    const user =await User.findOne({email});
    if(!user){return res.json({message:"not found"})}
    const salt = user.salt;
    const hashedPassword = createHmac("sha256",salt)
        .update(password)
        .digest("hex")
    if(hashedPassword === user.password){
        const token = createTokenForUser(user);
        res.cookie('token',token)
        return res.redirect('/')
    }else{
        return res.render('signin',{
            error:"Incorrect Email or Password"
        });//ye error property pass krenge in locals
    }
}


export async function signUpCreater(req,res){
    const {fullName,email,password}= req.body;//iska filhal User sai koi lena dena nhi hai
    const user = await User.findOne({email});
    if(user.email===email){return res.json({message:"email already exists"})}
    await User.create({
        fullName,
        email,
        password,
    });
    return res.redirect('/');
}