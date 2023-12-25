/*
    This function called when "Register" button clicked.
*/
function validateRegister() {
	// Get the value that user enters at the form
	var firstNameElement = document.getElementById("firstName");
	var lastNameElement = document.getElementById("lastName");
	var emailElement = document.getElementById("email");
	var userNameElement = document.getElementById("userName");
	var passwordElement = document.getElementById("password");
	var confirmPasswordElement = document.getElementById("confirmPassword");

	// variable to check valid input
	var status = false;

	var message = "Please fill all mandatory fields";

	setBorderColor(firstNameElement);
	setBorderColor(lastNameElement);
	setBorderColor(emailElement);
	setBorderColor(userNameElement);
	setBorderColor(passwordElement);
	setBorderColor(confirmPasswordElement);

	var email = emailElement.value;

	if (email != "" && !validateEmail(email)) {
		message = "Email is incorrect format";
		emailElement.style.borderColor = "red";
	} else if (passwordElement.value != confirmPasswordElement.value) {
		message = "Confirm password is not match with password";
		confirmPasswordElement.style.borderColor = "red";
	}

	// count number of input tags
	var numberOfInput = document.getElementsByTagName("input").length;
	var countNumberValidInput = 0;
	for (var j = 0; j < numberOfInput; j++) {
		// check all input are valid
		if (document.getElementsByTagName("input")[j].style.borderColor == "green") {
			countNumberValidInput++;
		}
	}
	// if all input are valid, set ok = true
	if (countNumberValidInput == numberOfInput) {
		message = "";
		status = true;
	}

	document.getElementById("error").innerHTML = message;
	// if statuc -> call method showUserRegisted()
	if (status) {
		showUserRegisted();
	}
}

/*
     This function to create a header row for an existed table and append data to it.
*/
function showUserRegisted() {
	// get element tbody of table with id = tbl-result
	var table = document.getElementById("tbl-result").getElementsByTagName("tbody")[0];
	var index = table.rows.length;
	// if number rows of table == 0, insert th into thead of table
	if (table.rows.length == 0) {
		var thead = document.getElementById("tbl-result").getElementsByTagName("thead")[0];
		var row = thead.insertRow(0);
		row.insertCell(0).outerHTML = "<th>No</th>";
		row.insertCell(1).outerHTML = "<th>First Name</th>";
		row.insertCell(2).outerHTML = "<th>Last Name</th>";
		row.insertCell(3).outerHTML = "<th>Email</th>";
		row.insertCell(4).outerHTML = "<th>Username</th>";
	}
	// insert user registed rows into table result
	var row = table.insertRow(table.rows.length);
	row.insertCell(0).innerHTML = ++index;
	row.insertCell(1).innerHTML = document.getElementById("firstName").value;
	row.insertCell(2).innerHTML = document.getElementsByClassName("lastName")[0].value;
	row.insertCell(3).innerHTML = document.getElementsByTagName("input")[2].value;
	row.insertCell(4).innerHTML = document.getElementById("userName").value;
}
/*
    Check valid email.
*/
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/*
    Change border to an element.
*/
function setBorderColor(element) {
	if (element.value == "") {
		element.style.borderColor = "red";
	} else {
		element.style.borderColor = "green";
	}
}



