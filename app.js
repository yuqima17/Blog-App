var express=require("express");
var app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var passport=require("passport");
var localStrategy=require("passport-local");
var passportLocalMongoose=require("passport-local-mongoose");
var Recipe=require("./models/recipes.js");
var Comment=require("./models/comments.js");
var User=require("./models/user.js");
var Tag=require("./models/tag.js");
var seed=require("./models/seed.js");
app.use(methodOverride("_method"));
var flash=require("connect-flash");
app.use(flash());
mongoose.connect("mongodb://yuqimaMLAB:Yuki_19950523@ds147354.mlab.com:47354/recipe_blog");
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname+"/public"));
var options = { year: 'numeric', month: 'numeric', day: 'numeric' };
var options2 = { year: 'numeric', month: 'numeric', day: 'numeric' };
//seed();

app.use(require("express-session")({
    secret:"This is secret",
    resave:false,
    saveUninitialized:false
}))

function addUser (req, res, next) {
    console.log("====add in currentUser===");
  res.locals.currentUser=req.user;
  next();
}
app.use(function(req,res,next){
    res.locals.needLogin=req.flash("needLogin");
    res.locals.logedOut=req.flash("logedOut");
   res.locals.signUpErr=req.flash("signUpErr")
    next();
})
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/blogs",addUser,function(req,res){
    Recipe.find({},function(err,recipes){
        if(!err){
            Tag.find({},function(err1,tags){
                if(!err1){
                    res.render("home.ejs",{recipes:recipes,tags:tags});
                }
            })
            
            
        }
        
})
resetSearch();
    })


app.post("/blogs/search",function(req,res){
    var titleSearch=req.body.titleSearch;
    var titleRegex = new RegExp(titleSearch, 'i');
    Recipe.find(
        {
        title:titleRegex
        },function(err,searchTitle){
            
            if(!err){
                console.log("successfully searched title");
                console.log(searchTitle);
                searchTitle.forEach(function(title){
                    console.log(title.title)
                    console.log("here!")
                    title.searched=true;
                    title.save();
                    console.log(title.searched);
                })
                
            }else{
                console.log("err in searching the title");
            }
        res.redirect("/blogs");
        
        })
    
})
app.get("/",addUser,function(req,res){
    res.redirect("/blogs")
})
app.get("/new",[isLoggedIn,addUser],function(req,res){
    res.render("add.ejs");
})
app.post("/new",[isLoggedIn,addUser],function(req,res){
    
    if(req.body.recipe){
        Recipe.create(req.body.recipe,function(err,newRecipe){
        if(!err){
            
            console.log("successfully created a recipe=====");
            
            var today=new Date(Date.now());
            console.log(today);
            console.log(today.toLocaleDateString("en-US",options));
            newRecipe.createDate=today.toLocaleDateString("en-US",options);
            newRecipe.creator.username=req.user.username;
            newRecipe.creator.photo=req.user.photo;
            newRecipe.creator.id=req.user._id;
            newRecipe.likes=0;
            newRecipe.searched=false;
            newRecipe.save();
            
            
            console.log(newRecipe);
            
            
        }
    })
    }
  res.redirect("/blogs");  
})

app.get("/blogs/:id",addUser,function(req,res){
    Recipe.findById(req.params.id).populate("comments").exec(function(err,foundBlog){
        if(!err){
            res.render("show.ejs",{recipe:foundBlog})
        }
    })  
   
    })
    


app.get("/blogs/:id/update",[addUser,isReceipeCreator],function(req,res){
    Recipe.findById(req.params.id,function(err,foundBlog){
        if(!err){
            res.render("update.ejs",{recipe:foundBlog})
        }
    })
})

