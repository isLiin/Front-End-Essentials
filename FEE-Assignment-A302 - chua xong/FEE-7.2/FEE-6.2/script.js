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
    </div>
`
const recordEmpty = `
    <div class="list-group-item customItems">
        <div class="line-data text-secondary">Empty</div>
    </div>
`;

function isEmpty() {
    if (CONTAINER_DATA.length == 0) {
        $("#group-data").html("");
        $("#group-data").append(recordEmpty);
    } else {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((title, index) => {
            $("#group-data").append(recordData(title, index));
        })
    }
}
function deleteValue(index) {
    CONTAINER_DATA.splice(index, 1);
    isEmpty();
}

function addValue() {
    $("#title-error").html("");
    let title = $('#userInput').val();

    if (validateText(title)) {
        if ($("#userBtn-add").val() == "add") {
            CONTAINER_DATA.push(title);
        } else {
            CONTAINER_DATA[parseInt($("#userBtn-add").attr('keys'))] = title;
            $("#userBtn-add").val("add"); 
            $("#userBtn-add").html("Add item");
        }
    } else {
        $("#title-error").html("Please enter a valid title");
    }
    isEmpty();
    $('#userInput').val("");
    $('#userInput').focus();
}

function editValue(index) {
    let data = CONTAINER_DATA[index];
    $('#userInput').val(data);

    $("#userBtn-add").val("edit");
    $("#userBtn-add").attr('keys', index);
    $("#userBtn-add").html("Change item");
    $('#userInput').focus();
}

function clearAll() {
    CONTAINER_DATA = [];
    isEmpty();
}

// Code to run when the document is ready.
$(document).ready(function () {
    isEmpty();
});
