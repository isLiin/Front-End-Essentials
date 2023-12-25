$(document).ready(function () {
    $("#info").hide()
    $("#updateBtn").hide()

    // $(".invalid-feedback").show()

    let name, department, phone, index
    let listEmployee = [
        { id: 1, name: "Diem", department: "Administration", phone: "0902666812" }
    ]
    let stt = 1
    displayArr(listEmployee)
    $("#cancelBtn").on('click', () => {
        $("#updateBtn").hide()
        $("#submitBtn").show()
        $("#info").trigger("reset")
        $("#info").hide()
    })

    $('#search').keyup(function(){
        let listSearch = []
        let search = $("#search").val()
        if (search.length > 0) {

            listEmployee.forEach(emp => {
                if (emp.name.toUpperCase().includes(search.toUpperCase())) {
                    listSearch.push(emp)
                }else if (emp.department.toUpperCase().includes(search.toUpperCase())) {
                    listSearch.push(emp)
                }else if (emp.phone.toUpperCase().includes(search.toUpperCase())) {
                    listSearch.push(emp)
                }
            });

            displayArr(listSearch)
        }else{
            displayArr(listEmployee)
        }

    })
    $("#addBtn").on('click', () => {
        $("#info").show()
    })

    $('#result').on('click', '#deleteBtn', function () {
        let id = $(this).parent().parent().attr('id');
        // console.log(id);
        listEmployee = listEmployee.filter((e) => e.id != id);
        displayArr(listEmployee)
    })

    $('#result').on('click', '#editBtn', function () {
        let id = $(this).parent().parent().attr('id');
        index = parseInt(id) - 1
        let cus = listEmployee[index]

        console.log(cus);
        $("#info").show()
        $("#name").val(cus.name)
        $("#department").val(cus.department)
        $("#phone").val(cus.phone)
        $("#updateBtn").show()
        $("#submitBtn").hide()
    })

    $("#submitBtn").on('click', () => {

        if (!checkValidate()) {
            return
        }
        getData()
        stt++
        let employee = { id: stt, name: name, department: department, phone: phone }
        listEmployee.push(employee)
        $("#info").trigger("reset")
        $("#info").hide()
        displayArr(listEmployee)
    })

    $("#updateBtn").on('click', () => {
        if (!checkValidate()) {
            return
        }
        getData()
        listEmployee[index].name = name
        listEmployee[index].department = department
        listEmployee[index].phone = phone

        displayArr(listEmployee)

        $("#updateBtn").hide()
        $("#submitBtn").show()
        $("#info").trigger("reset")
        $("#info").hide()

    })

    function checkValidate() {
        let checkName = isName("#name")
        let checkDepartment = isSelect("#department")
        let checkPhone = isMatchPhone("#phone");
        return checkName && checkDepartment && checkPhone
    }

    function getData() {
        name = $("#name").val()
        department = $("#department").val()
        phone = $("#phone").val()
    }

    function displayArr(array) {
        result.innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            result.innerHTML += appendRow(array[i])
        }

    }

    function appendRow(object) {

        let html = `<tr id="${object.id}">
        <td>${object.name}</td>
        <td>${object.department}</td>
        <td>${object.phone}</td>
        <td>
            <button class="border-0" id="editBtn"
                style="width: 30px;height: 30px;color: #ffc107; background-color: #fff;"><i
                    class="fa-solid fa-pen"></i></button>
            <button class="border-0" id="deleteBtn"
                style="width: 30px;height: 30px;color: #e34724; background-color: #fff;"><i
                    class="fa-solid fa-trash"></i></button>
        </td>`;

        return html;
    }

    isMatchPhone = function (selector) {
        let regex = /^[0][0-9]{9}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng số điện thoại");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }

    };

    isName = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập họ và tên!!!");
            return false
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn nhập sai!");
            return false
        } else {
            $(selector).removeClass("is-invalid")
            return true
        }
    }
    isSelect = function (selector) {
        if ($(selector).val() == $("option:first-child").val()) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa lựa chọn:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }


    };
})