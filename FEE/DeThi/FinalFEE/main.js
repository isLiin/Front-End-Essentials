$(document).ready(function (e) {
    const btnAdd = $("#btn-add");
    const inputName = $("#name-input");
    const inputPhone = $("#phone-input");
    const inputDepartment = $("#department-input");
    const btnSubmit = $("#btn-submit");
    const btnCancel = $("#btn-cancel");
    const bodyTable = $("#body-table");
    const inputSearch = $("#input-search");
    const btnYes = $("#btn-yes");
    const btnNo = $("#btn-no");
    let listEmployee = [];

    btnAdd.click(function (e) {
        showFormInput();
    })

    btnCancel.click(function(e){
        hideFormInput();
        resetFormInput();
        btnSubmit.html('Submit');
    })

    function showFormInput(){
        btnAdd.prop("disabled", true);
        $("#frame-input-employee").css('display', 'block');
        // $("#frame-table").css('width', '70%');
        // $("#body-table tr td").css('height', '20px');
        // $("#frame-input-employee").css('width', '30%');
    }

    function hideFormInput(){
        $("#frame-input-employee").css("display",'none');
        // $("#frame-table").css('width', '100%');
        btnAdd.prop("disabled", false);
    }

    function validateAll() {
        let flag = true;
        if (valString(inputName.val())) {
            $(".frame-input-name").find('.notify').html('');
        } else {
            $(".frame-input-name").find('.notify').html('Chỉ được nhập chữ cái độ dài từ 10-50');
            flag = false;
        }

        if (valNumber(inputPhone.val()) && checkPhoneExist(inputPhone.val())) {
            $(".frame-input-phone").find('.notify').html('');
        } else {
            $(".frame-input-phone").find('.notify').html('Số điện thoại độ dài từ 9 -11 và không được trùng');
            flag = false;
        }

        if (inputDepartment.val() !== '') {
            $(".frame-input-department").find('.notify').html('');
        } else {
            $(".frame-input-department").find('.notify').html('Vui lòng chọn mục này');
            flag = false;
        }
        return flag;
    }


    btnSubmit.click(function (e) {
        e.preventDefault();
        if(btnSubmit.html() === 'Update'){
            return;
        }
        if (!validateAll()) {
            return;
        }

        let newObj = {
            name: inputName.val(),
            department: inputDepartment.val(),
            phone: inputPhone.val()
        }

        listEmployee.push(newObj);
        loadHTMLTableEmployee(listEmployee);
        hideFormInput();
        updateCountEmployee(listEmployee);
        resetFormInput();
    });


    function loadHTMLTableEmployee(list) {
        bodyTable.html('');
        for (let i = 0; i < list.length; i++) {
            let newElement = document.createElement('tr');
            let element = `
            <td>`+list[i].name+`</th>
            <td>`+list[i].department+`</td>
            <td>`+list[i].phone+`</td>
            <td class="frame-action d-flex gap-1">
                <button
                    class="btn-edit btn p-0 d-flex justify-content-center align-items-center"
                    style="width: 30px;height: 30px;color: #ffc107;">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button
                    class="btn-remove btn p-0 d-flex justify-content-center align-items-center"
                    style="width: 30px;height: 30px;color: #e34724;" data-bs-toggle="modal" data-bs-target="#myModal">
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
            </td>`

            newElement.innerHTML = element;
            bodyTable.append(newElement);
            addEventEdit(newElement,i);
            addEventRemove(newElement,i);
        }
    }

    function updateCountEmployee(list){
        let arrDepartment = {
            'Administration':0,
            'Customer Service':0,
            'Human Resources':0
        }

        for(let i = 0; i < list.length;i++){
            arrDepartment[list[i].department]++;
        }
        $("#number-admin").html(arrDepartment['Administration']);
        $("#number-customer").html(arrDepartment['Customer Service']);
        $("#number-human").html(arrDepartment['Human Resources'])
    }

    
    inputSearch.keyup(function (e) {
        if(inputSearch.val().length === 0){
            loadHTMLTableEmployee(listEmployee);
        }
        if(inputSearch.val().length < 1){
            return;
        }
        let listSearch = [];
        for(let i = 0; i < listEmployee.length;i++){
            if(listEmployee[i].name.toLowerCase().includes(inputSearch.val().toLowerCase())){
                listSearch.push(listEmployee[i]);
            }else if(listEmployee[i].department.toLowerCase().includes(inputSearch.val().toLowerCase())){
                listSearch.push(listEmployee[i]);
            }else if(listEmployee[i].phone.includes(inputSearch.val())){
                listSearch.push(listEmployee[i]);
            }
        }
        loadHTMLTableEmployee(listSearch);
    });

    function addEventEdit(element,idx){
        let btnEdit = element.getElementsByClassName("btn-edit")[0];
        btnEdit.addEventListener('click',function(e){
            showFormInput();
            inputName.val(listEmployee[idx].name);
            inputDepartment.find('option[value="'+listEmployee[idx].department+'"]').prop('selected',true);
            inputPhone.val(listEmployee[idx].phone);
            btnSubmit.html("Update");
            btnSubmit.attr('idx',idx);
            updateInfo();
        })
    }

    // function checkPhoneExist(stringCheck){
    //     for(let i = 0; i < listEmployee.length;i++){
    //         if(stringCheck == listEmployee[i].phone){
    //             return false;
    //         }
    //     }
    //     return true;
    // }

    function checkPhoneExist(stringCheck){
        for(let i = 0; i < listEmployee.length;i++){
            if(btnSubmit.html()==='Submit'){
                if(stringCheck == listEmployee[i].phone){
                    return false;
                }
            }else{
                if(stringCheck == listEmployee[i].phone && btnSubmit.attr('idx') != i){
                    return false;
                }
            }
        }
        return true;
    }

    function addEventRemove(element,idx){
        let btnRemove = element.getElementsByClassName("btn-remove")[0];
        btnRemove.addEventListener('click',function(e){
            $("#myModal").attr("idx",idx);
        })
    }

    btnYes.click(function(e){
        listEmployee.splice($("#myModal").attr("idx"),1);
        loadHTMLTableEmployee(listEmployee);
        updateCountEmployee(listEmployee);
    })


    function resetFormInput(){
        inputName.val('');
        inputDepartment.find('option[value=""]').prop("selected",true);
        inputPhone.val('');
    }


    function updateInfo(){
        btnSubmit.click(function(e){
            if(btnSubmit.html()==='Submit'){
                return;
            }
            if(!validateAll()){
                return;
            }
            let idx = btnSubmit.attr('idx');
            listEmployee[idx].name = inputName.val();
            listEmployee[idx].department = inputDepartment.val();
            listEmployee[idx].phone = inputPhone.val();
            loadHTMLTableEmployee(listEmployee);
            resetFormInput();
            btnSubmit.html('Submit');
            hideFormInput();
            updateCountEmployee(listEmployee);
        })
    }
})