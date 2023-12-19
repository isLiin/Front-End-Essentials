'use strick'
const listDefault = [{
    productName: "",
    qtt: "",
    price: ""
}, {
    productName: "",
    qtt: "",
    price: ""
}];

var listProducts = listDefault;
var listBills = [
    {
        name: "Tuấn",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Khan",
        cmnd: "2002200202",
        date: "12/10/2021",
        details: [
            {
                productName: "Xi Măng",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch",
                qtt: 51,
                price: 10000
            },
            {
                productName: "Gạch",
                qtt: 99,
                price: 10000
            },
            {
                productName: "Gạch",
                qtt: 5,
                price: 10000
            },
        ]
    }
];

function getSumPriceProduct(qtt, price) {
    return parseInt(qtt) * parseInt(price);
}

function renderListProductDetails(listProductDetails) {
    let result = "";
    listProductDetails.forEach((product, index) => {
        if (index !== 0) {
            result += `
                        <tr>
                            <td>${product.productName}</td>
                            <td>${product.qtt}</td>
                            <td>${convertFormatNumber(product.price)}</td>
                            <td>${convertFormatNumber(getSumPriceProduct(product.qtt, product.price))}</td>
                        </tr>`;
        }
    });
    return result;
}



function getSUMQuantity(bill) {
    let total = 0;
    bill.details.forEach(item => {
        total += parseInt(item.qtt);
    })
    return total;
}

function getTotalBill(bill) {
    let total = 0;
    bill.details.forEach(item => {
        total += getSumPriceProduct(item.qtt, item.price);
    })
    return total;
}

function getRowBill(bill, index) {
    return `  <tr>
                <td rowspan="${bill.details.length}">${index}</td>
                <td rowspan="${bill.details.length}">${bill.name}</td>
                <td rowspan="${bill.details.length}">${bill.cmnd}</td>
                <td rowspan="${bill.details.length}">${bill.date}</td>
                <td>${bill.details[0].productName}</td>
                <td>${bill.details[0].qtt}</td>
                <td>${convertFormatNumber(bill.details[0].price)}</td>
                <td>
                    ${convertFormatNumber(getSumPriceProduct(bill.details[0].qtt, bill.details[0].price))}
                </td>
                <td rowspan="${bill.details.length}">
                    ${convertFormatNumber(getTotalBill(bill))}
                </td>
                <td rowspan="${bill.details.length}">
                <button class="btn" onClick="deleteRowBill(${index})">
                    <i class="fa fa-trash"></i>
                </button>
                </td>
            </tr>` + renderListProductDetails(bill.details);

}

function renderBills() {
    let container = $("#showBills");
    container.html("");

    // insert new value
    listBills.forEach((bill, index) => container.append(getRowBill(bill, index)));

    // render GUI
    changeTotalPriceBills();
    changeTotalQuantity();
}

function changeTotalPriceBills() {
    let resutl = $(".totalPriceBill");
    resutl.html("");

    let total = 0;
    listBills.forEach(bill => {
        total += getTotalBill(bill);
    })

    resutl.html(convertFormatNumber(total));
}

function changeTotalQuantity() {
    let resutl = $(".totalQuantity");
    resutl.html("");

    let total = 0;
    listBills.forEach(bill => {
        total += getSUMQuantity(bill);
    })

    resutl.html(total);
}

function convertFormatNumber(numb) {
    // resutl.html(Intl.NumberFormat(total, {
    //     style: "currency",
    //     currency: "VND",
    // }).format(total));

    return Intl.NumberFormat("vi-VN", {
        maximumSignificantDigits: 3,
    }).format(numb)
}

function deleteRowBill(index) {
    // let isComfirm = confirm("Delete?")
    listBills.splice(index, 1);
    renderBills();
}

function checkValidateAll(name, cmnd, date, address, note) {
    return isValidateNote(note) & isValidateAddress(address) & isValidateDate(date) & isValidateCmnd(cmnd) & isValidateName(name);
}

