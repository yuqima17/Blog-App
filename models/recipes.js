var mongoose=require("mongoose");
var recipeSchema=new mongoose.Schema({
    creator:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String,
        photo:String
    },
    title:String,
    desc:String,
    ingredients:[{
        typeOfFood:String,
        amount:String,
        
    }],
    steps:[String],
    images:[String],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }],
    likes:Number,
    wishList:Boolean,
    Note:String,
    createDate:Date,
    meal:String,
    cooktime:String,
    flavor:[String],
    healthy:[String],
    createDate:String,
    searched:Boolean
    
    
})

var Recipe=mongoose.model("Recipe",recipeSchema);
module.exports=Recipe;