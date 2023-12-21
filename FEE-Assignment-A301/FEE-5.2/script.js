'use strict';
const CONTAINER_DATA = new Array();

const aHeaderRecord = () => `   <div class="record">
                                <div class="name text-secondary user-select-none">Full Name</div>
                                <div class="dob text-secondary user-select-none">Dob</div>
                                <div class="gender text-secondary user-select-none">Gender</div>
                            </div>`;

const aRecord = (data, index) => `  <div class="record" keys="${index}">
                                    <div class="name">${data.fullmane}</div>
                                    <div class="dob">${data.dob}</div>
                                    <div class="gender">${data.gender}</div>
                                </div>`


function renderGUI() {
    const result = $("#result").html("");

    result.append(aHeaderRecord());
    CONTAINER_DATA.forEach((data, index) => {
        result.append(aRecord(data));
    })

    // reset value
    $("#input_name").val("");
    $("#input_dob").val("");
    $("#input_gender").val("other");
    $("#input_name").focus();
}

function addNewRow() {
    let name = $("#input_name").val();
    let dob = $("#input_dob").val();
    let gender = $("#input_gender").val();

    if (!name) {
        $("#input_name").focus();
        return;
    }

    if (!dob) {
        $("#input_dob").focus();
        return;
    }

    if (!gender) {
        $("#input_gender").focus();
        return;
    }

    // Push data
    CONTAINER_DATA.push({
        fullmane: name,
        dob: dob,
        gender: gender
    });

    // Render
    renderGUI();
}