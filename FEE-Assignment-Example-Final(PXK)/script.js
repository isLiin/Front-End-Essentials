"use strict";

/**
 * 
 * @param {*} numb 
 * @returns 
 */
function convertFormatNumber(numb) {
    return Intl.NumberFormat("vi-vn", {
        style: "decimal",
    }).format(numb)
}
/**
 * RowData
 * @param {product} data
 * @param {*} index
 * @returns
 */
const RowData = (data, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${data.masp}</td>
                        <td>${data.tensp}</td>
                        <td>${data.soluong}</td>
                        <td>${data.danhmuc}</td>
                        <td>
                            <button class="btn" onclick="handleEjectProduct(${index})">
                                <i class="fa fa-shopping-cart"></i>
                            </button>
                        </td>
                    </tr>`;

/**
 * 
 * @param {*} data 
 * @param {*} index 
 * @returns 
 */
const RowDataEject = (data, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${data.masp}</td>
                        <td>${data.tensp}</td>
                        <td>${data.danhmuc}</td>
                        <td>${data.soluong}</td>
                        <td>${convertFormatNumber(data.dongia)}</td>
                        <td>${data.ngaysx}</td>
                        <td>${convertFormatNumber(data.dongia * data.soluong)}</td>
                        <td>
                            <button class="btn" onclick="handleProductEjectRemove(${index})">
                                <i class="fa fa-times"></i>
                            </button>
                        </td>
                    </tr>`

/**
 * Clear form
 */
function ClearFormError() {
    let myPrice = $("#myForm .fromTable #priceProduct");
    let myQuantity = $("#myForm .fromTable #quantityProductEjact");
    let myDate = $("#myForm .fromTable #dateProductEjact");
    let myMsgErrorPrice = $("#myForm .fromTable #errorPriceProduct");
    let myMsgErrorQuantity = $("#myForm .fromTable #errorQuantityProductEjact");
    let myMsgErrorDate = $("#myForm .fromTable #errorDateProductEjact");

    myMsgErrorPrice.html("");
    myMsgErrorQuantity.html("");
    myMsgErrorDate.html("");
    myPrice.removeClass(`is-invalid`);
    myQuantity.removeClass(`is-invalid`);
    myDate.removeClass(`is-invalid`);
}

/**
 * Checked validate
 * Show error
 * @param {*} myPrice
 * @param {*} myQuantity
 * @param {*} myDate
 * @returns
 * */
function myValivate(myIndex, myPrice, myQuantity, myDate) {
    let flag = true;
    let myQuantityField = LIST_PRODUCTS[myIndex].soluong;

    let myMsgErrorPrice = $("#myForm .fromTable #errorPriceProduct");
    let myMsgErrorQuantity = $("#myForm .fromTable #errorQuantityProductEjact");
    let myMsgErrorDate = $("#myForm .fromTable #errorDateProductEjact");

    // clear error
    ClearFormError();

    if (!validatePrice(myPrice.val())) {
        myPrice.addClass(`is-invalid`);
        myMsgErrorPrice.html(`Giá phải lớn hơn 0`);
        flag = false;
    }

    if (!validateQuantity(myQuantityField, myQuantity.val())) {
        myQuantity.addClass(`is-invalid`);
        myMsgErrorQuantity.html(`Số lượng phải lớn hơn 0`);
        flag = false;
    }

    if (!validateDateOfNow(myDate.val())) {
        myDate.addClass(`is-invalid`);
        myMsgErrorDate.html(`Ngày sản xuất phải nhỏ hơn ngày hiện tại`);
        flag = false;
    }

    return flag;
}

/**
 * handleEjectProduct
 * @param {*} index 
 */
function handleEjectProduct(index) {
    ClearFormError();

    let myListProductTable = $("#myForm");
    let myCodeField = $("#myForm .fromTable #codeProduct");
    let myNameField = $("#myForm .fromTable #nameProduct");
    let myTypeField = $("#myForm .fromTable #typeProduct");

    myCodeField.val(LIST_PRODUCTS[index].masp);
    myNameField.val(LIST_PRODUCTS[index].tensp);
    myTypeField.val(LIST_PRODUCTS[index].danhmuc);

    // flag index
    myListProductTable.prop("flagIndex", index);
    $(`#btnSubmit`).prop("disabled", false);
}

/**
 * handleProductEjectRemove
 * @param {*} index 
 */
function handleProductEjectRemove(index) {

    if (confirm(`Bạn có muốn xóa sản phẩm ${LIST_PRODUCTS_EJACT[index].tensp}?`)) {
        //  find index
        let myIndex = LIST_PRODUCTS.findIndex((product) => product.masp === LIST_PRODUCTS_EJACT[index].masp);
        // update quantity
        LIST_PRODUCTS[myIndex].soluong += parseInt(LIST_PRODUCTS_EJACT[index].soluong);
        LIST_PRODUCTS_EJACT.splice(index, 1);

        handleRenderGUIProductsEject();
        handleRenderGUIProducts();
    }
}

/**
 * handleEjectToCart
 **/
function handleEjectToCart() {
    let myIndex = $("#myForm").prop("flagIndex");
    let myPrice = $("#myForm .fromTable #priceProduct");
    let myQuantity = $("#myForm .fromTable #quantityProductEjact");
    let myDate = $("#myForm .fromTable #dateProductEjact");

    if (myValivate(myIndex, myPrice, myQuantity, myDate)) {
        // add data to list ejact product
        LIST_PRODUCTS_EJACT.push({
            masp: LIST_PRODUCTS[myIndex].masp,
            tensp: LIST_PRODUCTS[myIndex].tensp,
            danhmuc: LIST_PRODUCTS[myIndex].danhmuc,
            soluong: myQuantity.val(),
            dongia: myPrice.val(),
            ngaysx: myDate.val(),
        })
        // update data in list product
        LIST_PRODUCTS[myIndex].soluong -= parseInt(myQuantity.val());

        // clear data
        $("#myForm").prop("flagIndex", -1);
        $("#myForm .fromTable>form").trigger("reset");
        $(`#btnSubmit`).prop("disabled", true);

        // render GUI
        handleRenderGUIProducts();
        handleRenderGUIProductsEject();
    }
}

/**
 * handleRenderGUIProducts
 */
function handleRenderGUIProducts() {
    let myListProductTable = $("#myListProductTable");
    myListProductTable.html("");
    $.each(LIST_PRODUCTS, function (index, data) {
        myListProductTable.append(RowData(data, index));
    });
    // handle change total quantity
    handleChangeTotalQuantity();
}

/**
 * handleRenderGUIProductsEject
 */
function handleRenderGUIProductsEject() {
    let myListProductTable = $("#myListProductEjactTable");
    myListProductTable.html("");
    $.each(LIST_PRODUCTS_EJACT, function (index, data) {
        myListProductTable.append(RowDataEject(data, index));
    });
    // handle change total quantity
    handleChangeTotalEject();
}

/**
 * handleChangeTotalEject
 * @returns 
 */
function handleChangeTotalEject() {
    //
    let objTotalQuantity = $("#totalQuantityEjact");
    let objTotalPrice = $("#totalPriceEjact");

    let totalQuantity = LIST_PRODUCTS_EJACT.reduce((a, b) => a + parseInt(b.soluong), 0);
    let totalPrice = LIST_PRODUCTS_EJACT.reduce((a, b) => a + b.soluong * b.dongia, 0);

    objTotalQuantity.html(0);
    objTotalPrice.html(convertFormatNumber(0));
    if (totalQuantity > 0 && totalPrice > 0) {
        objTotalQuantity.html(totalQuantity);
        objTotalPrice.html(convertFormatNumber(totalPrice));
        return;
    }
}

/**
 * handleChangeTotalQuantity
 */
function handleChangeTotalQuantity() {
    let totalQuantity = 0;
    $.each(LIST_PRODUCTS, function (index, data) {
        totalQuantity += data.soluong;
    });
    $("#totalQuantity").html(totalQuantity);
}

/**
 * $(document).ready
 */
$(document).ready(function () {
    handleRenderGUIProducts();
    $(`#btnSubmit`).on("click", handleEjectToCart);
});
