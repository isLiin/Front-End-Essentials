
//hide
$("#updateBtn").hide();

//reset
$("#formInput").trigger('reset')

//empty
$("#bodyTable").empty();

//set value radio
$('input[name=gender][value=' + studentEdit.gender + ']').prop('checked', true)
//get radio 
gender = $('input[name=gender]:checked').val()

// each
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

// delete
$("#result tbody").on('click', '#deleteBtn', function () {
    let idDelete = $(this).parent().parent().attr('id')
    console.log(idDelete);

    listStudent = listStudent.filter((e) => e.id != idDelete)
    displayArr(listStudent)
})

//search
$("#searchBtn").on('click', function () {
    var searchInput = $("#search").val()
    let searchArr = []
    listStudent.forEach(student => {
        if (student.fullName.includes(searchInput)) {
            searchArr.push(student)
        }
    });
    displayArr(searchArr);
})

//Validate
isFullName = function (selector) {
    // let regex = /^(C)[a-zA-z]+$/;
    let regex = /^[ a-zA-Z]+$/;
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Yêu cầu nhập họ và tên!!!");
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

isCheckBox = function () {
    let selector = 'input[type="checkbox"]';
    if (!$(selector).is(':checked')) {
        $(selector).addClass("is-invalid");
        $(selector).next().next().html("Ban chưa check kìa:");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true;
    }
}

isCheckBox = function () {
    let selector = 'input[type="radio"]';
    if (!$(selector).is(':checked')) {
        $(selector).addClass("is-invalid");
        $(selector).next().next().html("Ban chưa nhập kìa:");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true;
    }
}

isBirthday = function (selector) {

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

isSelect = function (selector) {
    // if ($(selector).val() == $("option:first-child").val()) {
    if ($(selector).val() == null) {

        $(selector).addClass("is-invalid");
        $(selector).next().html("Bạn chưa nhập lựa chọn:");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true;
    }
};

isScore = function (selector) {
    let score = parseFloat($(selector).val());
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban chua nhap truong nay");
        return false;
    } else if (score < 0 || score > 10) {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban nhap chua phải trong khoảng 0 - 10 ");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true;
    }


};

isMui1 = function (selector) {

    let namnhapvao = $(selector).val();
    let ngayht = new Date();
    let sosanh = (ngayht > new Date(namnhapvao));
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban chua nhap truong nay");
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

isMui2 = function (selector, selector2) {
    let namnhapvao = $(selector2).val();
    let ngaykhac = $(selector).val();
    // let ngayht = new Date();
    let sosanh = (new Date(ngaykhac) < new Date(namnhapvao));
    if ($(selector2).val() == "") {
        $(selector2).addClass("is-invalid");
        $(selector2).next().html("Ban chua nhap truong nay");
        return false;
    } else if (!sosanh) {
        $(selector2).addClass("is-invalid");
        $(selector2).next().html("Ban phai nhap lon hon ngay tiem mui 1");
        return false;
    } else {
        $(selector2).removeClass("is-invalid");
        return true;
    }
}

isMatchPhone = function (selector) {
    let regex = /^[0][0-9]{9}$/;
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban chua nhap truong nay");
        return false;
    } else if (!regex.test($(selector).val())) {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban nhap chua đúng số điện thoại");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true
    }

};

isMatchEmail = function (selector) {
    let regex = /^\w+([\.-]?\w+)*@fpt[\.]vn$/;
    // let regex = /^[a-zA-Z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban chua nhap truong nay");
        return false;
    } else if (!regex.test($(selector).val())) {
        console.log("ok");
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban nhap chua đúng định dạng mail ");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true;
    }

};

isMatchMonth = function (selector) {
    // let regex = /^0[1-9]|1[0-2]$/;
    let regex = /^(01|02|03|04|05|06|07|08|09|10|11|12)$/;
    if ($(selector).val() == "") {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Ban chua nhap");
        return false;
    } else if (!regex.test($(selector).val())) {
        $(selector).addClass("is-invalid");
        $(selector).next().html("Sai thang");
        return false;
    } else {
        $(selector).removeClass("is-invalid");
        return true
    }
};

function parseDate(strYMD) {
    let arr = strYMD.split("-");
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
}

function addDate(valDate, valAdd) {
    return new Date(valDate.getFullYear(), valDate.getMonth(), valDate.getDate() + valAdd);
}

function getToDay() {
    let now = new Date(); // Date + Time
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Only Date
}




isMui2 = function (selector, selector2) {
    let namnhapvao = $(selector2).val();
    let ngaykhac = $(selector).val();
    // let ngayht = new Date();
    let sosanh = (addMonth(new Date(ngaykhac), 1) < new Date(namnhapvao));
    if ($(selector2).val() == "") {
        $(selector2).addClass("is-invalid");
        $(selector2).next().html("Ban chua nhap truong nay");
        return false;
    } else if (!sosanh) {
        $(selector2).addClass("is-invalid");
        $(selector2).next().html("Ban phai nhap lon hon ngay tiem mui truoc 1 thang");
        return false;
    } else {
        $(selector2).removeClass("is-invalid");
        return true;
    }
}

function addMonth(valDate, valAdd) {
    return new Date(valDate.getFullYear(), valDate.getMonth() + valAdd, valDate.getDate());
}