function checkValidateBill(index, productName, qtt, price) {
    return isValidateProductName(productName, index) & isValidateQtt(qtt, index) & isValidatePrice(price, index);
}

function isValidateProductName(productName, index) {
    let error = $(`#error-info_productName-${index}`);
    error.html("");
    $(`#form-info_productName-${index}`).removeClass("is-invalid");
    if (!validateString(productName)) {
        $(`#form-info_productName-${index}`).focus();
        $(`#form-info_productName-${index}`).addClass("is-invalid");
        error.html("Yêu cầu nhap ten san pham");
    }
    return validateString(productName);
}

function isValidateQtt(qtt, index) {
    let error = $(`#error-info_qtt-${index}`);
    error.html("");
    $(`#form-info_qtt-${index}`).removeClass("is-invalid");
    if (!validateNumber(qtt)) {
        $(`#form-info_qtt-${index}`).focus();
        $(`#form-info_qtt-${index}`).addClass("is-invalid");
        error.html("Yêu cầu nhap so luong");
    }
    return validateNumber(qtt);
}

function isValidatePrice(price, index) {
    let error = $(`#error-info_price-${index}`);
    error.html("");
    $(`#form-info_price-${index}`).removeClass("is-invalid");
    if (!validateNumber(price)) {
        $(`#form-info_price-${index}`).focus();
        $(`#form-info_price-${index}`).addClass("is-invalid");
        error.html("Yêu cầu nhap giá");
    }
    return validateNumber(price);
}

function isValidateName(name) {
    let error = $("#error-info_fullName");
    error.html("");
    $("#form-info_fullName").removeClass("is-invalid");
    if (!validateString(name)) {
        $("#form-info_fullName").focus();
        $("#form-info_fullName").addClass("is-invalid");
        error.html("Yêu cầu nhập họ và tên");
    }
    return validateString(name);
}

function isValidateAddress(address) {
    let error = $("#error-info_address");
    error.html("");
    $("#form-info_address").removeClass("is-invalid");
    if (!validateString(address)) {
        $("#form-info_address").focus();
        $("#form-info_address").addClass("is-invalid");
        error.html("Yêu cầu nhập địa chỉ");
    }
    return validateString(address);
}

function isValidateNote(note) {
    let error = $("#error-info_note");
    error.html("");
    $("#form-info_note").removeClass("is-invalid");
    if (!validateString(note)) {
        $("#form-info_note").focus();
        $("#form-info_note").addClass("is-invalid");
        error.html("Yêu cầu nhập ghi chú");
    }
    return validateString(note);
}

function isValidateCmnd(cmnd) {
    let error = $("#error-info_cmnd");
    error.html("");
    $("#form-info_cmnd").removeClass("is-invalid");
    if (!validateCMND(cmnd)) {
        $("#form-info_cmnd").focus();
        $("#form-info_cmnd").addClass("is-invalid");
        error.html("Yêu cầu nhập CMND");
    }
    return validateCMND(cmnd);
}

function isValidateDate(date) {
    let error = $("#error-info_date");
    error.html("");
    $("#form-info_date").removeClass("is-invalid");
    if (!validateDateOfNow(date)) {
        $("#form-info_date").focus();
        $("#form-info_date").addClass("is-invalid");
        error.html("Ngày xuất hoá đơn không hợp lệ");
    }
    return validateDateOfNow(date);

}

function setRowItem(index) {
    return `
            <tr class="row-bill">
                <td>${index + 1}</td>
                <td>
                  <input id="form-info_productName-${index}" onChange="changeValueProducts('productName', ${index})" name="productName-${index}" type="text" class="form-control" value="${listProducts[index].productName}"/>
                  <small id="error-info_productName-${index}" class="text-danger"></small>
                </td>
                <td>
                  <input id="form-info_qtt-${index}" onChange="changeValueProducts('qtt', ${index})" name="qtt-${index}" type="number" class="form-control" value="${listProducts[index].qtt}"/>
                  <small id="error-info_qtt-${index}" class="text-danger"></small>
                </td>
                <td>
                  <input id="form-info_price-${index}" onChange="changeValueProducts('price', ${index})" name="price-${index}" type="number" class="form-control" value="${listProducts[index].price}"/>
                  <small id="error-info_price-${index}" class="text-danger"></small>
                </td>
                <td>
                  <button class="btn" onclick="deleteRowDetail(${index})">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
            </tr>
    `
}

