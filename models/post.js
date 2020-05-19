const mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    image : [{
        url : String,
        public_id : String
    }],
    description : {
        type : String,
        required : true,
        trim : true
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        
    },
    location : {
        type: String
    }
}, {timestamps : true});

module.exports = mongoose.model("Post",postSchema);