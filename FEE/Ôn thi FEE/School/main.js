$(document).ready(function () {
    let stt, editId, studentEdit, index;
    let id, fullName, gender, birthday, group, className, math, phy, chem, diemTB;
    $("#updateBtn").hide();

    let listStudent = [
        { id: 1, fullName: "Diem", gender: "Khac", birthday: "1998-02-17", group: "12", class: "12A1", math: 10, phy: 10, chem: 10 },
        { id: 2, fullName: "Diem", gender: "Nu", birthday: "1998-02-17", group: "11", class: "12A1", math: 9, phy: 9, chem: 9 },
        { id: 3, fullName: "Diem", gender: "Nu", birthday: "1998-02-17", group: "12", class: "12A1", math: 8, phy: 9, chem: 10 },
        { id: 4, fullName: "Diem", gender: "Nu", birthday: "1998-02-17", group: "10", class: "12A1", math: 7, phy: 8, chem: 9 },
        { id: 5, fullName: "Hoa", gender: "Nu", birthday: "1998-02-17", group: "12", class: "12A1", math: 6, phy: 7, chem: 8 }
    ]

    let length = listStudent.length

    displayArr(listStudent);
    function displayArr(listStudent) {
        stt = 0;
        $("#bodyTable").empty();
        listStudent.forEach(student => {
            stt++;
            var diemTB = (parseFloat(student.math) + parseFloat(student.phy) + parseFloat(student.chem)) / 3
            $("#bodyTable").append(
                `<tr id="${student.id}">
                <td>${stt}</td>
                <td>${student.fullName}</td>
                <td>${student.gender}</td>
                <td>${student.birthday}</td>
                <td>${student.group}</td>
                <td>${student.class}</td>
                <td>${student.math}</td>
                <td>${student.phy}</td>
                <td>${student.chem}</td>
                <td>${diemTB.toFixed(2)}</td>
                <td><button class="btn btn-outline-danger" id="editBtn"></button><button id="deleteBtn" class="btn btn-outline-primary"></button></td>
            </tr>`
            )
        });
        count()
    }
    function getData() {
        length++;
        id = length;
        fullName = $("#fullName").val();
        // gender = $('form')[0].gender.value
        gender = $('input[name=gender]:checked').val()
        birthday = $("#birthday").val();
        group = $("#group").val();
        className = $("#classN").val();
        math = $("#math").val();
        phy = $("#phy").val();
        chem = $("#chem").val();
    }


    $("#saveBtn").on('click', function () {
        if (validate()) {
            getData()
            let student = {
                id: id,
                fullName: fullName,
                gender: gender,
                birthday: birthday,
                group: group,
                class: className,
                math: math,
                phy: phy,
                chem: chem
            }
            listStudent.push(student)
            displayArr(listStudent);
            $("#formInput").trigger('reset')
        }

    })

    function validate() {
        var checkFullName = isFullName("#fullName")
        var checkGender = isCheckBox("#gender")
        var checkBirthday = isBirthday("#birthday")
        var checkGroup = isSelect("#group")
        var checkClassName = isSelect("#classN")
        var checkMath = isScore("#math")
        var checkPhy = isScore("#phy")
        var checkChem = isScore("#chem")
        return checkFullName && checkGender && checkBirthday && checkGroup && checkClassName && checkMath && checkPhy && checkChem
    }

    $("#result tbody").on('click', '#deleteBtn', function () {
        let idDelete = $(this).parent().parent().attr('id')
        console.log(idDelete);

        listStudent = listStudent.filter((e) => e.id != idDelete)
        displayArr(listStudent)
    })

    $("#result tbody").on('click', '#editBtn', function () {
        let editId = $(this).parent().parent().attr('id')

        for (let i = 0; i < listStudent.length; i++) {
            if (listStudent[i].id == editId) {
                studentEdit = listStudent[i];
                index = i;

            }
        }


        $("#fullName").val(studentEdit.fullName);
        $('input[name=gender][value=' + studentEdit.gender + ']').prop('checked', true)
        $("#birthday").val(studentEdit.birthday);
        $("#group").val(studentEdit.group);
        $("#classN").val(studentEdit.class);
        $("#math").val(studentEdit.math);
        $("#phy").val(studentEdit.phy);
        $("#chem").val(studentEdit.chem);
        $("#updateBtn").show();
        $("#saveBtn").hide();


    })


    $("#updateBtn").on('click', function () {

        getData()
        listStudent[index] = {
            id: id,
            fullName: fullName,
            gender: gender,
            birthday: birthday,
            group: group,
            class: className,
            math: math,
            phy: phy,
            chem: chem
        }
        displayArr(listStudent);
        $("#formInput").trigger('reset')
        $("#updateBtn").hide();
        $("#saveBtn").show();

    })

    $("#searchBtn").on('click', function () {
        var searchInput = $("#search").val()
        let searchArr = []
        listStudent.forEach(student => {
            if (student.fullName.includes(searchInput)) {
                searchArr.push(student)
            }
        });

        displayArr(searchArr);


    })


    function count() {

        let countK12 = 0, countK11 = 0, countK10 = 0;

        listStudent.forEach(student => {

            if (student.group == 12) {
                countK12++;
            }
            if (student.group == 11) {
                countK11++;
            }
            if (student.group == 10) {
                countK10++;
            }

        });

        $("#khoi10").text(countK10);
        $("#khoi11").text(countK11);
        $("#khoi12").text(countK12);

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

    isCheckBox = function () {
        let selector = 'input[type="radio"]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa nhập kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isCheckBox = function () {
        let selector = 'input[type="radio"]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa nhập kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isBirthday = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ngày sinh không hợp lệ!!");
            return false;
        } else if (!sosanh) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban phai nhap nho hon ngay hien tai");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isSelect = function (selector) {
        // if ($(selector).val() == $("option:first-child").val()) {
        if ($(selector).val() == null) {

            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa nhập lựa chọn:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };

    isScore = function (selector) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 0 || score > 10) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua phải trong khoảng 0 - 10 ");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };
})