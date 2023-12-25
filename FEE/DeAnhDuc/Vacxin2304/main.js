$(document).ready(function () {
    // let date=addMonth(new Date())
    // console.log(date.getMonth());
    let stt, soMui, fullName, birthDate, gender, address, cccd, loaiVacxin, soLuong, mui1, mui2, mui3

    // checkSoLuong()

    let idNum = 1

    let listPerson = [
        { id: 1, fullName: "Diem", birthDate: "1998-02-17", gender: "Nu", address: "Quang Nam", cccd: "098765432111", loaiVacxin: "Vero Cell", soLuong: 2, tiemDate: ["2022-01-04", "2022-06-04"] }
    ]

    displayArr()
    $("#soLuong").prop('disabled', true)

    $('input[type=radio][name=inlineRadioOptions]').on('change', function () {
        if ($('#noneCheck').is(':checked')) {
            $("#soLuong").prop('disabled', true)
            $("#soLuong").val(0)
        } else if (!$('#noneCheck').is(':checked')) {
            $("#soLuong").prop('disabled', false)
        }
    })
    $("#block1").hide()
    $("#block2").hide()
    $("#block3").hide()
    $("#soLuong").on('change', function () {
        if ($("#soLuong").val() > 3 || $("#soLuong").val() < 0) {
            alert("Loi!! So mui tiem Vacxin  so nguyen tu 1 den 3")
            $("#soLuong").val(0)
            $("#block1").hide()
            $("#block2").hide()
            $("#block3").hide()
        } else if ($("#soLuong").val() == 1) {
            $("#block1").show()
            $("#block2").hide()
            $("#block3").hide()
        } else if ($("#soLuong").val() == 2) {
            $("#block1").show()
            $("#block2").show()
            $("#block3").hide()
        } else if ($("#soLuong").val() == 3) {
            $("#block1").show()
            $("#block2").show()
            $("#block3").show()
        } else if ($("#soLuong").val() === 0) {
            $("#block1").hide()
            $("#block2").hide()
            $("#block3").hide()
        }
    })
    $("#saveBtn").on('click', function () {
        let checkMui2 = true
        let checkMui3 = true

        let checkFullName = isFullName("#fullName")
        let checkBirthDate = isBirthDate("#birthDate")
        let checkGender = isSelect("#gender")
        let checkAddress = isFullName("#address")
        let checkCccd = isCCCD("#cccd")
        if ($("#soLuong").val() == "2") {
            checkMui2 = lonHonMotThangNgayKhac("#mui1", "#mui2")
        }
        if ($("#soLuong").val() == "3") {
            checkMui2 = lonHonMotThangNgayKhac("#mui1", "#mui2")
            checkMui3 = lonHonMotThangNgayKhac("#mui2", "#mui3")

        }
        if (checkFullName && checkBirthDate && checkGender && checkAddress && checkCccd && checkMui2 && checkMui3) {
            getData()
            idNum++
            console.log(idNum);
            let person = {
                id: idNum,
                fullName: $("#fullName").val(),
                birthDate: $("#birthDate").val(),
                gender: $("#gender").val(),
                address: $("#address").val(),
                cccd: $("#cccd").val(),
                loaiVacxin: loaiVacxin,
                soLuong: soLuong,
                tiemDate: []
            }
            console.log(person);
            if (soLuong == 0) {
                person.tiemDate.push("chua tiem")
            } else if (soLuong == 1) {
                person.tiemDate.push($("#mui1").val())
            } else if (soLuong == 2) {
                person.tiemDate.push($("#mui1").val())
                person.tiemDate.push($("#mui2").val())
            } else if (soLuong == 3) {
                person.tiemDate.push($("#mui1").val())
                person.tiemDate.push($("#mui2").val())
                person.tiemDate.push($("#mui3").val())
            }

            listPerson.push(person)
            displayArr()
            // $("#info").trigger('reset')
        }



    })

    $('#result tbody').on('click', '#deleteBtn', function () {

        let idDelete = $(this).parent().parent().attr('id')
        console.log(idDelete);
        let check = "Ban co muon xoa khong"
        
        if (confirm(check) == true) {
            listPerson = listPerson.filter((e) => e.id != idDelete)
            displayArr()
        }

    })

    function displayArr() {
        $("#danhSach").text(`Danh sach nay co ${listPerson.length} nguoi`)
        stt = 0
        $("#kqua").empty()
        listPerson.forEach(person => {
            // console.log(person);
            stt++
            soMui = person.tiemDate.length

            $("#kqua").append(
                `<tr id="${person.id}">
            <td rowspan=${soMui}>${stt}</td>
            <td rowspan=${soMui}>${person.fullName}</td>
            <td rowspan=${soMui}>${person.gender}</td>
            <td rowspan=${soMui}>${person.birthDate}</td>
            <td rowspan=${soMui}>${person.cccd}</td>
            <td rowspan=${soMui}>${person.loaiVacxin}</td>
            <td>${person.tiemDate[0]}</td>
            <td rowspan="${soMui}"><button id="deleteBtn" class="btn btn-light" style="border: 1px solid black;"><i class="far fa-trash-alt"></i></button></td>
        </tr>`
            )
            if (soMui > 1) {
                for (let i = 1; i < soMui; i++) {
                    $("#kqua").append(
                        `<tr>
                        <td>${person.tiemDate[i]}</td>
                        </tr>`
                    )
                }
            }
        });
    }


    function getData() {
        fullName = $("#fullName").val()
        birthDate = $("#birthDate").val()
        gender = $("#gender").val()
        address = $("#address").val()
        cccd = $("#cccd").val()
        // loaiVacxin = $("#loaiVacxin").val()
        // 'input[name="vaccine"]:checked'
        loaiVacxin = $('input[name="inlineRadioOptions"]:checked').val()
        soLuong = $("#soLuong").val()
        mui1 = $("#mui1").val()
        mui2 = $("#mui2").val()
        mui3 = $("#mui3").val()
    }

    isFullName = function (selector) {
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

    isBirthDate = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ngày xuất hoá đơn không hợp lệ!!");
            return false;
        } else if (!sosanh) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban phai nhap nho hon năm hien tai");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }



    isSelect = function (selector) {
        if ($(selector).val() == $("option:first-child").val()) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa chon lựa chọn");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };

    isSelect = function (selector) {
        if ($(selector).val() == $("option:first-child").val()) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa chon lựa chọn");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };

    isCCCD = function (selector) {
        let regex = /^[0-9]{12}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập CCCD");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    lonHonMotThangNgayKhac = function (selector, selector2) {
        let namnhapvao = $(selector2).val();
        console.log(namnhapvao);
        console.log($(selector).val());

        let extraMoth = addMonth(new Date($(selector).val()));
        console.log(extraMoth);

        // let ngayht = new Date();
        let sosanh = (new Date(extraMoth) < new Date(namnhapvao));
        if ($(selector2).val() == "") {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban phai nhap lon hon ky truoc 1 thang");
            return false;
        } else {
            $(selector2).removeClass("is-invalid");
            return true;
        }
    }
    //add 1 thang
    function addMonth(valDate) {
        return new Date(valDate.getFullYear(), (valDate.getMonth() + 1), valDate.getDate());
    }

    //
    // $("#info").hide()
    // $("#updateBtn").hide()

    // $(".invalid-feedback").show()

    // let name, department, phone, index
    // let listEmployee = [
    //     { id: 1, name: "Diem", department: "Administration", phone: "0902666812" }
    // ]
    // let stt = 1
    // displayArr(listEmployee)
    // $("#cancelBtn").on('click', () => {
    //     $("#updateBtn").hide()
    //     $("#submitBtn").show()
    //     $("#info").trigger("reset")
    //     $("#info").hide()
    // })

    // $('#search').keyup(function () {
    //     let listSearch = []
    //     let search = $("#search").val()
    //     if (search.length > 0) {

    //         listEmployee.forEach(emp => {
    //             if (emp.name.toUpperCase().includes(search.toUpperCase())) {
    //                 listSearch.push(emp)
    //             } else if (emp.department.toUpperCase().includes(search.toUpperCase())) {
    //                 listSearch.push(emp)
    //             } else if (emp.phone.toUpperCase().includes(search.toUpperCase())) {
    //                 listSearch.push(emp)
    //             }
    //         });

    //         displayArr(listSearch)
    //     } else {
    //         displayArr(listEmployee)
    //     }

    // })
    // $("#addBtn").on('click', () => {
    //     $("#info").show()
    // })

    // $('#result').on('click', '#deleteBtn', function () {
    //     let id = $(this).parent().parent().attr('id');
    //     // console.log(id);
    //     listEmployee = listEmployee.filter((e) => e.id != id);
    //     displayArr(listEmployee)
    // })

    // $('#result').on('click', '#editBtn', function () {
    //     let id = $(this).parent().parent().attr('id');
    //     index = parseInt(id) - 1
    //     let cus = listEmployee[index]

    //     console.log(cus);
    //     $("#info").show()
    //     $("#name").val(cus.name)
    //     $("#department").val(cus.department)
    //     $("#phone").val(cus.phone)
    //     $("#updateBtn").show()
    //     $("#submitBtn").hide()
    // })

    // $("#submitBtn").on('click', () => {

    //     if (!checkValidate()) {
    //         return
    //     }
    //     getData()
    //     stt++
    //     let employee = { id: stt, name: name, department: department, phone: phone }
    //     listEmployee.push(employee)
    //     $("#info").trigger("reset")
    //     $("#info").hide()
    //     displayArr(listEmployee)
    // })

    // $("#updateBtn").on('click', () => {
    //     if (!checkValidate()) {
    //         return
    //     }
    //     getData()
    //     listEmployee[index].name = name
    //     listEmployee[index].department = department
    //     listEmployee[index].phone = phone

    //     displayArr(listEmployee)

    //     $("#updateBtn").hide()
    //     $("#submitBtn").show()
    //     $("#info").trigger("reset")
    //     $("#info").hide()

    // })

    // function checkValidate() {
    //     let checkName = isName("#name")
    //     let checkDepartment = isSelect("#department")
    //     let checkPhone = isMatchPhone("#phone");
    //     return checkName && checkDepartment && checkPhone
    // }

    // function getData() {
    //     name = $("#name").val()
    //     department = $("#department").val()
    //     phone = $("#phone").val()
    // }

    // function displayArr(array) {
    //     result.innerHTML = "";
    //     for (let i = 0; i < array.length; i++) {
    //         result.innerHTML += appendRow(array[i])
    //     }

    // }

    // function appendRow(object) {

    //     let html = `<tr id="${object.id}">
    //     <td>${object.name}</td>
    //     <td>${object.department}</td>
    //     <td>${object.phone}</td>
    //     <td>
    //         <button class="border-0" id="editBtn"
    //             style="width: 30px;height: 30px;color: #ffc107; background-color: #fff;"><i
    //                 class="fa-solid fa-pen"></i></button>
    //         <button class="border-0" id="deleteBtn"
    //             style="width: 30px;height: 30px;color: #e34724; background-color: #fff;"><i
    //                 class="fa-solid fa-trash"></i></button>
    //     </td>`;

    //     return html;
    // }

    // isMatchPhone = function (selector) {
    //     let regex = /^[0][0-9]{9}$/;
    //     if ($(selector).val() == "") {
    //         $(selector).addClass("is-invalid");
    //         $(selector).next().html("Ban chua nhap truong nay");
    //         return false;
    //     } else if (!regex.test($(selector).val())) {
    //         $(selector).addClass("is-invalid");
    //         $(selector).next().html("Ban nhap chua đúng số điện thoại");
    //         return false;
    //     } else {
    //         $(selector).removeClass("is-invalid");
    //         return true
    //     }

    // };

    // isName = function (selector) {
    //     // let regex = /^(C)[a-zA-z]+$/;
    //     let regex = /^[ a-zA-Z]+$/;
    //     if ($(selector).val() == "") {
    //         $(selector).addClass("is-invalid");
    //         $(selector).next().html("Yêu cầu nhập họ và tên!!!");
    //         return false
    //     } else if (!regex.test($(selector).val())) {
    //         $(selector).addClass("is-invalid");
    //         $(selector).next().html("Bạn nhập sai!");
    //         return false
    //     } else {
    //         $(selector).removeClass("is-invalid")
    //         return true
    //     }
    // }
    // isSelect = function (selector) {
    //     if ($(selector).val() == $("option:first-child").val()) {
    //         $(selector).addClass("is-invalid");
    //         $(selector).next().html("Bạn chưa lựa chọn:");
    //         return false;
    //     } else {
    //         $(selector).removeClass("is-invalid");
    //         return true;
    //     }


    // };
})