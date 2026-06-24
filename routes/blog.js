import express from "express";
import multer from "multer";
import path from "path";
import BLOG from "../models/blog.js";
import COMMENT from "../models/comment.js";

const blog_router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null,filename);
  }
})
const upload = multer({ storage: storage })
blog_router.get('/',(req,res)=>{
    return res.render("addBlog",{
        user:req.user
    })
})
blog_router.post('/',upload.single('coverImage'),async(req,res)=>{
    const {title,body} = req.body;
    const blog = await BLOG.create({
        title,
        body,
        coverImageURL:`/uploads/${req.file.filename}`,
        createdBy: req.user._id,
        
    })
    return res.redirect(`/blog`);
})

blog_router.get('/:id',async (req,res)=>{
    const blog = await BLOG.findById(req.params.id);
    const comments = await COMMENT.find({blog:req.params.id}).populate(
      "createdBy"
    );
    
    return res.render("blog",{
      user:req.user,
      blog,
      comments
    })
})

blog_router.post('/:id',async(req,res)=>{
  const {content} = req.body;
  await COMMENT.create({
    content,
    blog:req.params.id,//params ka use tb krte hai jb url mai id de rkhi ho
    createdBy:req.user._id
  })
  return res.redirect(`/blog/${req.params.id}`);
})
export default blog_router;