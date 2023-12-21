'use strict';

function checkString() {
    let string = $("#input-checkString").val();
    let errorString = $("#error-checkString");
    let regex = /^[a-zA-Z0-9.-\s]*$/;

    if (string.match(regex) && string.length > 0) {
        errorString.html("");
        return true;
    } else {
        errorString.html("không chứa các ký tự đặc biệt.");
        return false;
    }
}

function checkUrl() {
    let url = $("#input-checkUrl").val();
    let errorUrl = $("#error-checkUrl");
    let regex = /^(http:\/\/| https:\/\/|www.).+/;

    if (url.match(regex)) {
        errorUrl.html("");
        return true;
    } else {
        errorUrl.html("Kiểm tra lồi Url – chứa giá trị trên http://, https://, www.);");
        return false;
    }

}
function checkCredit() {
    let credit = $("#input-checkCredit").val();
    let errorCredit = $("#error-checkCredit");
    let regex = /^[0-9]{16}$/;

    if (credit.match(regex)) {
        errorCredit.html("");
        return true;
    } else {
        errorCredit.html("Kiểm tra số credit card – chuỗi chỉ chứa giá trị số có độ dài 16 số;");
        return false;
    }
}

function checkNumber() {
    let number = $("#input-checkNumber").val();
    let errorNumber = $("#error-checkNumber");
    let regex = /[0-9]$/g;

    if (number.match(regex)) {
        errorNumber.html("");
        return true;
    } else {
        errorNumber.html("Giá trị không phải là số?");
        return false;
    }
}

function checkEmail() {
    let email = $("#input-checkEmail").val();
    let errorEmail = $("#error-checkEmail");
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(regex)) {
        errorEmail.html("");
        return true;
    } else {
        errorEmail.html("Kiểm tra lỗi email");
        return false;
    }
}