$(document).ready(function () {
    let stt;
    let fullName, birthday, gender, address, cccd, vacxin, soMui, date1, date2, date3
    $("#soMui").prop('disabled', true)
    $("#mui1Form").hide()
    $("#mui2Form").hide()
    $("#mui3Form").hide()

    listInfo = [
        { id: 1, fullName: "Diem", gender: "Nu", birthday: "1998-02-17", cccd: "0987654321", vacxin: "Vero Cell", dateTiem: ["2022-01-04", "2022-03-01"] },
        { id: 2, fullName: "Diem1", gender: "Nu", birthday: "1998-02-17", cccd: "0987654321", vacxin: "Chua tiem", dateTiem: [] },
        { id: 3, fullName: "Diem2", gender: "Nu", birthday: "1998-02-17", cccd: "0987654321", vacxin: "Pilze", dateTiem: ["2022-01-04"] },
    ]
    let length = listInfo.length
    disArr(listInfo)

    function disArr(arr) {
        $("#bodyTable").empty()
        stt = 0;
        arr.forEach(element => {
            var row = element.dateTiem.length
            stt++;
            if (row == 0) {
                $("#bodyTable").append(
                    `<tr id="${element.id}">
                    <td>${stt}</td>
                    <td>${element.fullName}</td>
                    <td>${element.gender}</td>
                    <td>${element.birthday}</td>
                    <td>${element.cccd}</td>
                    <td>${element.vacxin}</td>
                    <td>Khong mui</td>
                    <td><button id="deleteBtn" class="border-0"><i class="far fa-trash-alt"></i></button></td>
                </tr>`
                )
            } else {
                $("#bodyTable").append(
                    `<tr id="${element.id}">
                    <td rowspan="${row}">${stt}</td>
                    <td rowspan="${row}">${element.fullName}</td>
                    <td rowspan="${row}">${element.gender}</td>
                    <td rowspan="${row}">${element.birthday}</td>
                    <td rowspan="${row}">${element.cccd}</td>
                    <td rowspan="${row}">${element.vacxin}</td>
                    <td>${element.dateTiem[0]}</td>
                    <td rowspan="${row}"><button id="deleteBtn" class="border-0"><i class="far fa-trash-alt"></i></button></td>
                </tr>`
                )

                for (let i = 1; i < row; i++) {
                    $("#bodyTable").append(
                        `<tr>
                        <td>${element.dateTiem[i]}</td>
                    </tr>`
                    )
                }
            }
        });
    }

    $('input[name=vacxin]').on('change', function () {
        var vacxinCheck = $('input[name=vacxin]:checked').val()
        if (vacxinCheck === "Chua tiem") {
            $("#soMui").prop('disabled', true)
            $("#soMui").removeClass("is-invalid");
            $("#soMui").val(0)
        } else {
            $("#soMui").prop('disabled', false)
        }
    })

    $("#soMui").on('change', function () {
        var soMuiCheck = $("#soMui").val()

        if (soMuiCheck < 1 || soMuiCheck > 4) {
            alert("Loi!! So mui tiem vacxin so nguyen tu 1 den 3")
            $("#soMui").val(0)
        }

        if (soMuiCheck == 1) {
            $("#mui1Form").show()
            $("#mui2Form").hide()
            $("#mui3Form").hide()
        } else if (soMuiCheck == 2) {
            $("#mui1Form").show()
            $("#mui2Form").show()
            $("#mui3Form").hide()
        } if (soMuiCheck == 3) {
            $("#mui1Form").show()
            $("#mui2Form").show()
            $("#mui3Form").show()
        }
    })

    $("#saveBtn").on('click', function () {
        if (validate()) {


            length++;
            // console.log(length);
            getData()
            let info = {
                id: length,
                fullName: fullName,
                gender: gender,
                birthday: birthday,
                cccd: cccd,
                vacxin: vacxin,
                dateTiem: []
            }
            if (soMui == 1) {
                info.dateTiem.push(date1)
            } else if (soMui == 2) {
                info.dateTiem.push(date1)
                info.dateTiem.push(date2)
            } else if (soMui == 3) {
                info.dateTiem.push(date1)
                info.dateTiem.push(date2)
                info.dateTiem.push(date3)
            } else if (info.vacxin == "Chua tiem") {
                info.dateTiem.push("Khong mui")
            }
            listInfo.push(info)
            disArr(listInfo)

            $("#formInput").trigger('reset')
            $("#mui1Form").hide()
            $("#mui2Form").hide()
            $("#mui3Form").hide()
            $('input[name=vacxin][value=Chua tiem]').prop('checked', true)
        }

    })

    $("#result tbody").on('click', '#deleteBtn', function () {
        let idDelete = $(this).parent().parent().attr('id')
        listInfo = listInfo.filter((e) => e.id != idDelete)
        console.log(listInfo);
        disArr(listInfo)
    })

    function getData() {
        fullName = $("#fullName").val()
        birthday = $("#birthday").val()
        gender = $("#gender").val()
        address = $("#address").val()
        cccd = $("#cccd").val()
        vacxin = $('input[name=vacxin]:checked').val()
        soMui = $("#soMui").val()
        date1 = $("#mui1").val()
        date2 = $("#mui2").val()
        date3 = $("#mui3").val()
    }

    function validate() {
        var checkFullName = isFullName("#fullName")
        var checkBirthday = isBirthday("#birthday")
        var checkGender = isSelect("#gender")
        var checkAdress = isFullName("#address")
        var checkCCCD = isMatchCCCD("#cccd")
        var checkSoMui = true
        var checkMui1 = true
        var checkMui2 = true
        var checkMui3 = true

        if ($('input[name=vacxin]:checked').val() != "Chua tiem") {
            checkSoMui = isMatchSoMui("#soMui")
        }

        if ($("#soMui").val() == 1) {
            checkMui1 = isMui1("#mui1")
        } else if ($("#soMui").val() == 2) {
            checkMui1 = isMui1("#mui1")
            checkMui2 = isMui2("#mui1", "#mui2")
        } else if ($("#soMui").val() == 3) {
            checkMui1 = isMui1("#mui1")
            checkMui2 = isMui2("#mui1", "#mui2")
            checkMui3 = isMui2("#mui2", "#mui3")
        }
        return checkFullName && checkBirthday && checkGender && checkAdress && checkCCCD && checkSoMui && checkMui1 && checkMui2 && checkMui3


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

    isAddress = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập dia chi!!!");
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

    isMatchCCCD = function (selector) {
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

    isMatchSoMui = function (selector) {
        // let regex = /^0[1-9]|1[0-2]$/;
        let regex = /^(01|02|03|1|2|3)$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Sai so mui");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    isMui1 = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
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

    isMui2 = function (selector, selector2) {
        let namnhapvao = $(selector2).val();
        let ngaykhac = $(selector).val();
        // let ngayht = new Date();
        let sosanh = (addMonth(new Date(ngaykhac), 1) < new Date(namnhapvao));
        if ($(selector2).val() == "") {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban phai nhap lon hon ngay tiem mui truoc 1 thang");
            return false;
        } else {
            $(selector2).removeClass("is-invalid");
            return true;
        }
    }

    function addMonth(valDate, valAdd) {
        return new Date(valDate.getFullYear(), valDate.getMonth() + valAdd, valDate.getDate());
    }
})