
function checkString() {
    let string = $("#input-checkString").val();
    let regex = /^[a-zA-Z0-9.-\s]*$/;
    if (string.match(regex) && string.length > 0) {
        $("#error-checkString").html("");
        return true;
    } else {
        $("#error-checkString").html("không chứa các ký tự đặc biệt.");
        return false;
    }
}

function checkUrl() {
    let url = $("#input-checkUrl").val();
    let regex = /^(http:\/\/| https:\/\/|www.).+/;

    if (url.match(regex)) {
        $("#error-checkUrl").html("");
        return true;
    } else {
        $("#error-checkUrl").html("Kiểm tra lồi Url – chứa giá trị trên http://, https://, www.);");
        return false;
    }

}
function checkCredit() {
    let credit = $("#input-checkCredit").val();
    let regex = /^[0-9]{16}$/;
    if (credit.match(regex)) {
        $("#error-checkCredit").html("");
        return true;
    } else {
        $("#error-checkCredit").html("Kiểm tra số credit card – chuỗi chỉ chứa giá trị số có độ dài 16 số;");
    }
    return false;
}

function checkNumber() {
    let number = $("#input-checkNumber").val();
    let regex = /[0-9]$/g;
    if (number.match(regex)) {
        $("#error-checkNumber").html("");
        return true;
    } else {
        $("#error-checkNumber").html("Giá trị Khong phải là số?");
    }
    return false;
}

function checkEmail() {
    let email = $("#input-checkEmail").val();
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(regex)) {
        $("#error-checkEmail").html("");
        return true;
    } else {
        $("#error-checkEmail").html("Kiem tra email");
    }
    return false;
}