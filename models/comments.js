var mongoose=require("mongoose");
var commentSchema=new mongoose.Schema({
    text:String,
    author:{
        username:String,
        photo:String,
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    date:String
})
var Comment=mongoose.model("Comment",commentSchema);
module.exports=Comment;