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
    closeBtn.addEventListener("click", function(){
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
    var datosIguardar=JSON.stringify(importantQuest);
    var datosNguardar=JSON.stringify(notImportantQuest);
    this.localStorage.setItem('divImportant',datosIguardar);
    this.localStorage.setItem('divNotImportant',datosNguardar);
});
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
    let strImportant=`<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p>`;
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
    let strImportant=`<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p>`;
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