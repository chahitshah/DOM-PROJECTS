let Allcards = document.querySelectorAll(".cards");
let Allpages = document.querySelectorAll(".Pages")
let btn = document.querySelectorAll("button")

Allcards.forEach(function(elem){
    elem.addEventListener("click",function(){
        Allpages[elem.id].style.display="block";

    })
});

btn.forEach(function(elem){
    elem.addEventListener("click",function(){
        Allpages[elem.id].style.display="none";
    })
})