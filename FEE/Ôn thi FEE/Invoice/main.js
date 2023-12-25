$(document).ready(function () {
    let fullName, cccd, outDate, address, note, item, nameItem, countItem, priceItem, amount, total
    $(".chitietForm").prop('disabled', true)
    let listInvoice = [
        { id: 1, fullName: "Diem1", outDate: "2023-07-01", cmnd: "0987654321", item: [{ nameItem: "Hang hoa A", count: 6, price: 10000 }, { nameItem: "Hang hoa A", count: 6, price: 10000 }, { nameItem: "Hang hoa A", count: 6, price: 10000 }], total: 1000000 },
        { id: 2, fullName: "Diem2", outDate: "2023-07-01", cmnd: "0987654321", item: [{ nameItem: "Hang hoa A", count: 6, price: 10000 }], total: 1000000 },
        { id: 3, fullName: "Diem3", outDate: "2023-07-01", cmnd: "0987654321", item: [{ nameItem: "Hang hoa A", count: 6, price: 10000 }], total: 1000000 },
        { id: 4, fullName: "Diem4", outDate: "2023-07-01", cmnd: "0987654321", item: [{ nameItem: "Hang hoa A", count: 6, price: 10000 }], total: 1000000 },
    ]

    let length = listInvoice.length
    displayInvoice(listInvoice)
    function displayInvoice(arr) {
        var stt = 0
        $("#tableBody").empty()
        arr.forEach(element => {
            var col = element.item.length
            var amount;
            amount = element.item[0].count * element.item[0].price
            stt++
            $("#tableBody").append(
                `<tr id="${element.id}">
                <td rowspan="${col}">${stt}</td>
                <td rowspan="${col}">${element.fullName}</td>
                <td rowspan="${col}">${element.cmnd}</td>
                <td rowspan="${col}">${element.outDate}</td>
                <td>${element.item[0].nameItem}</td>
                <td>${element.item[0].count}</td>
                <td>${element.item[0].price}</td>
                <td>${amount}</td>
                <td rowspan="${col}">${element.total}</td>
                <td rowspan="${col}"><button id="deleteBtn" class="border-0"><i
            class="fa fa-trash"></i></button></td>
            </tr>`
            )

            for (let i = 1; i < col; i++) {
                amount = element.item[i].count * element.item[i].price

                $("#tableBody").append(
                    `<tr>
                    <td>${element.item[i].nameItem}</td>
                    <td>${element.item[i].count}</td>
                    <td>${element.item[i].price}</td>
                    <td>${amount}</td>
                </tr>`
                )
            }
        });
        count()
    }

    $("#result tbody").on('click', '#deleteBtn', function () {
        let idDelete = $(this).parent().parent().attr('id')

        listInvoice = listInvoice.filter((e) => e.id != idDelete)
        displayInvoice(listInvoice)
    })

    $("#tbodyChiTiet").on('click', '#deleteRow', function () {
        let idDelete = $(this).parent().parent().remove()
    })

    $("#createBtn").on('click', function () {
        if (validateInfo()) {
            $(".chitietForm").prop('disabled', false)
            $(".inputForm").prop('disabled', true)
        }

    })

    $("#editBtn").on('click', function () {
        $(".chitietForm").prop('disabled', true)
        $(".inputForm").prop('disabled', false)

    })



    $("#outBtn").on('click', function () {

        if (validate()) {
            getData()

            var invoice = {
                id: length,
                fullName: fullName,
                outDate: outDate,
                cmnd: cccd,
                item: item,
                total: total
            }
            listInvoice.push(invoice)
            displayInvoice(listInvoice)

            $("#formInput").trigger('reset')
            // $("#formChiTiet").trigger('reset')
            $("#tbodyChiTiet").empty()
            $("#tbodyChiTiet").append(`<tr>
                                            <td>1</td>
                                            <td><input type="text" class="form-control chitietForm nameItem"><small class="invalid-feedback"></small></td>
                                            <td><input type="text" class="form-control chitietForm countItem"><small class="invalid-feedback"></small></td>
                                            <td><input type="text" class="form-control chitietForm priceItem"><small class="invalid-feedback"></small></td>
                                            <td class="d-flex justify-content-center"><button id="deleteRow" class="border-0 chitietForm"><i
                                                        class="fa fa-trash"></i></button></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><input type="text" class="form-control chitietForm nameItem"><small class="invalid-feedback"></small></td>
                                            <td><input type="text" class="form-control chitietForm countItem"><small class="invalid-feedback"></small></td>
                                            <td><input type="text" class="form-control chitietForm priceItem"><small class="invalid-feedback"></small></td>
                                            <td class="d-flex justify-content-center"><button id="deleteRow" class="border-0 chitietForm"><i
                                                        class="fa fa-trash"></i></button></td>
                                        </tr>`)

            $(".chitietForm").prop('disabled', true)
            $(".inputForm").prop('disabled', false)
        }

    })

    $("#addRowBtn").on('click', function () {
        $("#tbodyChiTiet").append(
            `<tr>
            <td>${countRow() + 1}</td>
            <td><input type="text" class="form-control chitietForm nameItem"><small class="invalid-feedback"></small></td>
                            <td><input type="text" class="form-control chitietForm countItem"><small class="invalid-feedback"></small></td>
                            <td><input type="text" class="form-control chitietForm priceItem"><small class="invalid-feedback"></small></td>
            <td class="d-flex justify-content-center"><button id="deleteRow" class="border-0 chitietForm"><i
                        class="fa fa-trash"></i></button></td>
        </tr>`
        )
    })

    function countRow() {
        var countRow = 0
        $("#tbodyChiTiet tr").each(function () {
            countRow++
        })
        return countRow
    }

    function getData() {
        length++
        item = []
        total = 0
        fullName = $("#fullName").val()
        cccd = $("#cccd").val()
        outDate = $("#outInvoice").val()
        address = $("#address").val()
        note = $("#note").val()
        $("#tbodyChiTiet tr").each(function () {
            rowTr = $(this)
            nameItem = rowTr.find($(".nameItem")).val()
            countItem = parseInt(rowTr.find($(".countItem")).val())
            priceItem = parseInt(rowTr.find($(".priceItem")).val())
            item.push({ nameItem: nameItem, count: countItem, price: priceItem })
            total += (rowTr.find($(".countItem")).val()) * (rowTr.find($(".priceItem")).val())
        })
    }

    function validate() {

        var checkNameItem = true
        var checkCount = true
        var checkPrice = true
        $("#tbodyChiTiet tr").each(function () {
            rowTr = $(this)
            checkNameItem = isString(rowTr.find($(".nameItem")))
            checkCount = isNumber(rowTr.find($(".countItem")))
            checkPrice = isNumber(rowTr.find($(".priceItem")))
        })
        return checkNameItem && checkCount && checkPrice
    }

    function validateInfo() {
        var checkFullName = isString("#fullName")
        var checkCCCD = isCCCD("#cccd")
        var checkDate = isInvoiceDate("#outInvoice")
        var checkAddress = isString("#address")
        var checkNote = isString("#note")
        return checkFullName && checkCCCD && checkDate && checkAddress && checkNote
    }

    function count() {
        var totalNumber=0, totalAmount=0;
        listInvoice.forEach(element => {
            element.item.forEach(aaa => {
                totalNumber+=aaa.count
            });
            totalAmount+=element.total
        });

        $("#totalNumber").text(totalNumber)
        $("#totalMoney").text(totalAmount)

    }

    isString = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập truong nay!!!");
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

    isCCCD = function (selector) {
        let regex = /^[0][0-9]{9}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng CCCD");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    isInvoiceDate = function (selector) {

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

    isNumber = function (selector) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 0) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua phải lon hon 0");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };
})