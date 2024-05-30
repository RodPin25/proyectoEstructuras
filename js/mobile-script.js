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
    document.getElementById('moda').style.display = 'none';
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
    notImportantDiv.classList.add("noImportante");
    questContainerN.appendChild(notImportantDiv);
    var questAdded = [nameQuest, descQuest];
    notImportantQuest.push(questAdded);
}
