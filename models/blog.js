import mongoose, { Schema } from "mongoose";
const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    body:{
        type:String,
        required:true,
    },
    coverImageURL:{
        type:String,
        required:false,
    },
    createdBy:{
        type: Schema.Types.ObjectId,//ab automatically ye createdBy hai na vo users ki trf show karega
        ref:'user'
    }

},{timestamps:true})

const BLOG = mongoose.model('blogs',blogSchema)//this firs name is very important this('model_name',schema);
//we give the ref to the model name in the string part 'blogs'
export default BLOG;