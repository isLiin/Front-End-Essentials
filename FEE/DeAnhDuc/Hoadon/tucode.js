$(document).ready(function () {

    let fullName, cccd, dateInput, address, note, itemName, quantity, price, total, createBtn, updateBtn, addBtn, outBtn
    let result = document.getElementById("resultInvoice");
   
    let invoice;
    let amount;
    let itemArray;
    let item
    // setDisableThongTin(true)
    setDisableChiTiet(true)
    // setDisableKetQua(true)


    let listInvoice = [
        {
            id: 1, fullName: "Diem", cmnd: "098765432", dateInput: "2022-01-31", address: "quang nam", note: "abs", invoice: [
                { itemName: "Xi mang", quantity: 2, price: 500000, amount: 1000000 },
                { itemName: "Thep", quantity: 5, price: 400000, amount: 2000000 },
                { itemName: "Cat", quantity: 1, price: 300000, amount: 300000 }

            ], total: 3200000
        },
        {
            id: 2, fullName: "Diem", cmnd: "098765432", dateInput: "2022-12-01", address: "quang nam", note: "abs", invoice: [
                { itemName: "Xi mang", quantity: 2, price: 500000, amount: 1000000 },
                { itemName: "Thep", quantity: 5, price: 400000, amount: 2000000 }

            ], total: 3000000
        }
    ]
    let stt = listInvoice.length;
    function getDataInvoice() {
        fullName = $("#fullName").val()
        cccd = $("#cccd").val()
        dateInput = $("#dateInput").val()
        address = $("#address").val()
        note = $("#note").val()
    }

    function getChiTietInvoice(object) {


        $("#chiTiet tbody tr").each(function () {
            rowTr = $(this)
            itemName = rowTr.find($(".itemName")).val()
            quantity = parseInt(rowTr.find($(".quantity")).val())
            price = parseInt(rowTr.find($(".price")).val())
            amount = quantity * price
            object.total += amount
            item = { itemName: itemName, quantity: quantity, price: price, amount: amount }
            object.invoice.push(item)
        })

        // let arrItemName = $('.itemName').map(function () {
        //     return $(this).val();
        // }).get();

        // let arrQuantity = $('.quantity').map(function () {
        //     return $(this).val();
        // }).get();

        // let arrPrice = $('.price').map(function () {
        //     return $(this).val();
        // }).get();

        // for (let i = 0; i < arrItemName.length; i++) {
        //     // if (arrItemName[i] === "" && arrItemName[i] === "" && arrItemName[i] === "") {
        //     //     continue;
        //     // }
        //     amount = parseInt(arrPrice[i]) * parseInt(arrQuantity[i])
        //     object.total += parseInt(arrPrice[i]) * parseInt(arrQuantity[i])
        //     item = { itemName: arrItemName[i], quantity: arrQuantity[i], price: arrPrice[i], amount: amount }
        //     console.log(item);
        //     object.invoice.push(item)
        // }
    }
    displayArr(listInvoice)

    $("#createBtn").on('click', () => {
        stt = 2;
        $("#result").innerHTML = "";
        if (checkThongTin()) {
            // $(".invalid-feedback").hide()
            setDisableThongTin(true)
            setDisableChiTiet(false)
            itemArray = []
            getDataInvoice();
            total = 0
            invoice = {
                id: stt, fullName: fullName, cmnd: cccd, dateInput: dateInput, address: address, note: note, invoice: [], total: total
            }
        } else {
            $(".invalid-feedback").show()
        }
    })

    $(".deleteItem").on('click', function () {
    // $("#result").on('click', '.deleteItem', function () {

        let cf = confirm("Ban co muon xoa?");
        console.log("$(this).parent().parent()");
        $(this).parent().parent().remove()
    })

    // $('tbody').on('click', '#del', function () {
    //     console.log("$(this).parent().parent()");
    //     $(this).parent().parent().remove()
    // })


    $("#addBtn").on('click', function () {
        stt += 1;
        $("#result").append(`<tr id="row${stt}" class="thongtinhoadon">
        <td>${stt}</td>
        <td><input type="text" class="itemName"><small class="invalid-feedback"></small></td>
        <td><input type="number" class="quantity"><small class="invalid-feedback"></small></td>
        <td><input type="number" class="price"><small class="invalid-feedback"></small></td>
        <td><button class="deleteItem"><i class="fa fa-trash "></i></button></td>
        </tr>`);
    })


    $("#updateBtn").on('click', function () {
        setDisableThongTin(false)
        setDisableChiTiet(true)

    })

    $("#outBtn").on('click', function () {
        if (checkChiTiet()) {
            $(".invalid-feedback").hide()
            getChiTietInvoice(invoice)
            listInvoice.push(invoice)
            displayArr(listInvoice)
            $("#chiTietForm").trigger("reset")
            $("#hoaDon").trigger("reset")
            setDisableThongTin(false)
            setDisableChiTiet(true)

            $("#result").innerHTML(`<tr>
            <td>1</td>
            <td><input type="text" class="itemName"><small class="invalid-feedback"></small></td>
            <td><input type="number" class="quantity"><small class="invalid-feedback"></small></td>
            <td><input type="number" class="price"><small class="invalid-feedback"></small></td>
            <td><button class="deleteItem"><i class="fa fa-trash "></i></button></td>
        </tr>
        <tr>
            <td>2</td>
            <td><input type="text" class="itemName"><small class="invalid-feedback"></small></td>
            <td><input type="number" class="quantity"><small class="invalid-feedback"></small></td>
            <td><input type="number" class="price"><small class="invalid-feedback"></small></td>
            <td><button class="deleteItem"><i class="fa fa-trash "></i></button></td>
        </tr>`);


        } else {
            $(".invalid-feedback").show()
        }

    })


    function checkChiTiet() {
        var check = true;
        $("#chiTiet tbody tr").each(function () {
            rowTr = $(this)

            if (!isItem(rowTr.find($(".itemName")))) {
                check = false
            } else {
                $(".invalid-feedback").hide()
            }

            if (!isQuantity(rowTr.find($(".quantity")))) {
                check = false
            } else {
                $(".invalid-feedback").hide()
            }

            if (!isPrice(rowTr.find($(".price")))) {
                check = false
            } else {
                $(".invalid-feedback").hide()
            }
        })
        return check

    }

    function checkThongTin() {
        let checkName = isFullName("#fullName");
        let checkCCCD = isCCCD("#cccd");
        let checkDate = isNgayXuatHoaHon("#dateInput");
        let checkAddress = isAddress("#address");
        let checkNote = isNote("#note");
        return checkName && checkCCCD && checkDate && checkAddress && checkNote
    }
    $('tbody').on('click', '#del', function () {
        let cf = confirm("Ban co muon xoa?");
        let id = $(this).parent().parent().attr('id');
        removeInvoiceByID(id);
    })

    // xóa đối tượng(update)
    function removeInvoiceByID(id) {
        listInvoice = listInvoice.filter((e) => e.id != id);
        displayArr(listInvoice);
    }

    function displayArr(array) {
        result.innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            result.innerHTML += appendRow(array[i])
        }
        count(array)
    }

    function appendRow(object) {
        let rowSpan = object.invoice.length;
        let price = object.invoice[0].price.toLocaleString("de-DE");
        let amount = object.invoice[0].amount.toLocaleString("de-DE");
        let total = object.total.toLocaleString("de-DE");
        let dateFormat = convertformat(object.dateInput)


        let html = `<tr id="${object.id}">
            <td rowspan="${rowSpan}">${object.id}</td>
            <td rowspan="${rowSpan}">${object.fullName}</td>
            <td rowspan="${rowSpan}">${object.cmnd}</td>
            <td rowspan="${rowSpan}">${dateFormat}</td>
            <td>${object.invoice[0].itemName}</td>
            <td>${object.invoice[0].quantity}</td>
            <td>${price}</td>
            <td>${amount}</td>
            <td rowspan="${rowSpan}">${total}</td>
            <td rowspan="${rowSpan}"><button class="btn deleteBtn bg-light" id="del"><i class="fa fa-trash deleteItem"></i></button></td>
            </tr>`;
        if (rowSpan > 1) {
            for (let i = 1; i < rowSpan; i++) {
                price = object.invoice[i].price.toLocaleString("de-DE");
                amount = object.invoice[i].amount.toLocaleString("de-DE");
                html += `<tr><td>${object.invoice[i].itemName}</td>
                        <td>${object.invoice[i].quantity}</td>
                        <td>${price}</td>
                        <td>${amount}</td>
                        </tr>`;
            }
        }
        return html;
    }

    // setDisableKetQua(true)
    function count(array) {
        let sumQuantity = 0, sumTotal = 0;
        array.forEach(element => {
            element.invoice.forEach(invoice => {
                sumQuantity += invoice.quantity
            });
            sumTotal += element.total

        });
        sumTotal = sumTotal.toLocaleString("de-DE");
        $("#totalNum").text(sumQuantity)
        $("#totalMoney").text(sumTotal)
    }

    function convertformat(selector) {
        // let curr_dt = new Date($(selector).val())
        // // let form_dt = curr_dt.getFullYear() + "-" + (curr_dt.getMonth() + 1) + "-" + curr_dt.getDate()
        // let form_dt =  (curr_dt.getMonth() + 1) + "-" + curr_dt.getDate() + "-" + curr_dt.getFullYear() 
        // return form_dt

        let curr_dt = new Date(selector)
        let form_dt = (curr_dt.getMonth() + 1) + "-" + curr_dt.getDate() + "-" + curr_dt.getFullYear()
        return form_dt
    }

    function setDisableThongTin(trangThai) {
        $("#fullName").prop("disabled", trangThai)
        $("#cccd").prop("disabled", trangThai)
        $("#dateInput").prop("disabled", trangThai)
        $("#address").prop("disabled", trangThai)
        $("#note").prop("disabled", trangThai)
        $("#createBtn").prop("disabled", trangThai)
    }

    function setDisableChiTiet(trangThai) {
        $(".itemName").prop("disabled", trangThai)
        $(".quantity").prop("disabled", trangThai)
        $(".price").prop("disabled", trangThai)
        $(".deleteItem").prop("disabled", trangThai)
        $("#updateBtn").prop("disabled", trangThai)
        $("#addBtn").prop("disabled", trangThai)
        $("#outBtn").prop("disabled", trangThai)
    }
    function setDisableKetQua(trangThai) {
        $(".deleteB0tn").prop("disabled", trangThai)
    }
})