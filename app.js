var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
mongoose.connect("mongodb://localhost/recipe_db");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public"));

var recipeSchema=new mongoose.Schema({
    creator:String,
    title:String,
    steps:[{
        stepNum:Number,
        content:String
    }],
    image:String
    
})

var Recipe=mongoose.model("Recipe",recipeSchema);
// Recipe.create({
//     creator:"yuqi_Yuto",
//     title:"Chicken foot",
//     steps:[{
//         stepNum:1,
//         content:"Wash the chicken foot in soda water"
//     },{
//         stepNum:2,
//         content:"Cook it thoroughly in boiled water"
//     },{
//         stepNum:3,
//         content:"Cool it in cold water."
//     }],
//     image:"http://jehancancook.com/wp-content/uploads/2017/05/Chicken-Foot-Soup-1-2-1024x977.jpg"
// })

app.get("/blogs",function(req,res){
    
    Recipe.find({},function(err,recipes){
        if(!err){
            res.render("home.ejs",{recipes:recipes})
        }
    })
   
})
app.get("/",function(req,res){
    res.redirect("/blogs")
})
app.get("/new",function(req,res){
    res.render("add.ejs");
})
app.post("/blogs",function(req,res){
    Recipe.create(req.body.recipe,function(err,newRecipe){
        if(!err){
            res.redirect("/blogs");
        }
    })
})

app.get("/blogs/:id",function(req,res){
    Recipe.findById(req.params.id,function(err,foundBlog){
        if(!err){
            //res.send("Connected!")
            console.log("foundblog!");
            console.log(req.params.id);
            
            res.render("show.ejs");
            console.log("complete!")
        }
    })
    
})





app.listen(process.env.PORT,process.env.IP,function(){
    console.log("start!");
})

//googleAPI:AIzaSyAc5kxcYWyPlN64x5Bbf0Em1n9CAU9RDZw