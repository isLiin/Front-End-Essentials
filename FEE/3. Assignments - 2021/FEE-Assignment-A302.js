$(document).ready(function () {
    let firstName, lastName, email, phone, address, city, state, zip, cardName, cardNum, expMonth, expYear, cvv
    let id = 0
    let listInfo = [];

    $("#signIn").on('click', function () {

        let checkFirstName = isString("#firstName")
        let checkLastName = isString("#lastName")
        let checkEmail = isMatchEmail("#email")
        let checkPhone = isPhone("#phone")
        let checkAddress = isString("#address")
        let checkCity = isString("#city")
        let checkState = isSelect("#state")
        let checkZip = isZipCode("#zip")
        let checkcardName = isString("#cardName")
        let checkcardNum = isCardNumber("#cardNum")
        let checkExpMonth = isMatchMonth("#expMonth")
        let checkExpYear = isMatchYear("#expYear")
        let checkCVV = isCVV("#cvv")
        let check = isCheckBox("#checkMe")

        if (checkFirstName
            && checkLastName
            && checkEmail
            && checkPhone
            && checkAddress
            && checkCity
            && checkState
            && checkZip
            && checkcardName
            && checkcardNum
            && checkExpMonth
            && checkExpYear
            && checkCVV
        ) {
            console.log("sxa");
            firstName = $("#firstName").val()
            lastName = $("#lastName").val()
            email = $("#email").val()
            phone = $("#phone").val()
            address = $("#address").val()
            city = $("#city").val()
            state = $("#state").val()
            zip = $("#zip").val()
            cardName = $("#cardName").val()
            cardNum = $("#cardNum").val()
            expMonth = $("#expMonth").val()
            expYear = $("#expYear").val()
            cvv = $("#cvv").val()
            id++
            let personInfo = {
                id: id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                cardName: cardName,
                cardNum: cardNum,
                expMonth: expMonth,
                expYear: expYear,
                cvv: cvv
            }

            listInfo.push(personInfo)
            displayArr(listInfo)
            $("#info").trigger("reset")
        }

    })


    $("#result tbody").on('click', '#deleteBtn', function () {
        console.log("Vo roi ne");
        let idDelete = $(this).parent().parent().attr('id')
        listInfo = listInfo.filter((e) => e.id != idDelete)
        displayArr(listInfo)
    })


    function displayArr(arr) {
        console.log("aaaaa");
        $("#result tbody").empty()
        console.log("bbbbb");

        for (let i = 0; i < arr.length; i++) {
            $("#result tbody").append(`<tr id="${arr[i].id}">
            <td>${i+1}</td>
            <td>${arr[i].firstName}</td>
            <td>${arr[i].lastName}</td>
            <td>${arr[i].email}</td>
            <td>${arr[i].phone}</td>
            <td>${arr[i].address}</td>
            <td>${arr[i].state}</td>
            <td>${arr[i].zip}</td>
            <td>${arr[i].cardName}</td>
            <td>${arr[i].cardNum}</td>
            <td>${arr[i].expMonth}</td>
            <td>${arr[i].expYear}</td>
            <td>${arr[i].cvv}</td>
            <td><button class="btn btn-danger" id="deleteBtn">Delete</button></td>
        </tr>`)
        };
    }

    isString = function (selector) {fdí
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa nhập!!!");
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

    isPhone = function (selector) {
        let regex = /^[0-9]{10}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    isZipCode = function (selector) {
        let regex = /^[0-9]{5}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    isCVV = function (selector) {
        let regex = /^[0-9]{3}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
    };

    isCardNumber = function (selector) {
        let regex = /^[0-9]{3}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
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

    isMatchYear = function (selector) {
        let regex = /^(2\d\d\d)$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Sai năm");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }

    };

    isCheckBox = function () {
        let selector = 'input[type="checkbox"]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa nhập kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isSelect = function (selector) {
        if ($(selector).val() == $("option:first-child").val()) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa nhập lựa chọn:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }


    };

    isMatchEmail = function (selector) {
        // let regex = /^\w+([\.-]?\w+)*@gmail[\.]com[\.]vn$/;
        let regex = /^[a-zA-Z0-9]+@gmail[\.]com[\.]vn$/;

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
})