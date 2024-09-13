var date=document.getElementById("dd");
var submit=document.getElementById("submit");
submit.addEventListener("click",getDate);

function getDate()
{
    const date1= new Date(date.value);
    const today=new Date();
    console.log("Full Year ="+today.getFullYear());
    console.log(date1.getFullYear());

    let age=today.getFullYear()-date1.getFullYear();
    let month=today.getMonth()-date1.getMonth();
    let days=today.getDay()-date1.getDay();
    document.getElementById("result").innerText=` ${age} years  ${month}  months  ${days}  days`;


}
