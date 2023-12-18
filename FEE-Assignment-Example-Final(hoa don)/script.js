'use strick'
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

function handleSubmitFormInfo(e) {
    e.preventDefault();
    alert(123)
}

$.ready(() => {
    renderBills();
    deleteRowBill();
})