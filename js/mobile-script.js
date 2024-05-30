document.addEventListener("DOMContentLoaded", function() {
    var addQuest = document.getElementById("adQuest");
    var modal = document.getElementById('moda');
    var closeButton = document.getElementById("closeButton");
    var saveButton = document.getElementById('saveButton');
    notImportantQuest = [];
    importantQuest = [];
    quests = [];

    addQuest.addEventListener("click", function(event) {
        modal.style.display = 'flex';
    });

    closeButton.addEventListener("click", function(event) {
        event.stopPropagation();
        modal.style.display = "none";
    });

    saveButton.addEventListener('click', function(event) {
        event.stopPropagation();
        var name = document.getElementById('name').value;
        var desc = document.getElementById('description').value;
        var importance = '';
        const importanceRadios = document.getElementsByName('importance');
        for (const radio of importanceRadios) {
            if (radio.checked) {
                importance = radio.value;
                break;
            }
        }
        console.log(importance);
        saveQuest(name, desc, importance);
        cleanInputs();
        modal.style.display = 'none';
    });
    recoverData();
});

function saveQuest(name, desc, importance) {
    if (!name || !desc || !importance) {
        alert('Por favor completa todos los campos.');
        return;
    }
    cleanInputs();
    if (importance === 'important') {
        DivInsertImportant(name, desc);
    } else {
        insertNotImportant(name, desc);
    }
    saveData(); // Asegúrate de guardar los datos después de agregar una tarea
}

function cleanInputs() {
    document.getElementById('name').value = '';
    document.getElementById('description').value = '';
    const importanceRadios = document.getElementsByName('importance');
    for (const radio of importanceRadios) {
        radio.checked = false;
    }
}

function DivInsertImportant(nameQuest, descQuest) {
    var questContainer = document.getElementById("importante");
    var importantDiv = document.createElement("div");
    let strImportant = `<div><h2 class='titleQuestAdded'>${nameQuest}</h2><p class='textQuest'>${descQuest}</p></div><button class='complete'>Completada</button>`;
    importantDiv.innerHTML = strImportant;
    importantDiv.classList.add("important");
    importantDiv.style.backgroundColor = "#ff193c";
    questContainer.appendChild(importantDiv);
    var questAdded = [nameQuest, descQuest];
    importantQuest.push(questAdded);
}

function insertNotImportant(nameQuest, descQuest) {
    var questContainerN = document.getElementById("notImportante");
    var notImportantDiv = document.createElement("div");
    let strImportant = `<div><h2 class='titleQuestAdded'>${nameQuest}</h2><p class='textQuest'>${descQuest}</p></div><button class='complete'>Completada</button>`;
    notImportantDiv.innerHTML = strImportant;
    notImportantDiv.classList.add("noImportant");
    questContainerN.appendChild(notImportantDiv);
    var questAdded = [nameQuest, descQuest];
    notImportantQuest.push(questAdded);
}

function saveData() {
    var datosIguardar = JSON.stringify(importantQuest);
    var datosNguardar = JSON.stringify(notImportantQuest);
    localStorage.setItem('divImportant', datosIguardar);
    localStorage.setItem('divNotImportant', datosNguardar);
    console.log("Datos guardados en el local storage");
}

window.addEventListener("beforeunload", function() {
    saveData();
});

function recoverData(){
    var arrayIRecovered = recoverArrayImportant();
    var arrayNRecovered = recoverArrayNotImportant();

    for (var quest of arrayIRecovered) {
        DivInsertImportant(quest[0], quest[1]);
    }
    arrayNRecovered.forEach(function(quest) {
        insertNotImportant(quest[0], quest[1]);
    });
    checkQuestNotify();
}

function recoverArrayImportant() {
    var recoveredArray = localStorage.getItem("divImportant");
    if (recoveredArray) {
        return JSON.parse(recoveredArray);
    }
    return [];
}

function recoverArrayNotImportant() {
    var recoveredArrayN = localStorage.getItem("divNotImportant");
    if (recoveredArrayN) {
        return JSON.parse(recoveredArrayN);
    }
    return [];
}

var importantContainer = document.getElementById("importante");
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
                checkQuestNotify();
            }, 1500);
        } else {
            console.error("No se encontró ningún elemento con la clase 'titleQuestAdded'");
        }
    }
});

var notImportantContainer = document.getElementById('notImportante');
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
                checkQuestNotify();
            }, 1500);
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
    importantContainer.style.display = 'block';
    notImportantContainer.style.display = 'block';
    console.log("Regresando a todas");
});

function checkQuestNotify() {
    // Implementa la lógica de notificación aquí
}

function removeQuest(tasks, name) {
    return tasks.filter(task => task[0] !== name);
}
