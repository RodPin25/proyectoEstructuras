//Variables necesarias
var btnMenu=document.getElementById("btnMenu");
var sidebar=document.getElementById("sidebar");
var header=document.getElementsByClassName("header")[0];
var quests=document.getElementsByClassName("body")[0];
var modal=document.getElementById("modal");
var btnQuest=document.getElementById("addQuest");
var sideActive=false;
//Variables necesarias

//Comienzo de los eventos que controlan al documento.
//Evento que controla al sidebar
btnMenu.addEventListener("click", function(event) {
    event.stopPropagation(); // Detener la propagación del evento
    if (!sideActive) {
        sideActive = true;
        sidebar.style.left = "0";
        header.style.zIndex = "1";
        quests.style.left="15%"
        quests.classList.add("active")
        sidebar.classList.add("active");
    } else {
        sideActive = false;
        sidebar.style.left = "-15%";
        quests.style.left="0";
        quests.classList.remove("active");
        sidebar.classList.remove("active");
    }
});
//Evento que controla el sidebar
//Evento que controla los clicks fuera del sidebar
document.body.addEventListener("click", function(event) {
    event.stopPropagation(); // Detener la propagación del evento
});
//Evento que controla los clicks fuera del sidebar
//Evento que controla los clicks del boton para agregar tareas.
btnQuest.addEventListener("click",function(){
    modal.style.display="block";

    var closeBtn=document.getElementById("btnClose");
    closeBtn.addEventListener("click", function(event){
        modal.style.display="none";
        event.stopPropagation();
    })
});
//Evento que controla los clicks del boton para agregar tareas.

//Evento que controla el click en el boton de guardar.
var saveButton=document.getElementById("saveButton");
saveButton.addEventListener("click",function(){
    let name=document.getElementById("nameQuest").value;
    let desco=document.getElementById("descriptionQuest").value;
    let importante=document.getElementById("importance");
    let notImportant=document.getElementById("importance2");

    if(importante.checked){
        cleanInputs();
        DivInsertImportant(name,desco);
    } else if(notImportant.checked){
        cleanInputs();
        insertNotImportant(name,desco);
    }
});
//Evento que controla el click en el boton de guardar.
//Eventos que controlan el presionar la tecla Enter en los dos inputs.
var inputName=document.getElementById("nameQuest");
var inputDesc=document.getElementById("descriptionQuest");
var importantQuest=new Array();
var notImportantQuest=new Array();

inputName.addEventListener("keydown",function(){
    let name=document.getElementById("nameQuest").value;
    let desco=document.getElementById("descriptionQuest").value;
    let importante=document.getElementById("importance");
    let notImportant=document.getElementById("importance2");
    if(event.keyCode==13){
        if(importante.checked){
            cleanInputs();
            DivInsertImportant(name,desco);
        } else if(notImportant.checked){
            cleanInputs();
            insertNotImportant(name,desco);
        }
    }
});
inputDesc.addEventListener("keydown",function(){
    let name=document.getElementById("nameQuest").value;
    let desco=document.getElementById("descriptionQuest").value;
    let importante=document.getElementById("importance");
    let notImportant=document.getElementById("importance2");
    if(event.keyCode==13){
        if(importante.checked){
            cleanInputs();
            DivInsertImportant(name,desco);
        } else if(notImportant.checked){
            cleanInputs();
            insertNotImportant(name,desco);
        }
        else {
            alert("Seleccione la importancia de la tarea");
        }
    }
});
//Eventos que controlan el presionar la tecla Enter en los dos inputs.

//Evento que controla cuando se vaya a cerrar la ventana
window.addEventListener("beforeunload", function(){
    saveData();
});
function saveData(){
    var datosIguardar=JSON.stringify(importantQuest);
    var datosNguardar=JSON.stringify(notImportantQuest);
    this.localStorage.setItem('divImportant',datosIguardar);
    this.localStorage.setItem('divNotImportant',datosNguardar);
}
//Evento que controla cuando se vaya a cerrar la ventana

