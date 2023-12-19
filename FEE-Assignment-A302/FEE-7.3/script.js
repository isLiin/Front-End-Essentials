'use strict';
const LIST_DEFAULT = new Array();

function validate() {
    // create isValid
    let isValidCheckBoxError = true;
    let isValidFirstNameError = true;
    let isValidLastNameError = true;
    let isValidEmailError = true;
    let isValidPhoneError = true;
    let isValidAddressError = true;
    let isValidCityError = true;
    let isValidStateError = true;
    let isValidZipcodeError = true;
    let isValidNameOnCardError = true;
    let isValidCardNumberError = true;
    let isValidExpMonthError = true;
    let isValidExpYearError = true;
    let isValidCvvError = true;


    // get element error
    let firstNameError = $("#first_nameHelp");
    let lastNameError = $("#last_nameHelp");
    let emailError = $("#emailHelp");
    let phoneError = $("#phoneHelp");
    let addressError = $("#addressHelp");
    let cityError = $("#cityHelp");
    let stateError = $("#stateHelp");
    let zipcodeError = $("#zipcodeHelp");
    let nameOnCardError = $("#nameOnCardHelp");
    let cardNumberError = $("#creditCardHelp");
    let expMonthError = $("#expMonthHelp");
    let expYearError = $("#expYearHelp");
    let cvvError = $("#cvvHelp");


    // get value
    let checkBox = $("#myCheck");
    let firstName = $("#my_first_name");
    let lastName = $("#my_last_name");
    let email = $("#my_email");
    let phone = $("#my_phone");
    let address = $("#my_address");
    let city = $("#my_city");
    let state = $("#my_state");
    let zipcode = $("#my_zipcode");
    let nameOnCard = $("#my_nameOnCard");
    let cardNumber = $("#my_creditCard");
    let expMonth = $("#my_expMonth");
    let expYear = $("#my_expYear");
    let cvv = $("#my_cvv");

    // validate
    firstNameError.html("");
    firstName.removeClass("is-invalid");
    if (!validateText(firstName.val())) {
        firstName.focus();
        firstName.addClass("is-invalid");
        firstNameError.html("invalid first name");
        isValidFirstNameError = false;
    }

    lastNameError.html("");
    lastName.removeClass("is-invalid");
    if (!validateText(lastName.val())) {
        lastName.focus();
        lastName.addClass("is-invalid");
        lastNameError.html("invalid last name");
        isValidLastNameError = false;
    }

    emailError.html("");
    email.removeClass("is-invalid");
    if (!validateEmail(email.val())) {
        email.focus();
        email.addClass("is-invalid");
        emailError.html("invalid email");
        isValidEmailError = false;
    }

    phoneError.html("");
    phone.removeClass("is-invalid");
    if (!validatePhone(phone.val())) {
        phone.focus();
        phone.addClass("is-invalid");
        phoneError.html("invalid phone");
        isValidPhoneError = false;
    }

    addressError.html("");
    address.removeClass("is-invalid");
    if (!validateText(address.val())) {
        address.focus();
        address.addClass("is-invalid");
        addressError.html("invalid address");
        isValidAddressError = false;
    }

    cityError.html("");
    city.removeClass("is-invalid");
    if (!validateText(city.val())) {
        city.focus();
        city.addClass("is-invalid");
        cityError.html("invalid city");
        isValidCityError = false;
    }

    stateError.html("");
    state.removeClass("is-invalid");
    if (!validateState(state.val())) {
        state.focus();
        state.addClass("is-invalid");
        stateError.html("invalid state");
        isValidStateError = false;
    }

    zipcodeError.html("");
    zipcode.removeClass("is-invalid");
    if (!validateZipcode(zipcode.val())) {
        zipcode.focus();
        zipcode.addClass("is-invalid");
        zipcodeError.html("invalid zipcode");
        isValidZipcodeError = false;
    }

    nameOnCardError.html("");
    nameOnCard.removeClass("is-invalid");
    if (!validateText(nameOnCard.val())) {
        nameOnCard.focus();
        nameOnCard.addClass("is-invalid");
        nameOnCardError.html("invalid Name On Card");
        isValidNameOnCardError = false;
    }

    cardNumberError.html("");
    cardNumber.removeClass("is-invalid");
    if (!validateCardNumber(cardNumber.val())) {
        cardNumber.focus();
        cardNumber.addClass("is-invalid");
        cardNumberError.html("invalid Card Number");
        isValidCardNumberError = false;
    }

    expMonthError.html("");
    expMonth.removeClass("is-invalid");
    if (!validateExpMonth(expMonth.val())) {
        expMonth.focus();
        expMonth.addClass("is-invalid");
        expMonthError.html("invalid Exp Month");
        isValidExpMonthError = false;
    }

    expYearError.html("");
    expYear.removeClass("is-invalid");
    if (!validateExpYear(expYear.val())) {
        expYear.focus();
        expYear.addClass("is-invalid");
        expYearError.html("invalid Exp Year");
        isValidExpYearError = false;
    }

    cvvError.html("");
    cvv.removeClass("is-invalid");
    if (!validateCVV(cvv.val())) {
        cvv.focus();
        cvv.addClass("is-invalid");
        cvvError.html("invalid CVV");
        isValidCvvError = false;
    }

    // check
    if (!checkBox.is(":checked")) {
        checkBox.focus();
        checkBox.addClass("is-invalid");
        isValidCheckBoxError = false;
    } else {
        checkBox.removeClass("is-invalid");
    }

    // check
    return isValidFirstNameError && isValidLastNameError
        && isValidEmailError && isValidPhoneError
        && isValidAddressError && isValidCityError
        && isValidStateError && isValidZipcodeError
        && isValidCardNumberError && isValidExpMonthError
        && isValidExpYearError && isValidCvvError
        && isValidCheckBoxError && isValidNameOnCardError
}

