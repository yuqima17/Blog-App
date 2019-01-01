var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var userSchema=mongoose.Schema({
    username:String,
    password:String,
    photo:String,
    desc:String
})
userSchema.plugin(passportLocalMongoose);
var User=mongoose.model("User",userSchema);
module.exports=User;