//Evento que controla cuando se carga el documento
document.addEventListener("DOMContentLoaded",function(event){
    var arrayIRecovered=recoverArrayImportant();
    var arrayNRecovered=recoverArrayNotImportant();

    for(var quest of arrayIRecovered){
        DivInsertImportant(quest[0],quest[1]);
    }
    arrayNRecovered.forEach(function(quest) {
        insertNotImportant(quest[0], quest[1]);
    });
    checkQuestNotify();
    
});
//Evento que controla cuando se carga el documento

//Funciones que controlan donde se agregan los divs
function cleanInputs(){
    modal.style.display="none";
        document.getElementById("nameQuest").value='';
        document.getElementById("importance").value='';
        document.getElementById("descriptionQuest").value='';
        document.getElementById("importance2").value='';
}

function DivInsertImportant(nameQuest,descQuest){
    var questContainer=document.getElementById("important");
    importantDiv=document.createElement("div");
    let strImportant=`<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p><button class='complete'>Completada</button>`;
    importantDiv.innerHTML=strImportant;
    questContainer.style.display="inline-block";
    importantDiv.classList.add("importante");
    importantDiv.style.backgroundColor="#ff193c";
    questContainer.appendChild(importantDiv);
    var questAdded=[nameQuest,descQuest];
    importantQuest.push(questAdded);
    
}
function insertNotImportant(nameQuest,descQuest){
    var questContainerN=document.getElementById("notImportant");
    notImportantDiv=document.createElement("div");
    let strImportant=`<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p><button class='complete'>Completada</button>`;
    notImportantDiv.innerHTML=strImportant;
    questContainerN.style.display="inline-block";
    notImportantDiv.classList.add("noImportante");
    questContainerN.appendChild(notImportantDiv);
    var questAdded=[nameQuest,descQuest];
    notImportantQuest.push(questAdded);
}

function recoverArrayImportant() {
    var recoveredArray=localStorage.getItem("divImportant");
    var parsedArray=JSON.parse(recoveredArray);
    return parsedArray;
}
function recoverArrayNotImportant() {
    var recoveredArrayN=localStorage.getItem("divNotImportant");
    var parsedArrayN=JSON.parse(recoveredArrayN);
    return parsedArrayN;
}


function removeQuest(tasks, name){
    console.log(tasks);
    return tasks.filter(task=> task[0] != name);
}

var importantContainer=document.getElementById("important");
importantContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("complete")) {
        event.target.parentElement.classList.add('bounce-out');
        setTimeout(function(){
            event.target.parentElement.remove();
            removeQuest(notImportantQuest, event.target.parentElement.querySelector('titleQuestAdded').textContent);
            saveData();
        },1500);
    }
});
var notImportantContainer=document.getElementById('notImportant');
notImportantContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("complete")) {
        var taskElement = event.target.parentElement.querySelector('.titleQuestAdded');
        if (taskElement) {
            var taskTitle = taskElement.textContent;
            event.target.parentElement.classList.add('bounce-out');
            setTimeout(function() {
                event.target.parentElement.remove();
                removeQuest(notImportantQuest, taskTitle);
                saveData();
            }, 1500);
        } else {
            console.error("No se encontró ningún elemento con la clase 'titleQuestAdded'");
        }
    }
});


//Script para las notificaciones.
function showNotification(title,options){
    if(!("Notification" in Window)){
        console.error("El navegador no soporta notificaciones");
        return;
    }
    
    if(Notification.permission=='granted'){
        var notificacion=new Notification(title, options);
    } else if(Notification.permission=='denied'){
        Notification.requestPermission().then(function(permission){
            if(permission=='granted'){
                var notificacion=new Notification(title,options);
            }
        });
    }
}
function checkQuestNotify(){
    if(importantQuest.length>0){
        showNotification('¡Aún tienes tareas pendientes!',{body: 'No te olvide de hacerlas.'});
    } else if(notImportantQuest.length>0){
        showNotification('Tienes tareas no importantes pendientes',{body: 'No te olvide de hacerlas.'});
    }
}
var intervalo=2*60*60*1000;
setInterval(checkQuestNotify,intervalo);