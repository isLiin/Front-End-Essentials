'use strict';
var CONTAINER_DATA = new Array();

const recordData = (title, index) => `
    <div class="list-group-item customItems">
        <div class="line-data">${title}</div>
        <div class="action d-flex justify-content-end">
            <button class="btn btn-outline-info customBtnEdit" onClick="editValue(${index})">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn btn-outline-danger ml-2 customBtn" onClick="deleteValue(${index})">
                <i class="fa-solid fa-times"></i>
            </button>
        </div>
    </div>`

function renderGUI() {
    const groupData = $("#group-data").html("");
    CONTAINER_DATA.forEach((title, index) => {
        groupData.append(recordData(title, index));
    })
}

function deleteValue(index) {
    CONTAINER_DATA.splice(index, 1);
    renderGUI();
}

function addValue() {
    let messError = $("#title-error");
    let btnAdd = $("#userBtn-add");
    let keysValueUser = $('#userInput');

    messError.html("");
    if (validateText(keysValueUser.val())) {
        if (btnAdd.val() == "add") {
            CONTAINER_DATA.push(keysValueUser.val());
        } else {
            CONTAINER_DATA[parseInt(btnAdd.attr('flagKeys'))] = keysValueUser.val();
            btnAdd.val("add");
            btnAdd.html("Add item");
        }
    } else {
        messError.html("Please enter a valid title");
    }
    renderGUI();
    keysValueUser.val("");
    keysValueUser.focus();
}

function editValue(index) {
    let messError = $("#title-error");    
    let keysValueUser = $('#userInput');
    let btnAdd = $("#userBtn-add");
    
    let oldValue = CONTAINER_DATA[index];
    keysValueUser.val(oldValue);
    
    messError.html("");
    btnAdd.val("edit");
    btnAdd.attr('flagKeys', index);
    btnAdd.html("Change item");
    keysValueUser.focus();
}

function clearAll() {
    CONTAINER_DATA = [];
    renderGUI();
}

// Code to run when the document is ready.
$(document).ready(function () {
    renderGUI();
});