app.put("/blogs/:id/update",[addUser,isReceipeCreator],function(req,res){
    Recipe.findByIdAndUpdate(req.params.id,req.body.recipe,function(err,updateBlog){
        if(!err){
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.get("/blogs/myreceipes/:userId",[addUser,isLoggedIn],function(req,res){
    Recipe.find({"creator.id":req.params.userId},function(err,recipes){
        if(!err){
            
            
           res.render("myrecipes.ejs",{recipes:recipes});  
        }
       
    })
    
})
app.get("/blogs/user/:userId",[addUser],function(req,res){
    Recipe.find({"creator.id":req.params.userId},function(err,recipes){
        if(!err){
            User.findById(req.params.userId,function(err,user){
                if(!err){
                     res.render("user.ejs",{recipes:recipes,user:user}); 
                }else{
                    console.log("err in finding the user");
                    res.redirect("/blogs")
                }
            })
            
           
        }else{
             console.log("err in finding the user's recipes");
                    res.redirect("/blogs");
        }
       
    })
    
})
app.get("/blogs/hashtags/:tag",[addUser],function(req,res){
    Recipe.find({"flavor":req.params.tag},function(err,withflavor){
        if(!err){
            if(withflavor.length>0){
                Tag.find({"tag":req.params.tag},function(err,foundtag){
                    if(!err){
                        console.log("foundtag:===");
                        console.log(typeof foundtag);
                        res.render("flavortag.ejs",{recipes:withflavor,foundtag:foundtag});
                    }
                    
                })
                
            }
            else{
                Recipe.find({"healthy":req.params.tag},function(err,withHealthy){
                    if(!err){
                        Tag.find({"tag":req.params.tag},function(err,foundtag){
                            if(!err){
                                console.log("foundtag:===");
                        console.log(typeof foundtag);
                                res.render("healthtag.ejs",{recipes:withHealthy,foundtag:foundtag});
                            }
                            
                        })
                        
                    }
                })
                
            }
        }else{
            console.log("err");
            res.redirect("/blogs")
        }
        
    })
})
app.post("/blogs/:id/comment",[addUser,isLoggedIn],function(req,res){
    Comment.create(req.body.comment,function(err,createdComment){
        if(!err){
            var today=new Date(Date.now());
            createdComment.date=today.toLocaleDateString("en-US",options2);
            createdComment.author.username=req.user.username;
            createdComment.author.id=req.user._id;
            createdComment.author.photo=req.user.photo;
            createdComment.save();
            
            Recipe.findById(req.params.id,function(err,foundBlog){
                if(!err){
                    foundBlog.comments.push(createdComment);
                    foundBlog.save()
                }
        
    })
        }
    });
    res.redirect("/blogs/"+req.params.id);
    
    
})
app.post("/blogs/:id/likes",function(req,res){
    Recipe.findById(req.params.id,function(err,foundRecipe){
        if(!err){
            foundRecipe.likes=foundRecipe.likes+1;
            foundRecipe.save();
        }
        res.redirect("/blogs/"+req.params.id)
    })
})

app.delete("/blogs/:id",[addUser,isReceipeCreator],function(req,res){
    Recipe.findByIdAndRemove(req.params.id,function(err){
        if(!err){
            res.redirect("/blogs")
        }
    })
})

app.delete("/blogs/:id/comments/:commentId",[addUser,isCommentAuthor],function(req,res){
    Comment.findByIdAndRemove(req.params.commentId,function(err){
        if(!err){
            res.redirect("/blogs/"+req.params.id);
        }
    })
})

app.get("/register",function(req,res){
    res.render("register.ejs")
})


app.post("/register",function(req,res){
    console.log(req.body);
    var newUser=new User({
        username:req.body.username,
        photo:req.body.photo,
        desc:req.body.desc
    });
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("signUpErr",err.message);
            res.redirect("/register");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/blogs")
            })
        }
    })
})

app.get("/login",function(req,res){
    res.render("login.ejs");
})

app.post("/login",passport.authenticate("local",{successRedirect:"/blogs",failureRedirect:"/login"}),function(req,res){
    console.log("logged in=========");
    console.log(req.body.username);
})
app.get("/logout",addUser,function(req,res){
    req.logout();
    req.flash("logedOut","You are logged out!")
    res.redirect("/blogs")
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("needLogin","Please login first")
    res.redirect("/login");
    
}
function resetSearch(){
    Recipe.find({},function(err,recipes){
        recipes.forEach(function(recipe){
            recipe.searched=false;
            recipe.save();
        })
    })
}
function isReceipeCreator(req,res,next){
    if(req.isAuthenticated()){
        Recipe.findById(req.params.id,function(err,foundRecipe){
            if(!err){
                if(foundRecipe.creator.id.equals(req.user._id)){
                    next();
                }
                else{
                    console.log("error","you are not the creator!");
                    res.redirect("back");
                }
            }
        })
    }
    else{
        console.log("error","you need to log in !");
        res.redirect("/login");
    }
}
function isCommentAuthor(req,res,next){
     if(req.isAuthenticated()){
         Comment.findById(req.params.commentId,function(err,foundComment){
             if(!err){
                if (foundComment.author.id.equals(req.user._id)){
                 return next();
             } 
             }else{
                 console.log("you need to be the comment author");
                 res.redirect("back")
             }
             
         })
     }else{
         console.log("you need to log in!");
         res.redirect("/login")
     }
}

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("start!");
})

//googleAPI:AIzaSyAc5kxcYWyPlN64x5Bbf0Em1n9CAU9RDZw