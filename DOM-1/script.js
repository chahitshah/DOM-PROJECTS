function OpenPage(){
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
}

OpenPage();

let form = document.querySelector(".addtask form")
let taskinput = document.querySelector(".addtask form .Entertask ");
let taskdetailsinput = document.querySelector(".addtask form textarea");
let checkboxinput = document.querySelector(".addtask form #mark-imp");

var currenttask = []

if(localStorage.getItem("currenttask"))
{
    currenttask=JSON.parse(localStorage.getItem("currenttask"));
}
else{
    console.log("task list is empty");
}

function renderTask()
{

let alltask = document.querySelector(".alltask");
var sum = '';

currenttask.forEach(function(elem,idx)
{
    sum+=`<div class="task">
                        <h5>${elem.task} <span class="${elem.imp}">Imp</span></h5>
                        <button id=${idx}>Mark as Completed</button>
                    </div>`
})

alltask.innerHTML=sum;

localStorage.setItem("currenttask",JSON.stringify(currenttask));
}

renderTask();

form.addEventListener("submit",function(e){
    e.preventDefault();
    

    currenttask.push({task:taskinput.value,details:taskdetailsinput.value,imp:checkboxinput.checked});
    
    taskinput.value='';
    taskdetailsinput.value='';
    checkboxinput.checked='';

    renderTask();

    location.reload();
})

var markcompleted = document.querySelectorAll('.task button');
markcompleted.forEach(function(elem){
    elem.addEventListener("click",function(){
        currenttask.splice(elem.id,1);

        renderTask();
        location.reload();
    })
})