$(document).ready(function () {

    $("#ccnum").focus(function () {
        var currentValue = $("#ccnum").val();
        var newValue = currentValue.replace(/-/g, "");
        $("#ccnum").val(newValue);
    });

    $(".signin").click(function () {
        var valid = true;

        // Kiểm tra First Name
        var firstName = $("#fname").val().trim();
        if (!/^[a-zA-Z]+$/.test(firstName)) {
            valid = false;
            $("#err-fname").text("First Name contain only letters").show();
        } else {
            $("#err-fname").hide();
        }

        // Kiểm tra Last Name
        var lastName = $("#lname").val().trim();
        if (!/^[a-zA-Z]+$/.test(lastName)) {
            valid = false;
            $("#err-lname").text("Last Name contain only letters").show();
        } else {
            $("#err-lname").hide();
        }

        // Kiểm tra Email
        var email = $("#email").val().trim();
        if (!/^[\w\d]+@[a-zA-Z]+\.[a-zA-Z]{2,3}$/.test(email)) {
            valid = false;
            $("#err-email").text("Email is invalid").show();
        } else {
            $("#err-email").hide();
        }

        // Kiểm tra Phone
        var phone = $("#phone").val().trim();
        if (!/^\d{10}$/.test(phone)) {
            valid = false;
            $("#err-phone").text("Phone must contain 10 digits").show();
        } else {
            $("#err-phone").hide();
        }

        // Kiểm tra Address
        var address = $("#adr").val().trim();
        if (!/^[a-zA-Z\s\d]+$/.test(address)) {
            valid = false;
            $("#err-adr").text("Address must contain only letters and numbers").show();
        } else {
            $("#err-adr").hide();
        }

        // Kiểm tra City
        var city = $("#city").val().trim();
        if (!/^[a-zA-Z\s]+$/.test(city)) {
            valid = false;
            $("#err-city").text("City contain only letters").show();
        } else {
            $("#err-city").hide();
        }

        // Kiểm tra State
        var state = $("#state").val();
        if (state === "...") {
            valid = false;
            $("#err-state").text("Please select a State").show();
        } else {
            $("#err-state").hide();
        }

        // Kiểm tra Zip code
        var zip = $("#zip").val().trim();
        if (!/^\d{5}$/.test(zip)) {
            valid = false;
            $("#err-zip").text("Code is invalid").show();
        } else {
            $("#err-zip").hide();
        }

        // Kiểm tra Name on Card
        var nameOnCard = $("#cname").val().trim();
        if (!/^[a-zA-Z\s]+$/.test(nameOnCard)) {
            valid = false;
            $("#err-cname").text("Name on Card must contain only letters").show();
        } else {
            $("#err-cname").hide();
        }

        // Kiểm tra Credit Card Number
        var ccNum = $("#ccnum").val().trim().replace(/-/g, "");
        if (!/^\d{16}$/.test(ccNum) || !/^\d{4}-\d{4}-\d{4}-\d{4}$/.test($("#ccnum").val())) {
            valid = false;
            $("#err-ccnum").text("Credit Card Number is invalid").show();
        } else {
            $("#err-ccnum").hide();
        }

        // Kiểm tra Exp Month
        var expMonth = $("#expmonth").val().trim();
        if (!/^\d{2}$/.test(expMonth) || parseInt(expMonth) > 12) {
            valid = false;
            $("#err-expmonth").text("Exp Month is invalid").show();
        } else {
            $("#err-expmonth").hide();
        }

        // Kiểm tra Exp Year
        var expYear = $("#expyear").val().trim();
        if (!/^\d{4}$/.test(expYear) || parseInt(expYear) <= 2000) {
            valid = false;
            $("#err-expyear").text("Exp Year is invalid").show();
        } else {
            $("#err-expyear").hide();
        }

        // Kiểm tra CVV
        var cvv = $("#cvv").val().trim();
        if (!/^\d{3}$/.test(cvv)) {
            valid = false;
            $("#err-cvv").text("CVV is invalid").show();
        } else {
            $("#err-cvv").hide();
        }

        if (valid) {
            var firstName = $("#fname").val().trim();
            var lastName = $("#lname").val().trim();
            var email = $("#email").val().trim();
            var phone = $("#phone").val().trim();
            var address = $("#adr").val().trim();
            var city = $("#city").val().trim();
            var state = $("#state").val();
            var zip = $("#zip").val().trim();
            var nameOnCard = $("#cname").val().trim();
            var ccNum = $("#ccnum").val().trim()
            var expMonth = $("#expmonth").val().trim();
            var expYear = $("#expyear").val().trim();
            var cvv = $("#cvv").val().trim();

            var newRow = "<tr><td>" + firstName + "</td><td>" + lastName + "</td><td>" + email + "</td><td>" + phone + "</td><td>" +
                address + "</td><td>" + city + "</td><td>" + state + "</td><td>" + zip + "</td><td>" +
                nameOnCard + "</td><td>" + ccNum + "</td><td>" + expMonth + "</td><td>" + expYear +
                "</td><td>" + cvv + "</td><td><a href='#' class='fa-solid fa-pen-to-square edit-link'></a> <a href='#' class='fa-solid fa-trash delete-link'></a></td></tr>";

            $("table tbody").append(newRow);
            $("#form")[0].reset();
        }
    });


    $(".ccnum").focus(function () {
        var value = $(this).val();
        value = value.replace(/-/g, "");
        $(this).val(value);
    });

    // Hàm xử lý nút edit
    $("tbody").on("click", ".edit-link", function () {
        var row = $(this).closest("tr");
        var cells = row.find("td");

        // Get the values from the table cells
        var firstName = cells.eq(0).text();
        var lastName = cells.eq(1).text();
        var email = cells.eq(2).text();
        var phone = cells.eq(3).text();
        var address = cells.eq(4).text();
        var city = cells.eq(5).text();
        var state = cells.eq(6).text();
        var zipCode = cells.eq(7).text();
        var nameOnCard = cells.eq(8).text();
        var creditCardNumber = cells.eq(9).text();
        var expirationMonth = cells.eq(10).text();
        var expirationYear = cells.eq(11).text();
        var cvv = cells.eq(12).text();

        // Change the submit button text to 'Save'
        $("#btn-add").text("Save");

        // Populate the form with the retrieved values
        $("#fname").val(firstName);
        $("#lname").val(lastName);
        $("#email").val(email);
        $("#phone").val(phone);
        $("#adr").val(address);
        $("#city").val(city);
        $("#state").val(state);
        $("#zip").val(zipCode);
        $("#cname").val(nameOnCard);
        $("#ccnum").val(creditCardNumber);
        $("#expmonth").val(expirationMonth);
        $("#expyear").val(expirationYear);
        $("#cvv").val(cvv);


        // Remove the row from the table
        row.remove();
        $("#btn-add").reset;
    });





    // Hàm xử lý sự kiện khi bấm delete
    $("tbody").on("click", ".delete-link", function () {
        var row = $(this).closest("tr");
        var result = confirm("Bạn có chắc muốn xóa Record Data này không?");
        if (result) {
            row.remove();
        }
    });

    // Xử lý sự kiện khi nhập dãy số vào sẽ tự động thêm - mỗi 4 số
    $("#ccnum").on("keydown", function (e) {
        var key = e.keyCode || e.which;
        if (key !== 8 && (this.value.length === 4 || this.value.length === 9 || this.value.length === 14)) {
            this.value += "-";
        }
    });

    // Hàm xử lý sự kiện khi search

    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


});


var input = document.getElementById("#ccnum");
    var value = "on";

    input.addEventListener("focus", function () {
        if (value == "on") {
            input.value = "";
            value = "off";
        }
        else {
            text.value = "this is value";
            value = "on";
        }
    });