var Recipe=require("./recipes.js")
var Tag=require("./tag.js")
var data=[
    {
        tag:"LowSugar&SugarFree",
        image:"https://greatist.com/sites/default/files/styles/article_main/public/types-of-sugar_0.jpg?itok=eKjbuV6C%20564w",
        desc:"Eliminating added sugars and maintaining a diet rich in whole foods has many benefits for the body. Reducing sugar intake and eating a healthful diet may help people: lose weight and prevent obesity. have more energy throughout the day."
    
    },{
        tag:"LowCalorie",
        image:"https://images.media-allrecipes.com/images/67859.jpg",
        desc:"These meals and snacks are under 300 calories which makes you healthier"
    },{
        tag:"Diabetic",
        image:"https://www.cdc.gov/diabetes/images/library/features/Diabetic_Food_Plate.png",
        desc:"Instead, eat carbohydrates from fruit, vegetables, whole grains, beans, and low-fat or nonfat milk. Choose healthy carbohydrates, such as fruit, vegetables, whole grains, beans, and low-fat milk, as part of your diabetes meal plan."
    },{
        tag:"Vegan&Vegetarian",
        image:"https://runningonrealfood.com/wp-content/uploads/2017/12/easy-vegan-dinner-recipes-seasoned-chickpea-taco-salad.jpg",
        desc:"Vegetarian diets exclude meat, fish, poultry and eggs, as well as foods that contain them. Dairy products, such as milk, cheese, yogurt and butter, are included. Ovo-vegetarian diets exclude meat, poultry, seafood and dairy products, but allow eggs."
        
    },{
        tag:"LowCarb",
        image:"https://i0.wp.com/www.healthline.com/hlcmsresource/images/AN_images/low-carb-diet-meal-plan-and-menu-1296x728-feature.jpg?w=1155&h=1528",
        desc:"A low-carbohydrate diet restricts the amount of carbohydrate-rich foods – such as bread – in the diet."
    },{
        tag:"GlutenFree",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Triticum_monococcum0.jpg/200px-Triticum_monococcum0.jpg",
        desc:"A gluten-free diet (GFD) is a diet that strictly excludes gluten, a mixture of proteins found in wheat and related grains, including barley, rye, oat, and all their species and hybrids (such as spelt, kamut, and triticale).[1] The inclusion of oats in a gluten-free diet remains controversial, and may depend on the oat cultivar and the frequent cross-contamination with other gluten-containing cereals."
    },{
        tag:"LowFat",
        image:"https://www.runtothefinish.com/wp-content/uploads/2014/05/High-Fat-Diet-for-Endurance-Athletes.jpg",
        desc:"Eat plenty of plant foods (such as whole-grain products, fruits, and vegetables) and a moderate amount of lean and low-fat, animal-based food (meat and dairy products) to help control your fat, cholesterol, carbs, and calories. When you're shopping, choose lean meats, fish, and poultry."
    },{
        tag:"Sweet",
        image:"https://www.tasteofhome.com/wp-content/uploads/2018/01/Sweet-Potato-Pie_EXPS_GHBZ18_1203_B08_15_3b-696x696.jpg",
        desc:"Check out the sweet recipes that light up your day!"
    },{
        tag:"Savory",
        image:"https://www.listchallenges.com/f/items/3a7aabf7-22ab-423c-8722-1ddc9961afcd.jpg",
        desc:"Check out the savory recipes from around the world!"
    },{
        tag:"Spicy",
        image:"https://newsarchive.heart.org/wp-content/uploads/2017/10/1031-Feature-Salt-Spicy-Food_WP.jpg",
        desc:"Check out the spicy recipes at different degrees!"
    },{
        tag:"Spiced",
        image:"http://ministryofcurry.com/wp-content/uploads/2017/04/IMG_2846.jpg",
        desc:"Check out recipes with different types of spice!"
    },{
        tag:"Light",
        image:"http://www.konnyaku.or.jp/recipe-en/images/dietary/recipe_large05.jpg",
        desc:"Check out our skinny taste recipes but still delicious!"
    },{
        tag:"Sour",
        image:"http://science.jrank.org/kids/article_images/eat_p13.jpg",
        desc:"Check out our special sour taste recipes!"
    }]
function seed(){
    data.forEach(function(seed){
        Tag.create(seed);
    })
}
module.exports=seed;