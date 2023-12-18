'use strick'
let listDefault = [{
    productName: "",
    qtt: "",
    price: ""
}, {
    productName: "",
    qtt: "",
    price: ""
}];

var listBills = [
    {
        name: "Tuấn1",
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
        name: "Tuấn2",
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
                qtt: 51,
                price: 10000
            },
            {
                productName: "Gạch",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
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


$("#form-info-body").on('submit', function (e) {
    e.preventDefault();

    let name = $("#form-info_fullName");
    let cmnd = $("#form-info_cmnd");
    let date = $("#form-info_date");
    let address = $("#form-info_address");
    let note = $("#form-info_note");

    if (checkValidateAll(name.val(), cmnd.val(), date.val(), address.val(), note.val())) {
        $(".row-bill td>input").prop("disabled", false);
        $(".group-btn input").prop("disabled", false);
        $("#btn-createBill").prop("disabled", true);
        $("#form-info_fullName").prop("disabled", true);;
        $("#form-info_cmnd").prop("disabled", true);;
        $("#form-info_date").prop("disabled", true);;
        $("#form-info_address").prop("disabled", true);;
        $("#form-info_note").prop("disabled", true);;
    }
})

function checkValidateAll(name, cmnd, date, address, note) {
    return isValidateNote(note) & isValidateAddress(address) & isValidateDate(date) & isValidateCmnd(cmnd) & isValidateName(name);
}

function isValidateName(name) {
    let error = $("#error-info_fullName");
    error.html("");
    $("#form-info_fullName").removeClass("border-danger");
    if (!validateString(name)) {
        $("#form-info_fullName").focus();
        $("#form-info_fullName").addClass("border-danger");
        error.html("Yêu cầu nhập họ và tên");
    }
    return validateString(name);
}

function isValidateAddress(address) {
    let error = $("#error-info_address");
    error.html("");
    $("#form-info_address").removeClass("border-danger");
    if (!validateString(address)) {
        $("#form-info_address").focus();
        $("#form-info_address").addClass("border-danger");
        error.html("Yêu cầu nhập địa chỉ");
    }
    return validateString(address);
}

function isValidateNote(note) {
    let error = $("#error-info_note");
    error.html("");
    $("#form-info_note").removeClass("border-danger");
    if (!validateString(note)) {
        $("#form-info_note").focus();
        $("#form-info_note").addClass("border-danger");
        error.html("Yêu cầu nhập ghi chú");
    }
    return validateString(note);
}

function isValidateCmnd(cmnd) {
    let error = $("#error-info_cmnd");
    error.html("");
    $("#form-info_cmnd").removeClass("border-danger");
    if (!validateCMND(cmnd)) {
        $("#form-info_cmnd").focus();
        $("#form-info_cmnd").addClass("border-danger");
        error.html("Yêu cầu nhập CMND");
    }
    return validateCMND(cmnd);
}
function isValidateDate(date) {
    let error = $("#error-info_date");
    error.html("");
    $("#form-info_date").removeClass("border-danger");
    if (!validateDateOfNow(date)) {
        $("#form-info_date").focus();
        $("#form-info_date").addClass("border-danger");
        error.html("Ngày xuất hoá đơn không hợp lệ");
    }
    return validateDateOfNow(date);

}

function setRowItem(item, index) {
    return `
            <tr class="row-bill">
                <td>${index + 1}</td>
                <td>
                  <input type="text" class="form-control" value="${item.productName}" disabled/>
                </td>
                <td>
                  <input type="number" class="form-control" value="${item.qtt}" disabled/>
                </td>
                <td>
                  <input type="number" class="form-control" value="${item.price}" disabled/>
                </td>
                <td>
                    <button class="btn" onclick="deleteRowDetail(${index})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
    `
}
function getRowItem(index) {
    return `
            <tr class="row-bill">
                <td>${index + 1}</td>
                <td>
                  <input type="text" class="form-control" value="" disabled/>
                </td>
                <td>
                  <input type="number" class="form-control" value="" disabled/>
                </td>
                <td>
                  <input type="number" class="form-control" value="" disabled/>
                </td>
                <td>
                  <button class="btn" onclick="deleteRowDetail(${index})">
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
            </tr>
    `
}

function renderListDetail(listDetail) {
    if (listDetail.length > 0) {
        listDetail.forEach((item, index) => {
            $("#listDetail").append(getRowItem(item, index));
        })
    } else{
        listDefault.forEach((item, index) => {
            $("#listDetail").append(getRowItem(index));
        })
    }
}

function deleteRowDetail(index) {
    alert(index)
}

$(document).ready(() => {
    renderBills();
    deleteRowBill();
    renderListDetail([]);
})