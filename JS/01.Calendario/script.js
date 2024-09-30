const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysDiv = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
];


/*FUNCTION -> ADD DAYS*/

//Obtenemos los días del mes anterior, todos los días del mes actual y el resto del mes siguiente
function initCalendar(){
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //Actualizar la fecha superior del calendario
    date.innerHTML = months[month] + " " + year;

    //Add days al dom
    let days = "";

    //Dias del mes anterior
    for (let x = day; x > 0;x--)
        days += `<div class="day prev-date">${prevDays -x + 1}</div>`;

    //Current month days
    for(let i = 1; i <= lastDate; i++){
        //si day es today add class today
        if(i === new Date().getDate() && 
            year === new Date().getFullYear() && 
                month === new Date().getMonth()){
            days += `<div class="day today">${i}</div>`;
        }else{
            days += `<div class="day ">${i}</div>`;
        }
    }

    //Dias del mes siguiente
    for(let j = 1; j <= nextDays; j++)
        days += `<div class="day next-date">${j}</div>`;
    
    daysDiv.innerHTML = days;

}

initCalendar();

//prev month
function prevMonth(){
    month--;
    if(month < 0){
        month = 11;
        year--;
    }
    initCalendar();
}

//next month
function nextMonth(){
    month++;
    if(month > 11){
        month = 0;
        year++;
    }
    initCalendar();
}

//add eventListener to prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//Today button
todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

//date input
dateInput.addEventListener("input", (e) => {
    //Permitir solo numeros y borrar lo demás 
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if(dateInput.value.length === 2){
        dateInput.value += "/";
    }
    if(dateInput.value.length > 7){
        dateInput.value = dateInput.value.slice(0, 7);
    }
    //si borramos slash
    if(e.inputType === "deleteContentBackward"){
        if(dateInput.value.length === 3){
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

//Go to button
gotoBtn.addEventListener("click", gotoDate);

function gotoDate(){
    const dateArr = dateInput.value.split("/");
    console.log(dateArr);
    if(dateArr.length === 2){
        if(dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4){
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Fecha no válida");
}