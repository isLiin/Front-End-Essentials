$(document).ready(function () {
	const form = document.forms[0];
	const fullName = form.fullName;
	const email = form.email;
	const phone = form.phone;
	const mui1 = form.mui1;
	const mui1Date = form.mui1Date;
	const mui2 = form.mui2;
	const mui2Date = form.mui2Date;
	const k5 = form.k5;
	const khaibao = form.khaibao;
	const register = form.register;
	const resetbtn = form.resetbtn;
	const tBody = document.getElementById("tableBody")

	mui1Date.disabled = true;
	mui2.disabled = true;
	mui2Date.disabled = true;

	mui1.addEventListener("change", function(event) {
		event.stopPropagation();
		if (mui1.checked == true) {
			mui1Date.disabled = false;
			mui2.disabled = false;
			mui2Date.disabled = false;
		}
	})

	var list = [
		{ fullName: "Miku Ohashi", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 1, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 454633, idButton: 47386 },
		{ fullName: "Hoang Dung", email: "42@gmail.com", phone: "0987654321", mui1: 0, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 4546433, idButton: 472386 },
		{ fullName: "Hoang Thuy Linh", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 4554633, idButton: 456386 },
		{ fullName: "Lexi Belle", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 1, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 45546933, idButton: 4763456 },
		{ fullName: "Eimi Fukuda", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 4524633, idButton: 4765356 },
		{ fullName: "Yui Hatano", email: "42@gmail.com", phone: "0987654321", mui1: 0, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 45463453, idButton: 47638534 },
		{ fullName: "Maria Ozawa", email: "42@gmail.com", phone: "0987654321", mui1: 0, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 45554633, idButton: 47653386 },
		{ fullName: "Mia Khalifa", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 0, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 457633, idButton: 47638436 },
		{ fullName: "Nguyen Van Hung", email: "42@gmail.com", phone: "0987654321", mui1: 1, mui1Date: "2023-03-02", mui2: 1, mui2Date: "2023-03-02", status: "Chờ xác nhận", idRow: 4854633, idButton: 4726386 },
	];
	displayArr(list);

	resetbtn.addEventListener("click", function (event) {
		event.preventDefault();
		event.stopPropagation();
		if (confirm("Bạn muốn reset dữ liệu đang nhập? ")) {
			resetForm();
			$.each($("small"), function () {
				$(this).attr("style", "display:none")
			})
		}
	})

	register.addEventListener("click", function (event) {
		event.stopPropagation();
		if (validateForm() == true) {
			let x = parseInt(Math.random() * 1000000);
			let y = parseInt(Math.random() * 1000000);
			let object = {
				idRow: x,
				idButton: y,
				fullName: fullName.value,
				email: email.value,
				phone: "(+84)" + phone.value,
				mui1: 0,
				mui1Date: mui1Date.value,
				mui2: 0,
				mui2Date: mui2Date.value,
				status: "Không đủ điều kiện"
			}
			if (mui1.checked == true) {
				object.mui1 = 1;
			}
			if (mui2.checked == true) {
				object.mui2 = 1;
				object.status = "Chờ xác nhận";
			}
			list.push(object);
			displayArr(list);

		}
		else {
			return;
		}
	})

	function displayArr(arr) {
		tBody.innerHTML = "";
		for (let i = 0; i < arr.length; i++) {
			tBody.innerHTML += appendRow(arr[i], i)
		}
		addEvent(arr);
	}

	function addEvent(arr) {
		for (let i = 0; i < arr.length; i++) {
			let idButton = arr[i].idButton
			let idRow = arr[i].idRow
			let id = arr[i].idRow;
			$("#" + idButton).click(function (event) {
				if(confirm("Bạn có muốn xóa Row Data này không? ")) {
					for (let j = 0; j < list.length; j++) {
						let index = 0;
						if (list[j].idRow == id) {
							index = j;
						}
						list.splice(index, 1);
					}
					$.each($("." + idRow), function () {
						$(this).remove();
					})
				}
			})
		}
	}

	function validateForm() {
		let check = [];
		let flag = true;
		check.push(checkString(fullName));
		check.push(checkEmail(email));
		check.push(checkNumber(phone));
		if (mui1.checked == true) {
			check.push(checkDate(mui1Date));
		}
		if (mui2.checked == true) {
			check.push(checkDate(mui2Date));
		}
		check.push(checkOption(k5));
		check.push(checkOption(khaibao));
		check.forEach(element => {
			if (element == false) {
				flag = false;
			}
		})
		return flag;
	}


	function resetForm() {
		fullName.value = "";
		email.value = "";
		phone.value = "";
		mui1.checked = false;
		mui2.checked = false;
		mui1Date.value = "";
		mui2Date.value = "";
		khaibao.checked = false;
		k5.checked = false;
	}

	function appendRow(object, number) {
		let count = 1;

		if (object.mui1 == 1) {
			count++;
		}
		if (object.mui2 == 1) {
			count++;
		}
		let tail = "<td rowspan=" + count + ">" + object.status + "</td>" + "<td rowspan=" + count + ">" + "<button id =\"" + object.idButton + "\" class=\"deleteBtn btn btn-danger\">Delete</button></td></tr>"
		let html = "<tr id=" + object.idRow + " class = \"" + object.idRow + "\">"
			+ "<td rowspan=" + count + ">" + (number + 1) + "</td>"
			+ "<td rowspan=" + count + ">" + object.fullName + "</td>"
			+ "<td rowspan=" + count + ">" + object.email + "</td>"
			+ "<td rowspan=" + count + ">" + object.phone + "</td>";
		if (count == 1) {
			html += "<td><button class=\"btn-outline-normal col-12 chuatiem\" >Chưa tiêm</button></td>" + tail;
		}
		if (count == 2) {
			html += "<td><button class=\"btn-outline-normal col-12 mui1\" >Đã tiêm 1 mũi</button></td>";
			html += tail;
			html += "<tr><td><button class=\"btn-outline-normal col-12 " + object.idRow + "\" >" + object.mui1Date + "</button></td></tr>"
		}
		if (count == 3) {
			html += "<td><button class=\"btn-outline-normal col-12 mui2 " + object.idRow + "\" >Đã tiêm 2 mũi</button></td>";
			html += tail;
			html += "<tr><td><button class=\"btn-outline-normal col-12 " + object.idRow + "\">" + object.mui1Date + "</button></td></tr>"
			html += "<tr><td><button class=\"btn-outline-normal col-12  " + object.idRow + "\" >" + object.mui2Date + "</button></td></tr>"

		}
		return html;
	}



	function checkString(object) {
		let regex = /^[a-zA-Z\s]+$/;
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value) && value != "") {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}


	function checkNumber(object) {
		regex = /^[0-9]{9,10}$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value)) {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}

	function checkEmail(object) {
		let regex = /^[\w-\.]+@example.com.vn$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value)) {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}

	function checkOption(object) {
		let id = object.id + "E";
		if (object.checked == true) {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}

	function checkDate(object) {
		let id = object.id + "E";
		if (object.value == "") {
			$("#" + id).attr("style", "display:block");
			return false;
		}
		let date = Date.parse(object.value);
		let today = Date.now();
		if (date > today) {
			$("#" + id).attr("style", "display:block");
			return false;
		}
		$("#" + id).attr("style", "display:none");
		return true;
	}

})