$("#my_creditCard").on('keypress', function () {
    let cardNumber = $("#my_creditCard");
    let cardNumberError = $("#creditCardHelp");

    if (($(this).val().length === 4
        || $(this).val().length === 9
        || $(this).val().length === 14)) {
        $("#my_creditCard").val($("#my_creditCard").val() + "-");
    }

    cardNumberError.html("");
    cardNumber.removeClass("is-invalid");
    if (!validateCardNumber(cardNumber.val())) {
        cardNumber.focus();
        cardNumber.addClass("is-invalid");
        cardNumberError.html("invalid Card Number");
    }
})

$("#btn-submit").on('click', function () {
    if (validate()) {
        // get value
        let firstName = $("#my_first_name");
        let lastName = $("#my_last_name");
        let email = $("#my_email");
        let phone = $("#my_phone");
        let address = $("#my_address");
        let city = $("#my_city");
        let state = $("#my_state");
        let zipcode = $("#my_zipcode");
        let nameOnCard = $("#my_nameOnCard");
        let cardNumber = $("#my_creditCard");
        let expMonth = $("#my_expMonth");
        let expYear = $("#my_expYear");
        let cvv = $("#my_cvv");

        // set value
        LIST_DEFAULT.push({
            firstName: firstName.val(),
            lastName: lastName.val(),
            email: email.val(),
            phone: phone.val(),
            address: address.val(),
            city: city.val(),
            state: state.val(),
            zipcode: zipcode.val(),
            nameOnCard: nameOnCard.val(),
            cardNumber: cardNumber.val(),
            expMonth: expMonth.val(),
            expYear: expYear.val(),
            cvv: cvv.val()
        })

        // render
        renderDatas();

        // clear
        // $("#my_state").val(0);
        // $("input.form-control").prop('value', '');
    }
})

function recordData(item, index) {
    return `
        <tr>
            <td>${index + 1}</td>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.address}</td>
            <td>${item.city}</td>
            <td>${item.state}</td>
            <td>${item.zipcode}</td>
            <td>${item.nameOnCard}</td>
            <td>${item.cardNumber}</td>
            <td>${item.expMonth}</td>
            <td>${item.expYear}</td>
            <td>${item.cvv}</td>
            <td>
                <button type="button" class="btn btn-danger" onclick="deleteData(${index})">
                    <i class="fa fa-trash"></i>
                </button>
            </td>
        </tr>
    `
}

function deleteData(index) {
    if (confirm("Bạn có chắc muốn xóa Record Data này không?")) {
        LIST_DEFAULT.splice(index, 1);
        renderDatas();
    }
}

function renderDatas() {
    $("#list-data").html("");
    LIST_DEFAULT.forEach((item, index) => {
        $("#list-data").append(recordData(item, index));
    })
}