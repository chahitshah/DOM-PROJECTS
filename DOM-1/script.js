function OpenPage(){
let Allcards = document.querySelectorAll(".cards");
let Allpages = document.querySelectorAll(".Pages")
let btn = document.querySelectorAll(".back")

Allcards.forEach(function(elem){
    elem.addEventListener("click",function(){
        Allpages[elem.id].style.display="block";
        if (elem.id === "3") {
            document.body.classList.add("pomodoro-active");
        }

    })
});

btn.forEach(function(elem){
    elem.addEventListener("click",function(){
        Allpages[elem.id].style.display="none";
        if (elem.id === "3") {
            document.body.classList.remove("pomodoro-active");
        }
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

var markcompleted = document.querySelectorAll('.task button');
markcompleted.forEach(function(elem){
    elem.addEventListener("click",function(){
        currenttask.splice(elem.id,1);

        renderTask();
    })
})
}

renderTask();

form.addEventListener("submit",function(e){
    e.preventDefault();
    

    currenttask.push({task:taskinput.value,details:taskdetailsinput.value,imp:checkboxinput.checked});
    
    taskinput.value='';
    taskdetailsinput.value='';
    checkboxinput.checked='';

    renderTask();
})

var Dayplandata=JSON.parse(localStorage.getItem('Dayplandata'))||{} 
 
function dp()
{
    var dayplanner = document.querySelector('.day-planner');
    var hours = Array.from({length:18},(elem,idx)=>`${6+idx}:00 - ${7+idx}:00`);
let h='';
hours.forEach(function(elem,idx)
{
   
    h+=`<div class="day-planner-time">
                    <p>${elem}</p>
                    <input id="${idx}" type="text" placeholder="..." value="${Dayplandata[idx]||''}">
                </div> `
})
dayplanner.innerHTML=h;
}
dp();

var dayplannerinput = document.querySelectorAll('.day-planner input')
dayplannerinput.forEach(function(elem){
    elem.addEventListener("input",function(){
        Dayplandata[elem.id]=elem.value;

        localStorage.setItem('Dayplandata',JSON.stringify(Dayplandata));
    })
})





async function fetchQuote() {
    try {
        let res = await fetch('https://dummyjson.com/quotes/random');
        let data = await res.json();
        
    } catch (err) {
        console.log(err);
    }
}

fetchQuote();
let timerinterval = null;
let totalsec = 25 * 60;

let timer = document.querySelector(".pomo-timer h1");
let pausebtn = document.querySelector(".pause-timer");
let startbtn = document.querySelector(".start-timer");
let resetbtn = document.querySelector(".reset-timer");

var isworksession = true;

function UpdateTime() {
    let minutes = Math.floor(totalsec / 60);
    let seconds = totalsec % 60;

    timer.innerHTML = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
}

function Starttimer() {
    clearInterval(timerinterval);

    // set correct session time only ONCE
    totalsec = isworksession ? 25 * 60 : 5 * 60;

    timerinterval = setInterval(function () {
        if (totalsec > 0) {
            totalsec--;
            UpdateTime();
        } else {
            clearInterval(timerinterval);

            // switch session
            isworksession = !isworksession;

            // update UI immediately
            totalsec = isworksession ? 25 * 60 : 5 * 60;
            UpdateTime();
        }
    }, 1000);
}

function pausetimer() {
    clearInterval(timerinterval);
}

function resettimer() {
    clearInterval(timerinterval);
    isworksession = true;
    totalsec = 25 * 60;
    UpdateTime();
}

startbtn.addEventListener("click", Starttimer);
pausebtn.addEventListener("click", pausetimer);
resetbtn.addEventListener("click", resettimer);

// initial display
UpdateTime();

async function weatherapicall() {
    var response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=Surat&appid=29ae8c401e6210c76bcb5bc45748c20b");

    var data = await response.json();

    console.log(data);

    var header1location = document.querySelector('.header1 h4');
    var header1time = document.querySelector('.header1 h1');
    var header2temp = document.querySelector('.header2 h2');
    var header2humidity = document.querySelector('.header2 .humidity');
    var header2wind = document.querySelector('.header2 .wind');
    var header2weather = document.querySelector('.header2 .weather');

    // location
    header1location.innerHTML = `${data.name}, ${data.sys.country}`;

    // 🌍 real local time
    let localTime = new Date((data.dt + data.timezone) * 1000);

    let time = localTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit"
    });

    header1time.innerHTML = time;
    let tempC = data.main.temp - 273.15;

header2temp.innerHTML = `${Math.round(tempC)}°C`;
header2humidity.innerHTML=`Humidity :${data.main.humidity}%`
header2wind.innerHTML=`Wind :${data.wind.speed}Km/h`
header2weather.innerHTML=`Weather :${data.weather[0].description}`
}

weatherapicall();

