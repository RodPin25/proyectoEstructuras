// Variables necesarias
var btnMenu = document.getElementById("btnMenu");
var sidebar = document.getElementById("sidebar");
var header = document.getElementsByClassName("header")[0];
var quests = document.getElementsByClassName("body")[0];
var modal = document.getElementById("modal");
var btnQuest = document.getElementById("addQuest");
var sideActive = false;

function checkScreenSize() {
    const minWidth = 900; // El ancho mínimo de pantalla en píxeles para redirigir
    const currentWidth = window.innerWidth;
    
    console.log(`checkScreenSize called. currentWidth: ${currentWidth}, minWidth: ${minWidth}`);
    
    if (currentWidth < minWidth) {
        // Redirigir a otra página si el ancho de pantalla es menor que el valor mínimo
        console.log('Redirigiendo a mobilePage.html');
        window.location.href = "mobilePage.html";
    }
}

// Llamar a la función al cargar la página
window.addEventListener('load', function() {
    console.log('Evento load disparado');
    checkScreenSize();
});

// También puedes agregar un listener para detectar cambios en el tamaño de la ventana
window.addEventListener('resize', function() {
    console.log('Evento resize disparado');
    checkScreenSize();
});

// Evento que controla el sidebar
btnMenu.addEventListener("click", function(event) {
    event.stopPropagation();
    if (!sideActive && sidebar.style.left == "-15%") {
        sideActive = true;
        sidebar.style.left = "0";
        header.style.zIndex = "1";
        quests.style.left = "15%";
        quests.classList.add("active");
        sidebar.classList.add("active");
    } else {
        sideActive = false;
        sidebar.style.left = "-15%";
        quests.style.left = "0";
        quests.classList.remove("active");
        sidebar.classList.remove("active");
    }
    console.log(sideActive);
});
sidebar.addEventListener("click",function(event){
    //event.stopImmediatePropagation;
    event.stopPropagation;
});
// Evento que controla los clicks del botón para agregar tareas
btnQuest.addEventListener("click", function(event) {
    event.stopPropagation();
    modal.style.display = "block";
    var closeBtn = document.getElementById("btnClose");
    closeBtn.addEventListener("click", function(event) {
        event.stopPropagation();
        modal.style.display = "none";
    });
});

// Evento que controla el click en el botón de guardar
var saveButton = document.getElementById("saveButton");
saveButton.addEventListener("click", function(event) {
    event.stopPropagation();
    let name = document.getElementById("nameQuest").value;
    let desco = document.getElementById("descriptionQuest").value;
    let importante = document.getElementById("importance");
    let notImportant = document.getElementById("importance2");

    if (importante.checked) {
        cleanInputs();
        DivInsertImportant(name, desco);
    } else if (notImportant.checked) {
        cleanInputs();
        insertNotImportant(name, desco);
    } else {
        alert("Seleccione la importancia de la tarea");
    }
});

// Eventos que controlan el presionar la tecla Enter en los dos inputs
var inputName = document.getElementById("nameQuest");
var inputDesc = document.getElementById("descriptionQuest");
var importantQuest = [];
var notImportantQuest = [];

inputName.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        event.stopPropagation();
        let name = document.getElementById("nameQuest").value;
        let desco = document.getElementById("descriptionQuest").value;
        let importante = document.getElementById("importance");
        let notImportant = document.getElementById("importance2");

        if (importante.checked) {
            cleanInputs();
            DivInsertImportant(name, desco);
        } else if (notImportant.checked) {
            cleanInputs();
            insertNotImportant(name, desco);
        } else {
            alert("Seleccione la importancia de la tarea");
        }
    }
});

inputDesc.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        event.stopPropagation();
        let name = document.getElementById("nameQuest").value;
        let desco = document.getElementById("descriptionQuest").value;
        let importante = document.getElementById("importance");
        let notImportant = document.getElementById("importance2");

        if (importante.checked) {
            cleanInputs();
            DivInsertImportant(name, desco);
        } else if (notImportant.checked) {
            cleanInputs();
            insertNotImportant(name, desco);
        } else {
            alert("Seleccione la importancia de la tarea");
        }
    }
});

// Evento que controla cuando se vaya a cerrar la ventana
window.addEventListener("beforeunload", function() {
    saveData();
    
});

function saveData() {
    var datosIguardar = JSON.stringify(importantQuest);
    var datosNguardar = JSON.stringify(notImportantQuest);
    if(localStorage.setItem('divImportant', datosIguardar)){
        alert("datos guardados en el local storage");
        localStorage.setItem('divImportant', datosIguardar);
        localStorage.setItem('divNotImportant', datosNguardar);
    }
}

// Evento que controla cuando se carga el documento
document.addEventListener("DOMContentLoaded", function(event) {
    var arrayIRecovered = recoverArrayImportant();
    var arrayNRecovered = recoverArrayNotImportant();

    for (var quest of arrayIRecovered) {
        DivInsertImportant(quest[0], quest[1]);
    }
    arrayNRecovered.forEach(function(quest) {
        insertNotImportant(quest[0], quest[1]);
    });
    checkQuestNotify();
});

// Funciones que controlan donde se agregan los divs
function cleanInputs() {
    modal.style.display = "none";
    document.getElementById("nameQuest").value = '';
    document.getElementById("importance").value = '';
    document.getElementById("descriptionQuest").value = '';
    document.getElementById("importance2").value = '';
}

function DivInsertImportant(nameQuest, descQuest) {
    var questContainer = document.getElementById("important");
    var importantDiv = document.createElement("div");
    let strImportant = `<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p><button class='complete'>Completada</button>`;
    importantDiv.innerHTML = strImportant;
    questContainer.style.display = "inline-block";
    importantDiv.classList.add("importante");
    importantDiv.style.backgroundColor = "#ff193c";
    questContainer.appendChild(importantDiv);
    var questAdded = [nameQuest, descQuest];
    importantQuest.push(questAdded);
}

