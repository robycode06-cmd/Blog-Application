import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        requried:true,
    },
    blog:{
        type: Schema.Types.ObjectId,//this is to create the relation between the collectionsm
        ref:'blogs'//ye model ka name hai 
    },
    createdBy:{
        type: Schema.Types.ObjectId,//ab automatically ye createdBy hai na vo users ki trf show karega
        ref:'user'
    }
},{timestamps:true})

const COMMENT = mongoose.model('comment',commentSchema)
export default COMMENT;