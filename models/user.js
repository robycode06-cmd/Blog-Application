import mongoose from "mongoose";
import {createHmac,randomBytes} from "crypto";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImageURL:{
        type:String,
        default:'/images/default.svg'
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER',
    }
})

userSchema.pre('save',function (next){
    const user = this;//this is pointing to the current user
    if(!user.isModified("password")) return;
    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256",salt)
        .update(user.password)
        .digest("hex")
    this.salt = salt; //ye wo wala object wale salt ko yha wale salt sai badal rhe hai
    this.password = hashedPassword;

    next;
})
const User = mongoose.model('user',userSchema);
export default User;