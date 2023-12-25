'use strict';

const LIST_VACXIN = [];

function renderGUIRadioVacxin() {
    $('#disabledTextInputQuantity').val(0);
    if (!$('input[name=exampleRadios]:checked').val().includes('None')) {
        $('fieldset').removeAttr('disabled');
        $('#disabledTextInputQuantity').removeAttr('disabled');
        $('#showComponentDate').show();
    }
    $('#showComponentDate').hide();
}

function renderGUIDateVacxin() {
    $('#msg_disabledTextInputQuantity').html('')
    let numb = $('#disabledTextInputQuantity').val();
    let container = $('#showComponentDate');
    container.hide();

    if (numb >= 1 && numb <= 3) {
        container.html('');
        container.show();
        for (let i = 0; i < numb; i++) {
            let RowGUI = `
                <div class="col-4">
                    <div class="form-group">
                    <label for="formGroupExampleInput text-capitalize">ngày tiêm mũi ${i + 1}</label>
                    <input type="date" class="form-control" id="formGroupExampleInput_date_vacxin_${i}">
                    </div>
                </div>`
            container.append(RowGUI);
        }
        return;
    }
    $('#msg_disabledTextInputQuantity').html('Lỗi! Số mũi tiêm vacxin là số nguyên từ 1 đến 3');
}

function handleInfoVaxin() {
    let isFlag = true;

    let fullName = $('#formGroupExampleInput_fullname');
    let numbVacxin = $('#disabledTextInputQuantity');
    let dob = $('#formGroupExampleInput_dob');
    let address = $('#formGroupExampleInput_address');
    let gender = $('#formGroupExampleInput_gender');
    let cccd = $('#formGroupExampleInput_cccd');


    let msg_fullName = $('#msg_formGroupExampleInput_fullname');
    let msg_numbVacxin = $('#msg_disabledTextInputQuantity');
    let msg_dob = $('#msg_formGroupExampleInput_dob');
    let msg_address = $('#msg_formGroupExampleInput_address');
    let msg_gender = $('#msg_formGroupExampleInput_gender');
    let msg_cccd = $('#msg_formGroupExampleInput_cccd');

    msg_fullName.html('');
    msg_numbVacxin.html('');
    msg_dob.html('');
    msg_address.html('');
    msg_gender.html('');
    msg_cccd.html('');


    numbVacxin.removeClass("is-invalid");
    if ((numbVacxin >= 1 && numbVacxin <= 3)) {
        numbVacxin.addClass("is-invalid");
        msg_numbVacxin.html("is-invalid!");
        numbVacxin.focus();
        isFlag = false;
    }

    cccd.removeClass("is-invalid");
    if (!validateCCCD(cccd.val())) {
        cccd.addClass("is-invalid");
        msg_cccd.html("is-invalid!");
        cccd.focus();
        isFlag = false;
    }


    address.removeClass("is-invalid");
    if (!validateText(address.val())) {
        address.addClass("is-invalid");
        msg_address.html("chuỗi chỉ chứa các ký tự alphabet và khoảng trắng!");
        address.focus();
        isFlag = false;
    }

    gender.removeClass("is-invalid");
    if (!validateGender(gender.val())) {
        gender.addClass("is-invalid");
        msg_gender.html("is-invalid!");
        gender.focus();
        isFlag = false;
    }

    dob.removeClass("is-invalid");
    if (!validateDateOfNow(dob.val())) {
        dob.addClass("is-invalid");
        msg_dob.html("is-invalid!");
        dob.focus();
        isFlag = false;
    }


    fullName.removeClass("is-invalid");
    if (!validateText(fullName.val())) {
        fullName.addClass("is-invalid");
        msg_fullName.html("chuỗi chỉ chứa các ký tự alphabet và khoảng trắng!");
        fullName.focus();
        isFlag = false;
    }

    let countVacxin = $('#disabledTextInputQuantity').val();

    $(`#formGroupExampleInput_date_vacxin_0`).removeClass("is-invalid");
    $(`#formGroupExampleInput_date_vacxin_1`).removeClass("is-invalid");
    $(`#formGroupExampleInput_date_vacxin_2`).removeClass("is-invalid");
    switch (parseInt(countVacxin)) {
        case 3:
            let date1 = $(`#formGroupExampleInput_date_vacxin_0`).val();
            let date2 = $(`#formGroupExampleInput_date_vacxin_1`).val();
            let date3 = $(`#formGroupExampleInput_date_vacxin_2`).val();

            if ((validateDateVacxin(date1, date2))) {
                $(`#formGroupExampleInput_date_vacxin_1`).addClass("is-invalid");
                if ((validateDateVacxin(date2, date3))) {
                    $(`#formGroupExampleInput_date_vacxin_2`).addClass("is-invalid");
                }
                isFlag = false;
            }
            break;
        case 2:
            let date_1 = $(`#formGroupExampleInput_date_vacxin_0`).val();
            let date_2 = $(`#formGroupExampleInput_date_vacxin_1`).val();

            if ((validateDateVacxin(date_1, date_2))) {
                $(`#formGroupExampleInput_date_vacxin_1`).addClass("is-invalid");
                isFlag = false;
            }
        case 1:
            if ($(`#formGroupExampleInput_date_vacxin_0`).val().trim().length === 0) {
                $(`#formGroupExampleInput_date_vacxin_0`).addClass("is-invalid");
                isFlag = false;
            }
            break;
        case 0:
            $(`#disabledTextInputQuantity`).addClass("is-invalid");
            isFlag = false;
            break;
    }

    if (isFlag) {
        let vacxin = $('input[name=exampleRadios]:checked').val();
        let numbVacxin = $('#disabledTextInputQuantity').val();
        let dateVacxin = [];
        console.log(vacxin);
        for (let i = 0; i < numbVacxin; i++) {
            dateVacxin.push($(`#formGroupExampleInput_date_vacxin_${i}`).val())
        }

        LIST_VACXIN.push({
            fullName: fullName.val(),
            gender: gender.val(),
            dob: dob.val(),
            cccd: cccd.val(),
            address: address.val(),
            vacxin,
            dateVacxin,
        })

        renderGUITable();
        $('#form_info').trigger('reset');
        $('#form_vacxin').trigger('reset');
        $('#showComponentDate').html('')
    }
}

