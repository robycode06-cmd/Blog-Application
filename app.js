import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import router from "./routes/user.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import checkForAuthentication from "./middleware/authentication.js";
import blog_router from "./routes/blog.js";


//handler
const app = express();
const PORT = process.env.PORT|| 8000;
//connector to mongodb
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Mongodb Connected")})
.catch((err)=>{console.log("Mongo error",err)});
//setting up views
app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.resolve('./public')))
app.use(checkForAuthentication);
app.use('/',router);
app.use('/blog',blog_router);






//listen
app.listen(PORT,()=>{console.log("Server is started at port",PORT)});