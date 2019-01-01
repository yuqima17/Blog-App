var mongoose=require("mongoose");
var tagSchema=new mongoose.Schema({
    tag:String,
    desc:String,
    image:String
})
var Tag=mongoose.model("Tag",tagSchema);
module.exports=Tag;