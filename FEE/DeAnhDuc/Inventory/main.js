$(document).ready(function () {

    let inventoryTable = document.getElementById("inventoryTable")
    let result = document.getElementById("result")

    let totalSlCon, inventory, slCon, price, slXuat, date, idNum, amount, outInventory, sumsl, sumAmount;

    $("#maSP").prop("disabled", true)
    $("#tenSP").prop("disabled", true)
    $("#dmSP").prop("disabled", true)
    let listInventory = [
        { id: 1, maSP: "100001", tenSP: "Air pro", slCon: 25, dmSP: "Dien thoai" },
        { id: 2, maSP: "100002", tenSP: "Air pro 1", slCon: 20, dmSP: "Dien thoai" },
        { id: 3, maSP: "100004", tenSP: "Air pro 2", slCon: 50, dmSP: "Dien thoai" }
    ]

    let listOutInventory = [
        // { id: 1, maSP: "inventory.maSP", tenSP: "nventory.tenSP", dmSP: "inventory.dmSP", slXuat: "2.5", donGia: "2000", ngayXuat: "date", thanhTien: 40000 },
        // { id: 2, maSP: "inventory.maSP", tenSP: "nventory.tenSP", dmSP: "inventory.dmSP", slXuat: "2.5", donGia: "2000", ngayXuat: "date", thanhTien: 40000 },
        // { id: 3, maSP: "inventory.maSP", tenSP: "nventory.tenSP", dmSP: "inventory.dmSP", slXuat: "2.5", donGia: "2000", ngayXuat: "date", thanhTien: 40000 }

    ]
    displayOutInventory(listOutInventory)
    displayInventory()

    $("#inventory tbody").on('click', '#choiceBtn', function () {
        let id = $(this).parent().parent().attr('id')
        inventory = listInventory[parseInt(id) - 1]
        $("#maSP").val(inventory.maSP)
        $("#tenSP").val(inventory.tenSP)
        $("#dmSP").val(inventory.dmSP)
        slCon = inventory.slCon
        idNum = inventory.id

    })

    $("#outBtn").on('click', function () {
        let checkPrice = isDonGia("#price")
        console.log(slCon);
        let checkSL = isSLCon("#slXuatKho", slCon)
        let checkDate = nhoHonNgayHT("#xuatKhoDate")

        if (checkPrice && checkSL && checkDate) {
            price = $("#price").val()
            slXuat = $("#slXuatKho").val()
            date = $("#xuatKhoDate").val()
            amount = parseInt(price) * parseInt(slXuat)
            outInventory = { id: inventory.id, maSP: inventory.maSP, tenSP: inventory.tenSP, dmSP: inventory.dmSP, slXuat: slXuat, donGia: price, ngayXuat: date, thanhTien: amount }
            listOutInventory.push(outInventory)
            displayOutInventory(listOutInventory)
            $("#info").trigger("reset")

            listInventory[parseInt(outInventory.id) - 1].slCon = parseInt(listInventory[parseInt(outInventory.id) - 1].slCon) - parseInt(slXuat)
            displayInventory(listInventory)
        }

    })

    $("#resultTable").on('click', '#deleteInvBtn', function () {
        let idInv = parseInt($(this).parent().parent().attr('id'))
        console.log(idInv);

        listOutInventory.forEach(element => {
            if (element.id == idInv) {
                slXuat = element.slXuat
            }
        });

        listOutInventory = listOutInventory.filter((e) => e.id != idInv);
        displayOutInventory(listOutInventory)

        listInventory[parseInt(outInventory.id) - 1].slCon = parseInt(listInventory[parseInt(outInventory.id) - 1].slCon) + parseInt(slXuat)
        displayInventory(listInventory)

    });



    function displayInventory() {
        totalSlCon = 0
        inventoryTable.innerHTML = "";
        // $("#inventoryTable").innerHTML("")
        listInventory.forEach(inventory => {
            totalSlCon += inventory.slCon
            $("#inventoryTable").append(`<tr id="${inventory.id}">
            <td>${inventory.id}</td>
            <td>${inventory.maSP}</td>
            <td>${inventory.tenSP}</td>
            <td>${inventory.slCon}</td>
            <td>${inventory.dmSP}</td>
            <td><button class="border-0 bg-light" id="choiceBtn"><i class="fa fa-shopping-cart"></i></button></td>
        </tr>`)
        });
        $("#slCon").text(totalSlCon)
    }

    function displayOutInventory(arr) {

        result.innerHTML = "";
        sumsl = 0
        sumAmount = 0
        // $("#inventoryTable").innerHTML("")
        for (let i = 0; i < arr.length; i++) {
            sumsl += parseInt(arr[i].slXuat)
            sumAmount += arr[i].thanhTien
            $("#result").append(`<tr id="${arr[i].id}">
            <td>${i + 1}</td>
            <td>${arr[i].maSP}</td>
            <td>${arr[i].tenSP}</td>
            <td>${arr[i].dmSP}</td>
            <td>${arr[i].slXuat}</td>
            <td>${arr[i].donGia}</td>
            <td>${arr[i].ngayXuat}</td>
            <td>${arr[i].thanhTien}</td>
            <td><button class="btn border-0 bg-light text-danger" id="deleteInvBtn"><i class="fa fa-times"></i></button></td>
        </tr>`)
        };
        $("#totalQuantity").text(sumsl)
        $("#total").text(sumAmount)

    }

    isSLCon = function (selector, sluong) {
        if ($(selector).val() === "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay!!");
            return false;
        } else if ($(selector).val() <= 0) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap phai lon hon 0!!");
            return false;
        } else if ($(selector).val() > sluong) {
            $(selector).addClass("is-invalid");
            $(selector).next().html(`Ban nhap khong qua so luong con: ${sluong}`);
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isDonGia = function (selector) {

        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay!!");
            return false;
        } else if ($(selector).val() < 0) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap phai lon hon 0!!");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    nhoHonNgayHT = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
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

})