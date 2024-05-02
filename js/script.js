var btnMenu=document.getElementById("btnMenu");
var sidebar=document.getElementById("sidebar");
var header=document.getElementsByClassName("header")[0];
var quests=document.getElementsByClassName("body")[0];
var modal=document.getElementById("modal");
var btnQuest=document.getElementById("addQuest");
var sideActive=false;

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

document.body.addEventListener("click", function(event) {
    event.stopPropagation(); // Detener la propagación del evento
});

btnQuest.addEventListener("click",function(){
    modal.style.display="block";

    var closeBtn=document.getElementById("btnClose");
    closeBtn.addEventListener("click", function(){
        modal.style.display="none";
        event.stopPropagation();
    })

    var saveButton=document.getElementsById("saveButton");
    saveButton.addEventListener("click",function(){
        var nameQuest=document.getElementById("nameQuest").value;
        var descQuest=document.getElementById("descriptionQuest").value;
        var importante=document.getElementById("importance");
        var noImportante=document.getElementsById("importance2");
        if(importante.checked){
            
        }
    });
});