function insertNotImportant(nameQuest, descQuest) {
    var questContainerN = document.getElementById("notImportant");
    var notImportantDiv = document.createElement("div");
    let strImportant = `<h1 class='titleQuestAdded'>${nameQuest}</h1><p class='textQuest'>${descQuest}</p><button class='complete'>Completada</button>`;
    notImportantDiv.innerHTML = strImportant;
    questContainerN.style.display = "inline-block";
    notImportantDiv.classList.add("noImportante");
    questContainerN.appendChild(notImportantDiv);
    var questAdded = [nameQuest, descQuest];
    notImportantQuest.push(questAdded);
}

function recoverArrayImportant() {
    var recoveredArray = localStorage.getItem("divImportant");
    var parsedArray = JSON.parse(recoveredArray);
    return parsedArray;
}

function recoverArrayNotImportant() {
    var recoveredArrayN = localStorage.getItem("divNotImportant");
    var parsedArrayN = JSON.parse(recoveredArrayN);
    return parsedArrayN;
}

function removeQuest(tasks, name) {
    return tasks.filter(task => task[0] != name);
}

var importantContainer = document.getElementById("important");
var notificacion=document.getElementsByClassName("notification")[0];
importantContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("complete")) {
        event.stopPropagation();
        var taskElement = event.target.parentElement.querySelector('.titleQuestAdded');
        if (taskElement) {
            var taskTitle = taskElement.textContent;
            event.target.parentElement.classList.add('bounce-out');
            setTimeout(function() {
                event.target.parentElement.remove();
                importantQuest = removeQuest(importantQuest, taskTitle);
                saveData();
            }, 1500);
            setTimeout(function(){
                notificacion.innerHTML='<h2>Tarea completada</h2><p>Felicidades por completar la tarea</p>';
                notificacion.style.display="block";
                notificacion.classList.add("active");
            },1000);
            setTimeout(function(){
                notificacion.style.display="none";
                notificacion.classList.remove("active");
            },4000);
            
        } else {
            console.error("No se encontró ningún elemento con la clase 'titleQuestAdded'");
        }
    }
});

var notImportantContainer = document.getElementById('notImportant');
notImportantContainer.addEventListener("click", function(event) {
    if (event.target.classList.contains("complete")) {
        event.stopPropagation();
        var taskElement = event.target.parentElement.querySelector('.titleQuestAdded');
        if (taskElement) {
            var taskTitle = taskElement.textContent;
            event.target.parentElement.classList.add('bounce-out');
            setTimeout(function() {
                event.target.parentElement.remove();
                notImportantQuest = removeQuest(notImportantQuest, taskTitle);
                saveData();
            }, 1500);
            setTimeout(function(){
                notificacion.innerHTML='<h2>Tarea completada</h2><p>Felicidades por completar la tarea</p>';
                notificacion.style.display="block";
                notificacion.classList.add("active");
                notificacion.classList.remove("not-active");
            },1000);
            setTimeout(function(){
                notificacion.style.display="none";
                notificacion.classList.add("not-active");
                notificacion.classList.remove("active");
            },4000);
        } else {
            console.error("No se encontró ningún elemento con la clase 'titleQuestAdded'");
        }
    }
});

var showImportant = document.getElementById('showImportant');
var showNotImportant = document.getElementById('showNotImportant');
var redoQuests = document.getElementById('redoButton');

showImportant.addEventListener('click', function(event) {
    event.stopPropagation();
    notImportantContainer.style.display = 'none';
    importantContainer.style.display = 'block';
});

showNotImportant.addEventListener('click', function(event) {
    event.stopPropagation();
    importantContainer.style.display = 'none';
    notImportantContainer.style.display = 'block';
});

redoQuests.addEventListener('click', function(event) {
    event.stopPropagation();
    console.log("Regresando a todas");
    importantContainer.style.display = 'block';
    notImportantContainer.style.display = 'block';
});

// Script para las notificaciones
function showNotification(title, options) {
    if (!("Notification" in window)) {
        console.error("El navegador no soporta notificaciones");
        return;
    }

    if (Notification.permission == 'granted') {
        var notificacion = new Notification(title, options);
    } else if (Notification.permission == 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission == 'granted') {
                var notificacion = new Notification(title, options);
            }
        });
    }
}

function checkQuestNotify() {
    if (importantQuest.length > 0) {
        showNotification('¡Aún tienes tareas pendientes!', { body: 'No te olvides de hacerlas.' });
        setTimeout(function(){
            notificacion.innerHTML='<h2>Tareas importantes pendientes</h2><p>Completa tus tareas</p>';
            notificacion.style.display="block";
            notificacion.classList.add("active");
            notificacion.classList.remove("not-active");
        },1000);
        setTimeout(function(){
            notificacion.style.display="none";
            notificacion.classList.add("not-active");
            notificacion.classList.remove("active");
        },4000);
    } else if (notImportantQuest.length > 0) {
        showNotification('Tienes tareas no importantes pendientes', { body: 'No te olvides de hacerlas.' });
        setTimeout(function(){
            notificacion.innerHTML='<h2>Tareas incompletas</h2><p>Completa tus tareas</p>';
            notificacion.style.display="block";
            notificacion.classList.add("active");
            notificacion.classList.remove("not-active");
        },1000);
        setTimeout(function(){
            notificacion.style.display="none";
            notificacion.classList.add("not-active");
            notificacion.classList.remove("active");
        },4000);
    }
}

var intervalo = 2 * 60 * 60 * 1000;
setInterval(checkQuestNotify(), 100);
