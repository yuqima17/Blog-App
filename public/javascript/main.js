//images
$("#div-images").on("click","#addImageSpan",function(){
    console.log("clicked on span!");
    var allinput=document.querySelectorAll("#imageInput");
    var n = allinput.length;
    $("#div-images").append("<div class='item'><input class='ui input' type='text' name='recipe[images]["+n+"]' placeholder='Image URL here' id='imageInput'> <span id='deleteImageSpan'><i class='minus icon'></i></span></div>");
    
});

$("#div-images").on("click","#deleteImageSpan",function(){
    $(this).parent().remove();
    var allinput=document.querySelectorAll("#imageInput");
    for (var i=0;i<allinput.length;i++){
        allinput[i].setAttribute("name", "recipe[image]["+i+"]");
    }
})

//steps
$("#div-steps").on("click","#addStepSpan",function(){
    console.log("clicked on span!");
    var allinput=document.querySelectorAll("#stepInput");
    var n = allinput.length;
    $("#div-steps").append("<div class='item'><input class='ui input' type='text' name='recipe[steps]["+n+"]' placeholder='Next Step Here' id='stepInput'> <span id='deleteStepSpan'><i class='minus icon'></i></span></div>");
    
});

$("#div-steps").on("click","#deleteStepSpan",function(){
    $(this).parent().remove();
    var allinput=document.querySelectorAll("#stepInput");
    for (var i=0;i<allinput.length;i++){
        allinput[i].setAttribute("name", "recipe[step]["+i+"]");
    }
})
//ingredients

$("#div-ings").on("click","#addIngSpan",function(){
    console.log("clicked on span!");
    var allinput=document.querySelectorAll("#ingTypeInput");
    var n = allinput.length;
    var appContent="<div class='item'>"+
    "<input class='ui input' type='text' name='recipe[ingredients]["+n+"][typeOfFood]' placeholder='Food Name' id='ingTypeInput'>"+
    "<input class='ui input' type='text' name='recipe[ingredients]["+n+"][amount]' placeholder='Amount' id='ingAmountInput'>"+
    "<span id='deleteIngSpan'><i class='minus icon'></i></span></div>"
    $("#div-ings").append(appContent);
    n = $( "#ingTypeInput" ).length;
    console.log("after add content:",n);
    
});


$("#div-ings").on("click","#deleteIngSpan",function(){
    $(this).parent().remove();
    var allinput1=document.querySelectorAll("#ingTypeInput");
    var allinput2=document.querySelectorAll("#ingAmountInput");
    for (var i=0;i<allinput1.length;i++){
        allinput1[i].setAttribute("name", "recipe[ingredients]["+i+"][typeOfFood]");
        allinput2[i].setAttribute("name", "recipe[ingredients]["+i+"][amount]");
    }
})



$(".ui.dropdown").dropdown();

//home-tag-image
var divTag=document.querySelectorAll("#home-tag-div");
divTag.forEach(function(div){
    div.addEventListener("mouseover",function(){
        this.children[1].classList.remove("hidden");
        this.children[0].classList.add("hidden");
    })
    div.addEventListener("mouseleave",function(){
        this.children[1].classList.add("hidden");
        this.children[0].classList.remove("hidden");
    })
})