$(document).ready(function () {
    let stt = 0, index, id = 0
    let maItem, tenitem, slTon, price, mota, amount, number
    let listItem = [], item
    let listInfo = []
    let sttResult = 0
    // $("#info").hide()
    $("#addRowBtn").on('click', function () {
        stt++
        if (!checkInput()) {
            $("#inputTable tbody").append(`<tr id="${stt}">
                                                <th><input type="text" class="form-control maSPInput"></th>
                                                <small class="invalid-feedback"></small>
                                                <th><input type="text" class="form-control tenSPInput"></th>
                                                <small class="invalid-feedback"></small>
                                                <th><input type="text" class="form-control soLuongInput"></th>
                                                <small class="invalid-feedback"></small>
                                                <th><input type="text" class="form-control priceInput"></th>
                                                <small class="invalid-feedback"></small>
                                                <th><input type="text" class="form-control moTaInput"></th>
                                                <th class="d-flex justify-content-center"><button class="btn btn-primary"
                                                    id="addBtn" value="1">Them</button><button id="deleteBtn"
                                                    class="ml-2 btn btn-danger">Huy</button></th>
                                            </tr>`)
        }
    })
    $("#inputTable tbody").on('click', "#addBtn", function () {
        id = $(this).parent().parent().attr('id')
        getDataItem()
        item = { id: id, maSP: maItem, tenSP: tenitem, slTon: slTon, price: price, moTa: mota }
        listItem.push(item)
        $(this).parent().parent().html(
            `<th>${item.maSP}</th>
            <th>${item.tenSP}</th>
            <th>${item.slTon}</th>
            <th>${item.price}</th>
            <th>${item.moTa}</th>
            <th class="d-flex justify-content-center"><button class="btn btn-primary"
                    id="buyItemBtn">Dat hang</button><button id="deleteItemBtn"
                    class="ml-2 btn btn-danger">Xoa</button></th>`
        )
    })

    function disArr(arr) {
        sttResult = 0
        $("#tbodyTable").empty()
        arr.forEach(element => {
            sttResult++
            $("#tbodyTable").append(
                `<tr>
            <th>${sttResult}</th>
            <th>${element.item.maSP}</th>
            <th>${element.item.tenSP}</th>
            <th>${element.number}</th>
            <th>${element.amount}</th>
        </tr>`
            )
        });
    }

    function validateSoLuong() {
        var checkNumber = isNumber("#soLuong", listItem[index].slTon)
        return checkNumber
    }

    $("#buyBtn").on('click', function () {
        if (validateSoLuong()) {
            number = parseInt($("#soLuong").val())
            amount = listItem[index].price * number
            let info = { item: listItem[index], number: number, amount: amount }
            listInfo.push(info)
            console.log(listInfo);
            disArr(listInfo)
            $("#info").trigger('reset')
            listItem[index].slTon -= number

            $("#inputTable tbody tr").each(function () {
                // var rowTr = $(this).find($("#" + index))
                // var rowTr = $(this).find($(`#${index}`)).find($(".soLuongInput")).text(listItem[index].slTon)
                $(this).find($("#"+index)).remove()
                // rowTr.find($(".soLuongInput")).text(listItem[index].slTon)

            })
        }
    });

    function getDataItem() {
        // id++
        $("#inputTable tbody tr").each(function () {
            var rowTr = $(this)
            maItem = rowTr.find($(".maSPInput")).val()
            tenitem = rowTr.find($(".tenSPInput")).val()
            slTon = rowTr.find($(".soLuongInput")).val()
            price = rowTr.find($(".priceInput")).val()
            mota = rowTr.find($(".moTaInput")).val()
        })
    }
    $("#inputTable tbody").on('click', "#buyItemBtn", function () {
        $("#info").show()
        var idBuy = $(this).parent().parent().attr('id')
        console.log(listItem);

        for (let i = 0; i < listItem.length; i++) {
            if (listItem[i].id == idBuy) {
                index = i
                $("#maSP").val(listItem[i].maSP)
                $("#tenSP").val(listItem[i].tenSP)

            }
        }
    });

    $("#inputTable tbody").on('click', "#deleteItemBtn", function () {
        $(this).parent().parent().remove()
    })

    $("#inputTable tbody").on('click', "#deleteBtn", function () {
        $(this).parent().parent().remove()
    })

    function checkInput() {
        var check
        $("#inputTable tbody tr").each(function () {
            var rowTr = $(this)
            check = rowTr.find($("#addBtn")).val()

        })
        return check == "1"
    }
    isNumber = function (selector, number) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 1 || score > number) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua phải trong khoảng 1 - " + number);
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    };
})