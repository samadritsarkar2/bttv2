const   mongoose = require("mongoose"),
        crypto   = require("crypto");
const uuidv4 = require("uuid/v4");      

    

var userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        maxlength : 32,
        trim : true
    },
    lastName : {
        type : String , 
        maxlength : 32,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    userinfo : {
        type : String
    },

    encry_password : {
        type : String,
        required : true,

    },
    salt : String,
    role : {
        type: Number,
        default : 0 
    }
}, {timestamps : true});

userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv4();
        this.encry_password = this.securePassword(password); 
    })
    .get(function(){
        return this.password;
    })

userSchema.methods = {
    authenticate : function(plainpassword){
        return this.securePassword(plainpassword) === this.encry_password

    },

    securePassword : function(plainpassword){
         if(!plainpassword) return "";
         try {
             return crypto.createHmac('sha256', this.salt)
             .update(plainpassword)
             .digest('hex');
         } catch (err) {
             return ""; 
         }


    }
}

module.exports = mongoose.model("User", userSchema);