function changeValueProducts(type, index) {
    switch (type) {
        case "productName":
            listProducts[index].productName = $(`input[name="productName-${index}"]`).val();
            break;
        case "qtt":
            listProducts[index].qtt = $(`input[name="qtt-${index}"]`).val();
            break;
        case "price":
            listProducts[index].price = $(`input[name="price-${index}"]`).val();
            break;
    }
}

function renderListDetail(listDetail) {
    $("#listDetail").html("");
    if (listDetail.length > 0) {
        listDetail.forEach((item, index) => {
            $("#listDetail").append(setRowItem(item, index));
        })
    } else {
        listProducts.forEach((item, index) => {
            $("#listDetail").append(setRowItem(index));
        })
    }
}

function deleteRowDetail(index) {
    // $(evt.target).parent().parent().remove();
    listProducts.splice(index, 1);
    renderListDetail([]);
}

function resetInputAll() {
    $(".row-bill td>input").prop("value", "");
    $(".group-info input").prop("value", "");
    $(".group-info textarea").prop("value", "");
}

$("#form-info-body").on('submit', function (e) {
    // khong bat event submit cua window
    e.preventDefault();

    // de thuc thi theo code nay
    let name = $("#form-info_fullName");
    let cmnd = $("#form-info_cmnd");
    let date = $("#form-info_date");
    let address = $("#form-info_address");
    let note = $("#form-info_note");

    if (checkValidateAll(name.val(), cmnd.val(), date.val(), address.val(), note.val())) {
        $(".row-bill td>input").prop("disabled", false);
        $(".group-btn input").prop("disabled", false);
        $(".row-bill .btn").prop("disabled", false);
        $("#btn-createBill").prop("disabled", true);
        $("#form-info_fullName").prop("disabled", true);
        $("#form-info_cmnd").prop("disabled", true);
        $("#form-info_date").prop("disabled", true);
        $("#form-info_address").prop("disabled", true);
        $("#form-info_note").prop("disabled", true);
    }
})

function disableInputCreateBill() {
    $(".row-bill td>input").prop("disabled", true);
    $(".group-btn input").prop("disabled", true);
    $(".row-bill .btn").prop("disabled", true);
    $("#btn-createBill").prop("disabled", false);
    $("#form-info_fullName").prop("disabled", false);
    $("#form-info_cmnd").prop("disabled", false);
    $("#form-info_date").prop("disabled", false);
    $("#form-info_address").prop("disabled", false);
    $("#form-info_note").prop("disabled", false);
}
$("#edit-info-bill").on("click", disableInputCreateBill)

// reUse
$("#add-row-bill").on("click", function (e) {
    e.preventDefault();
    listProducts.push({
        productName: "",
        qtt: "",
        price: ""
    })
    renderListDetail([]);
})


$("#create-bill").on("click", function (e) {
    e.preventDefault();
    let isValidate = true;

    listProducts.forEach((item, index) => {
        isValidate = checkValidateBill(index, item.productName, item.qtt, item.price);

        if (!isValidate) {
            return false;
        }

    })

    if (isValidate) {
        let bill = {
            id: listBills.length++,
            name: $("#form-info_fullName").val(),
            cmnd: $("#form-info_cmnd").val(),
            date: $("#form-info_date").val(),
            address: $("#form-info_address").val(),
            note: $("#form-info_note").val(),
            details: listProducts
        }
        listBills.push(bill);
        renderBills();
        renderListDetail([]);
        disableInputCreateBill();
        resetInputAll();
    }
})

$(document).ready(() => {
    renderBills();
    deleteRowBill;
    renderListDetail([]);
    disableInputCreateBill();
})