$(document).ready(function () {
  const inputFN = $("#fname");
  const inputLN = $("#lname");
  const inputE = $("#email");
  const inputPh = $("#phone");
  const inputAdr = $("#adr");
  const inputCity = $("#city");
  const inputState = $("#state");
  const inputZip = $("#zip");
  const inputNOC = $("#cname");
  const inputCCN = $("#ccnum");
  const inputMonth = $("#expmonth");
  const inputYear = $("#expyear");
  const inputCCV = $("#cvv");
  const btnAdd = $("#btn-add");

  var arrOrder = [];

  /*Validate*/
  function validateData(data) {
    var resultCheck = true;
    if (!checkFN()) {
      resultCheck = false;
    }
    if (!checkLN()) {
      resultCheck = false;
    }
    if (!checkE()) {
      resultCheck = false;
    }
    if (!checkPh()) {
      resultCheck = false;
    }
    if (!checkAdr()) {
      resultCheck = false;
    }
    if (!checkCity()) {
      resultCheck = false;
    }
    if (!checkState()) {
      resultCheck = false;
    }
    if (!checkZip()) {
      resultCheck = false;
    }
    if (!checkNOC()) {
      resultCheck = false;
    }
    if (!checkCCN()) {
      resultCheck = false;
    }
    if (!checkMonth()) {
      resultCheck = false;
    }
    if (!checkYear()) {
      resultCheck = false;
    }
    if (!checkCCV()) {
      resultCheck = false;
    }
    return resultCheck;
  }

  let err = "";
  let txt = "";
  let regex = "";

  //Check First Name
  function checkFN() {
    err = $("#fname");
    txt = $("#err-fname");
    regex = /^[a-zA-Z]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("First Name contain only letters");
      err.addClass("is-invalid");
      return false;
    }
  }

  //Check Last Name
  function checkLN() {
    err = $("#lname");
    txt = $("#err-lname");
    regex = /^[a-zA-Z]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Last Name contain only letters");
      err.addClass("is-invalid");
      return false;
    }
  }

  //Check Email
  function checkE() {
    err = $("#email");
    txt = $("#err-email");
    regex = /^[\w\d]+@[a-zA-Z]+\.[a-zA-Z]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Email is invalid");
      err.addClass("is-invalid");
      return false;
    }
  }

  //Check Phone
  function checkPh() {
    err = $("#phone");
    txt = $("#err-phone");
    regex = /^\d{10}$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Phone contain 10 digits");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Address
  function checkAdr() {
    err = $("#adr");
    txt = $("#err-adr");
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (err.val().trim() !== "") {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Address is required");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check City
  function checkCity() {
    err = $("#city");
    txt = $("#err-city");
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (err.val().trim() !== "") {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("City is required");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check State
  function checkState() {
    err = $("#state");
    txt = $("#err-state");
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (err.val() !== "...") {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Please select a state");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Zip Code
  function checkZip() {
    err = $("#zip");
    txt = $("#err-zip");
    regex = /^\d{5}$/;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Zip code must contain 5 digits");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Name on Card
  function checkNOC() {
    err = $("#cname");
    txt = $("#err-cname");
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (err.val().trim() !== "") {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Name on Card is required");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Credit Card Number
  function checkCCN() {
    err = $("#ccnum");
    txt = $("#err-ccnum");
    regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Credit card number is invalid");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Expiration Month
  function checkMonth() {
    err = $("#expmonth");
    txt = $("#err-expmonth");
    regex = /^(0?[1-9]|1[0-2])$/;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Exp Month is invalid");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check Expiration Year
  function checkYear() {
    err = $("#expyear");
    txt = $("#err-expyear");
    regex = /^(19|20)\d{2}$/;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Exp Year is invalid");
      err.addClass("is-invalid");
      return false;
    }
  }

  // Check CVV
  function checkCCV() {
    err = $("#cvv");
    txt = $("#err-cvv");
    regex = /^\d{3}$/;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("CVV is invalid");
      err.addClass("is-invalid");
      return false;
    }
  }


  // Xử lý nút signin
  btnAdd.on("click", function () {
    const data = {
      FirstName: inputFN.val(),
      LastName: inputLN.val(),
      Email: inputE.val(),
      Phone: inputPh.val(),
      Address: inputAdr.val(),
      City: inputCity.val(),
      State: inputState.val(),
      ZipCode: inputZip.val(),
      NameOnCard: inputNOC.val(),
      CreditCardNumber: inputCCN.val(),
      ExpirationMonth: inputMonth.val(),
      ExpirationYear: inputYear.val(),
      CVV: inputCCV.val()
    };

    if (validateData(data)) {
      arrOrder.push(data);

      // Create a new row in the table for the added data
      const newRow = $("<tr>");
      newRow.append($("<td>").text(data.FirstName));
      newRow.append($("<td>").text(data.LastName));
      newRow.append($("<td>").text(data.Email));
      newRow.append($("<td>").text(data.Phone));
      newRow.append($("<td>").text(data.Address));
      newRow.append($("<td>").text(data.City));
      newRow.append($("<td>").text(data.State));
      newRow.append($("<td>").text(data.ZipCode));
      newRow.append($("<td>").text(data.NameOnCard));
      newRow.append($("<td>").text(data.CreditCardNumber));
      newRow.append($("<td>").text(data.ExpirationMonth));
      newRow.append($("<td>").text(data.ExpirationYear));
      newRow.append($("<td>").text(data.CVV));
      newRow.append($("<td>").html('<a href="#" class="edit-link">Edit</a> <a href="#" class="delete-link">Delete</a>'));

      // Append the new row to the table body
      $("tbody").append(newRow);

      // Clear the input fields
      inputFN.val("");
      inputLN.val("");
      inputE.val("");
      inputPh.val("");
      inputAdr.val("");
      inputCity.val("");
      inputState.val("");
      inputZip.val("");
      inputNOC.val("");
      inputCCN.val("");
      inputMonth.val("");
      inputYear.val("");
      inputCCV.val("");
    }
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

    // Populate the form with the retrieved values
    inputFN.val(firstName);
    inputLN.val(lastName);
    inputE.val(email);
    inputPh.val(phone);
    inputAdr.val(address);
    inputCity.val(city);
    inputState.val(state);
    inputZip.val(zipCode);
    inputNOC.val(nameOnCard);
    inputCCN.val(creditCardNumber);
    inputMonth.val(expirationMonth);
    inputYear.val(expirationYear);
    inputCCV.val(cvv);

    // Remove the row from the table
    row.remove();
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