const addRow = (dateVacxin) => {
    let trRow = '';
    switch (dateVacxin.length) {
        case 2:
            trRow += `<tr>
                        <td>${dateVacxin[1]}</td>
                    </tr>`
            break;
        case 3:
            trRow += `<tr>
                        <td>${dateVacxin[1]}</td>
                    </tr>`
            trRow += `<tr>
                            <td>${dateVacxin[2]}</td>
                        </tr>`

            break;
    }
    return trRow;
}

function renderGUITable() {
    const Row = (info, index) => `<tr>
                                        <td rowspan="${info.dateVacxin.length}">${index}</td>
                                        <td rowspan="${info.dateVacxin.length}">${info.fullName}</td>
                                        <td rowspan="${info.dateVacxin.length}">${info.gender}</td>
                                        <td rowspan="${info.dateVacxin.length}">${info.dob}</td>
                                        <td rowspan="${info.dateVacxin.length}">${info.cccd}</td>
                                        <td rowspan="${info.dateVacxin.length}">${info.vacxin}</td>
                                        <td>${info.dateVacxin[0]}</td>
                                        <td rowspan="${info.dateVacxin.length}">
                                            <button class="btn btn-danger" onclick="handleDelete(${index})">
                                                <i class="far fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>` + addRow(info.dateVacxin);
    LIST_VACXIN.forEach((info, index) => $('#data_table').html(Row(info, index)));
    renderGUICount();
}

function handleDelete(index) {
    if (confirm("Bạn có muốn xoá row Data này không?")) {
        LIST_VACXIN.splice(index, 1)
    }
    renderGUICount();
}

function checkedDateVacxin() {
    let numbVacxin = $('#disabledTextInputQuantity').val();

    switch (numbVacxin) {
        case 3:
            let date1 = $(`#formGroupExampleInput_date_vacxin_0`).val();
            let date2 = $(`#formGroupExampleInput_date_vacxin_1`).val();
            let date3 = $(`#formGroupExampleInput_date_vacxin_2`).val();

            if (validateDateVacxin(date1, date2) && validateDateVacxin(date2, date3)) {
                return true;
            }
            break;
        case 2:
            let date_1 = $(`#formGroupExampleInput_date_vacxin_0`).val();
            let date_2 = $(`#formGroupExampleInput_date_vacxin_1`).val();

            if (validateDateVacxin(date_1, date_2)) {
                return true;
            }
            break;
        case 1:
            return true;
    }
    return false
}

function renderGUICount() {
    $('#count').html(LIST_VACXIN.length);
}

$(document).ready(function () {
    $('#showComponentDate').hide();
    $('input[name=exampleRadios]').click(renderGUIRadioVacxin)
    $('#disabledTextInputQuantity').on('change', renderGUIDateVacxin);
    $('#btnSaveInfo').click(handleInfoVaxin);
    renderGUITable();
})