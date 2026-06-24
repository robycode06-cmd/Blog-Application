import express from "express";
import { Router } from "express";
import User from "../models/user.js";
import {createHmac,randomBytes} from "crypto";
import { signInChecker,signUpCreater  } from "../controllers/user.js";
import { validateToken } from "../services/authentication.js";
import BLOG from "../models/blog.js";


const router = Router();

router.get('/',async(req,res)=>{
    const allBlogs = await BLOG.find({});//descending sort kr rhe hai
    return res.render('home',{
        user:req.user,
        blogs:allBlogs
    });
})

router.get('/signin',(req,res)=>{
    const token = req.cookies.token;
    if(!token){
        return res.render('signin')
    }
    try{
        const payload=validateToken(token);
        req.user = payload; //now req will create a new user object inside it and you can use it in every function
        return res.redirect('/');
    }
    catch(err){
        return res.render('signin')
    }
    
})
router.get('/signup',(req,res)=>{
    return res.render('signup');
})
router.post('/signin',signInChecker)
router.post('/signup',signUpCreater)
router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/');
})

export default router;