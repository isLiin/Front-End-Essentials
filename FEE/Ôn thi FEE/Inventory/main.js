$(document).ready(function () {
    let stt, info, index, invoice;
    let price, slXuat, xuatDate
    $("#outBtn").prop('disabled', true)

    let listInventory = [
        { id: 1, maSP: "A001", tenSP: "Air pro", slCon: 100, danhMuc: "Dien thoai" },
        { id: 2, maSP: "A002", tenSP: "Air pro 1", slCon: 20, danhMuc: "Dien thoai" },
        { id: 3, maSP: "A003", tenSP: "Air pro 2", slCon: 60, danhMuc: "Dien thoai" },
        { id: 4, maSP: "A004", tenSP: "Air pro 3", slCon: 50, danhMuc: "Dien thoai" },
    ]

    let listInvoice = [
        { id: 1, maSP: "A001", tenSP: "Air pro", danhMuc: "Dien thoai", slXuat: 10, price: 1000000, outDate: "2023-07-07" },
        { id: 2, maSP: "A004", tenSP: "Air pro 1", danhMuc: "Dien thoai", slXuat: 10, price: 1000000, outDate: "2023-07-07" },
        { id: 3, maSP: "A002", tenSP: "Air pro 2", danhMuc: "Dien thoai", slXuat: 10, price: 1000000, outDate: "2023-07-07" },
        { id: 4, maSP: "A003", tenSP: "Air pro 3", danhMuc: "Dien thoai", slXuat: 10, price: 1000000, outDate: "2023-07-07" }
    ]
    let length = listInvoice.length
    displayInventory(listInventory)
    function displayInventory(array) {
        $("#info tbody").empty()
        stt = 0
        array.forEach(element => {
            stt++
            $("#info tbody").append(
                `<tr id="${element.id}">
                    <td>${stt}</td>
                    <td>${element.maSP}</td>
                    <td>${element.tenSP}</td>
                    <td>${element.slCon}</td>
                    <td>${element.danhMuc}</td>
                    <td><button id="shopBtn" class="border-0 btn-light"><i class="fa fa-shopping-cart"></i></button></td>
                </tr>`
            )
            countTotalNumber()
        });
    }
    displayInvoce(listInvoice)
    function displayInvoce(array) {
        $("#tbodyTable").empty()
        stt = 0
        array.forEach(element => {
            var amount = element.price * element.slXuat
            stt++
            $("#tbodyTable").append(
                `<tr id="${element.id}">
                    <td>${stt}</td>
                    <td>${element.maSP}</td>
                    <td>${element.tenSP}</td>
                    <td>${element.danhMuc}</td>
                    <td>${element.slXuat}</td>
                    <td>${element.price}</td>
                    <td>${element.outDate}</td>
                    <td>${amount}</td>
                    <td><button id="deleteBtn" class="border-0 btn-light"><i style="color: red;" class="fa fa-times"></i></button></td>
                </tr>`
            )
             countTotalAmount()
        });
    }

    function validate() {
        var checkPrice = isNumber("#price")
        var checkOutNumber = isSoLuong("#numberOut", info.slCon)
        var checkDate = isInvoice("#dateOut")
        return checkPrice && checkOutNumber && checkDate
    }

    $("#info tbody").on('click', '#shopBtn', function () {
        let id = $(this).parent().parent().attr('id')
        index = id - 1
        info = listInventory[index]
        $("#maSP").val(info.maSP)
        $("#tenSP").val(info.tenSP)
        $("#dmSP").val(info.danhMuc)
        $("#outBtn").prop('disabled', false)
    })

    $("#result tbody").on('click', '#deleteBtn', function () {
        let idDelete = $(this).parent().parent().attr('id')
        for (let i = 0; i < listInvoice.length; i++) {
            if (listInvoice[i].id == idDelete) {
                // info = listInventory[i]
                invoice = listInvoice[i]
                // console.log(index);
            }
        }
        listInvoice = listInvoice.filter((e) => e.id != idDelete)
        displayInvoce(listInvoice)

        for (let j = 0; j < listInventory.length; j++) {
            if (listInventory[j].maSP == invoice.maSP) {
                listInventory[j].slCon = parseInt(listInventory[j].slCon) + parseInt(invoice.slXuat)
            }
        }
        displayInventory(listInventory)

    })

    function getData() {
        length++
        price = $("#price").val()
        slXuat = $("#numberOut").val()
        xuatDate = $("#dateOut").val()
    }

    $("#outBtn").on('click', function () {
        if (validate()) {
            getData()
            var invoice = {
                id: length,
                maSP: info.maSP,
                tenSP: info.tenSP,
                danhMuc: info.danhMuc,
                slXuat: slXuat,
                price: price,
                outDate: xuatDate
            }
            listInventory[index].slCon -= slXuat
            displayInventory(listInventory)
            listInvoice.push(invoice)
            displayInvoce(listInvoice)
            $("#outBtn").prop('disabled', true)
            $("#inputForm").trigger('reset')
        }
    })

    function countTotalNumber() {
        var conLaiNumber = 0;
        listInventory.forEach(element => {
            conLaiNumber += element.slCon
        });

        $("#conLaiNumber").text(conLaiNumber)
    }

    function countTotalAmount() {
        var totalNumber = 0;
        var totalAmount = 0;

        listInvoice.forEach(element => {
            totalNumber += (element.slXuat)
            totalAmount += (element.slXuat) * (element.price)
        });

        $("#totalNumber").text(totalNumber)
        $("#totalAmount").text(totalAmount)

    }


    isSoLuong = function (selector, number) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 0) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap phải lon hon 0 ");
            return false;
        } else if (score > number) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap phải nho hon " + number);
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };

    isNumber = function (selector) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 0) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap phải lon hon 0 ");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };

    isInvoice = function (selector) {

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
})