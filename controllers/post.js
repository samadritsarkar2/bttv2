const Post = require('../models/post');
const {IncomingForm} = require("formidable");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;


cloudinary.config({
    cloud_name: 'samadritsarkar',
    api_key: '989154123181162',
    api_secret: process.env.CLOUDINARY_SECRET
  });

exports.getPostbyId = (req,res, next, id) =>{
    Post.findById(id)
    .exec((err,post)=>{
        if(err){
            return res.status(400).json({
                error : "Post not found"
            });
        }
        req.post = post;
        next();
    })
}  


exports.createPost = (req, res) => {
  let form = new IncomingForm();
  form.keepExtensions = true;

  form.parse(req, async (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "Problem with image!!",
      });
    }
    // destructure the fields
    const { title, description } = fields;

    if (!title || !description) {
      return res.status(400).json({
        error : "Please include all fields",
      });
    }

    
    req.profile.salt = undefined;
    req.profile.encry_password = undefined;
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;

    let post = new Post(fields);

    post.user = req.profile;
    post.image = [];

    var photo = await cloudinary.uploader.upload(
      file.image.path,
      (err, result) => {
        if (err) {
          console.log("ERROR in img upload : ", err);
        } else {
          console.log("img uploaded");
        }
      }
    );
    post.image.push({
      url: photo.secure_url,
      public_id: photo.public_id,
    });

    post.save((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Saving Product failed in DB",
          errorMessage: err.message,
        });
      }
      return res.json(product);
    });
  });
};

exports.getPost = (req,res) => {
    return res.json(req.post)
}

exports.deletePost = async (req,res) => {

    if( req.profile.role || req.profile._id.toString() == req.post.user._id.toString())
    {
        Post.findById(req.post._id, (err, delPost) => {
          if (err) {
            return res.json({ error: "UNABLE to find/delete Post", err });
          }
        })
        .then(response => {
          cloudinary.uploader.destroy(response.image[0].public_id)
          .then(deleted =>{
            response.remove();
            return res.json({message : `Deleted post :- ${response.title}`})
          })
        })
        .catch(err => {
          return res.status(400).json({ error: "UNABLE to find/delete Post", err })
        })
    }
    else
    {return res.json({error : "ACCESS DENIED !! You cannot delete others post"})
    }

    
}

exports.getAllPost = (req,res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let skip = req.query.skip ? parseInt(req.query.skip) : 0 ; 
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Post
    .find()
    .skip(skip)
    .sort({createdAt: "desc"})
    .limit(limit)
    .exec((err, posts) => {
      if (err) {
        return res.status(400).json({
          error: "NO POST Found",
        });
      }
      return res.json(posts);
    });
}