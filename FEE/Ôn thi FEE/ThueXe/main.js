$(document).ready(function () {
    let hangXe, loaiXe, giaXe, fullName, phone, address, nhanXeDate, traXeDate, extraFee, hinhThuc, index;

    $("#thueXeFee").hide()
    $("#datXeBtn").prop('disabled', true)

    let listRent = [
        { id: 1, img: "#", hangXe: "Kia morning", loaiXe: "4 cho", giaXe: 500000, tinhTrang: "Da cho thue" },
        { id: 2, img: "#", hangXe: "Huyundai I10", loaiXe: "4 cho", giaXe: 700000, tinhTrang: "Co san" },
        { id: 3, img: "#", hangXe: "Kia K3", loaiXe: "4 cho", giaXe: 900000, tinhTrang: "Co san" },
        { id: 4, img: "#", hangXe: "Kia Rondo", loaiXe: "7 cho", giaXe: 900000, tinhTrang: "Da cho thue" },
        { id: 5, img: "#", hangXe: "Toyota Fortuner", loaiXe: "7 cho", giaXe: 1100000, tinhTrang: "Co san" }
    ]

    let listInfo = [
        {
            id: 1,
            fullName: "Diem1",
            phone: "0987654321",
            hangXe: "Kia morning",
            loaiXe: "7 cho",
            giaXe: 700000,
            nhanXeDate: "2023-08-21",
            traXeDate: "2023-08-25",
            hinhThuc: "Tu lai"
        },
        {
            id: 2,
            fullName: "Diem2",
            phone: "0987654321",
            hangXe: "Kia morning",
            loaiXe: "7 cho",
            giaXe: 700000,
            nhanXeDate: "2023-08-21",
            traXeDate: "2023-08-25",
            hinhThuc: "Tu lai"
        },
        {
            id: 3,
            fullName: "Diem3",
            phone: "0987654321",
            hangXe: "Kia morning",
            loaiXe: "7 cho",
            giaXe: 700000,
            nhanXeDate: "2023-08-21",
            traXeDate: "2023-08-22",
            hinhThuc: "Cho thue"
        },
    ]
    let length = listInfo.length

    displayXe(listRent)
    function displayXe(arr) {
        $("#tableXe tbody").empty()
        arr.forEach(element => {
            if (element.tinhTrang == "Co san") {
                $("#tableXe tbody").append(
                    `<tr id="${element.id}">
                    <td>${element.id}</td>
                    <td><img style="height: 50px; width: 50px;" src="95C38E1E-6AFB-49AA-B974-DDD1A74D52DE_4_5005_c.jpeg" alt=""></td>
                    <td>${element.hangXe}</td>
                    <td>${element.loaiXe}</td>
                    <td>${element.giaXe}</td>
                    <td>${element.tinhTrang}</td>
                    <td><button id="rentBtn" class="border-0"><i class="fas fa-plug"></i></button></td>
                </tr>`
                )
            } else (
                $("#tableXe tbody").append(
                    `<tr id="${element.id}">
                    <td>${element.id}</td>
                    <td><img style="height: 50px; width: 50px;" src="95C38E1E-6AFB-49AA-B974-DDD1A74D52DE_4_5005_c.jpeg" alt=""></td>
                    <td>${element.hangXe}</td>
                    <td>${element.loaiXe}</td>
                    <td>${element.giaXe}</td>
                    <td>${element.tinhTrang}</td>
                    <td><button id="infoBtn" class="border-0"><i class="fas fa-info-circle"></i></button></td>
                </tr>`
                )
            )
        });

    }
    displayInfo(listInfo)
    function displayInfo(arr) {
        var stt = 0
        $("#tableInput").empty()
        arr.forEach(element => {
            var diffDate = 1 + (new Date(element.traXeDate) - new Date(element.nhanXeDate)) / 1000 / 60 / 60 / 24
            var total = 0
            if (element.hinhThuc == "Tu lai") {
                total = diffDate * element.giaXe
            } else {
                if (element.loaiXe == "4 cho") {
                    total = (parseInt(element.giaXe) + 500000) * diffDate
                } else if (element.loaiXe == "7 cho") {
                    total = (parseInt(element.giaXe) + 550000) * diffDate
                }
            }
            stt++
            $("#tableInput").append(
                `<tr id="${element.id}">
                <td>${stt}</td>
                <td>${element.fullName}</td>
                <td>${element.phone}</td>
                <td>${element.hangXe}</td>
                <td>${element.loaiXe}</td>
                <td>${element.giaXe}</td>
                <td>${element.nhanXeDate}</td>
                <td>${element.traXeDate}</td>
                <td>${diffDate}</td>
                <td>${element.hinhThuc}</td>
                <td>${total}</td>
            </tr>`
            )
        });
    }

    function validate() {
        var checkFullName = isFullName("#fullName")
        var checkPhone = isMatchPhone("#phone")
        var checkAddress = isFullName("#address")
        var checkNhanDate = isNgayNhanXe("#nhanXeDate")
        var checkTraDate = isNgayTraXe("#nhanXeDate", "#traXeDate")
        return checkAddress && checkFullName && checkPhone && checkTraDate && checkNhanDate
    }

    $("#tableXe").on('click', '#rentBtn', function () {
        let id = $(this).parent().parent().attr('id')
        $("#hangXe").val(listRent[id - 1].hangXe)
        $("#loaiXe").val(listRent[id - 1].loaiXe)
        $("#giaXe").val(listRent[id - 1].giaXe)
        $("#datXeBtn").prop('disabled', false)
        index = id
    })

    function getData() {
        hangXe = $("#hangXe").val()
        loaiXe = $("#loaiXe").val()
        giaXe = $("#giaXe").val()
        fullName = $("#fullName").val()
        phone = $("#phone").val()
        address = $("#address").val()
        nhanXeDate = $("#nhanXeDate").val()
        traXeDate = $("#traXeDate").val()
        hinhThuc = $('input[name=select]:checked').val()
    }

    $("#datXeBtn").on('click', function () {
        if (validate()) {
            getData()
            length++;
            let info = {
                id: length,
                fullName: fullName,
                phone: phone,
                hangXe: hangXe,
                loaiXe: loaiXe,
                giaXe: giaXe,
                nhanXeDate: nhanXeDate,
                traXeDate: traXeDate,
                hinhThuc: hinhThuc
            }
            console.log(info);
            listInfo.push(info)
            displayInfo(listInfo)

            listRent[index - 1].tinhTrang = "Da cho thue"
            displayXe(listRent)

            $('form').trigger('reset')
            $("#datXeBtn").prop('disabled', true)
        }

    })


    $('input[name=select]').on('change', function () {
        if ($('input[name=select]:checked').val() == "Cho thue") {
            $("#thueXeFee").show()
        } else {
            $("#thueXeFee").hide()
        }
    })

    $("#findBtn").on('click', function () {

        var searchXe = $("#searchXe").val()
        var searchTTXe = $("#searchTTXe").val()
        if (searchXe == null) {
            searchXe = ""
        }
        if (searchTTXe == null) {
            searchTTXe = ""
        }

        let listSearch = []
        listRent.forEach(element => {
            if (element.hangXe.includes(searchXe) && element.tinhTrang.includes(searchTTXe)) {
                listSearch.push(element)
            }
        });
        displayXe(listSearch)
    })

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

    isNgayNhanXe = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht < new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban phai nhap lon hon ngay hien tai");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isNgayTraXe = function (selector, selector2) {
        let namnhapvao = $(selector2).val();
        let ngaykhac = $(selector).val();
        // let ngayht = new Date();
        let sosanh = (addDate(new Date(ngaykhac), 1) < new Date(namnhapvao));
        if ($(selector2).val() == "") {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban phai nhap lon hon ngay thue xe 1 ngay");
            return false;
        } else {
            $(selector2).removeClass("is-invalid");
            return true;
        }
    }

    function addDate(valDate, valAdd) {
        return new Date(valDate.getFullYear(), valDate.getMonth(), valDate.getDate() + valAdd);
    }
})