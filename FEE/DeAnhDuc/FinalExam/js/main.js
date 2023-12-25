// preventDefault: Huỷ bỏ event nếu nó có thể huỷ mà không dừng sự lan rộng(propagation) của event tới phần khác.
// stopPropagation Ngăn chặn sự lan rộng của sự kiện hiện tại tới thằng khác.
// stopImmediatePropagation ngăn chặn những listeners cũng đang đang lắng nghe cùng event được gọi.

$(document).ready(function () {
	let record = [];
	let form = document.forms;
	let form1 = form[0];
	let form2 = form[1];
	console.log(form2);
	let self = form2.self;
	let hire = form2.hire;
	let register = form2.register;
	let result = document.getElementById("result")
	let searchCar = document.getElementById("searchCar");
	let carTable = document.getElementById("carTable")
	let code;

	var xe = [
		{ carID: 83712, rowID: 8293718, carName: "Kia Morning", carType: 4, carPrice: 500000, carStatus: 1, carImage: "image/2.jpg" },
		{ carID: 837121, rowID: 82937184, carName: "Huyndai I10", carType: 4, carPrice: 700000, carStatus: 1, carImage: "image/2.jpg" },
		{ carID: 837122, rowID: 82937182, carName: "Kia K3", carType: 4, carPrice: 900000, carStatus: 1, carImage: "image/3.jpg" },
		{ carID: 837123, rowID: 82937181, carName: "Kia Rondo", carType: 4, carPrice: 900000, carStatus: 1, carImage: "image/4.jpg" },
		{ carID: 837124, rowID: 82937183, carName: "Toyota Fortuner", carType: 7, carPrice: 1100000, carStatus: 2, carImage: "image/5.jpg" },
		{ carID: 837125, rowID: 82937186, carName: "Kia Sportage", carType: 7, carPrice: 1500000, carStatus: 2, carImage: "image/6.jpg" },
		{ carID: 837126, rowID: 82937187, carName: "Chevroler Camaro", carType: 7, carPrice: 1500000, carStatus: 2, carImage: "image/6.jpg" },
		{ carID: 837126, rowID: 82937187, carName: "Chevroler Captiva", carType: 4, carPrice: 1500000, carStatus: 2, carImage: "image/6.jpg" },
		{ carID: 837126, rowID: 82937187, carName: "Chevroler Spark", carType: 7, carPrice: 1500000, carStatus: 1, carImage: "image/6.jpg" },
	]

	self.addEventListener("change", function (event) {
		if (this.checked == true) {
			hire.checked = false;
			$("#traThem").hide();
		}
	})

	hire.addEventListener("change", function (event) {
		if (this.checked == true) {
			self.checked = false;
			$("#traThem").show();
		}
	})

	register.addEventListener("click", function (event) {
		// sử dụng để ngăn trình duyệt thực hiện hành động mặc định của phần tử đã chọn
		event.preventDefault();
		// Huỷ bỏ event nếu nó có thể huỷ mà không dừng sự lan rộng(propagation) của event tới phần khác
		event.stopPropagation()
		if (!validateForm()) {
			return;
		};
		let name = form2.fullName.value;
		let cName = form2.carName.value;
		let cType = form2.carType1.value;
		let cPrice = form2.carPrice.value;
		let address = form2.address.value;
		let hDate = new Date(form2.rentDate.value);
		let rDate = new Date(form2.returnDate.value);
		let phone = form2.phone.value;
		let self = form2.self;
		let hire = form2.hire;
		let diffTime = rDate.getTime() - hDate.getTime()
		let diffDays = parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
		let money = 0;
		let status
		if (self.checked == true) {
			money += diffDays * parseInt(cPrice);
			status = "Tự lái";
		} else if (hire.checked == true) {
			status = "Có thuê tài xê";
			if (cType == "4 chỗ") {
				money += diffDays * parseInt(cPrice) + diffDays * 500000
			} else if (cType == "7 chỗ") {
				money += diffDays * parseInt(cPrice) + diffDays * 550000
			} else {
				console.log("loi");
			}
		}
		let x = {
			fullName: name,
			phone: phone,
			carName: cName,
			carType: cType,
			carPrice: cPrice,
			rentDate: form2.rentDate.value,
			returnDate: form2.returnDate.value,
			day: diffDays,
			status: status,
			total: money
		}
		record.push(x);
		displayAll(record)

		//  Xe: la list record input vao
		xe.forEach(car => {

			// ???????????????????????????????????????
			if (car.carID == code) {
				car.status = 2;
				let cartd = document.getElementsByClassName(code);
				console.log(car.carID);
				cartd[0].innerHTML = "<td class=\"" + car.carID + "\">Đang được thuê</td>"
				cartd[1].outerHTML = "<td class=\"" + car.carID + "\"><button id=\"" + car.rowID + "\"class=\"fas fa-info-circle\"></button></td>"
			}
		})
	})

	//

	function displayAll(arr) {
		// set lai, con ko se bi add double
		result.innerHTML = "";
		for (let i = 0; i < arr.length; i++) {
			result.innerHTML += appendRent(arr[i], i)
		}
	}

	function displayXe(arr) {
		carTable.innerHTML = "";
		for (let i = 0; i < arr.length; i++) {
			carTable.innerHTML += appendRow(arr[i], i)
		}
		addEvent(arr);
	}

	searchCar.addEventListener("click", function (event) {
		event.preventDefault();
		let carType = $("#carType").val()
		let carStatus = $("#carStatus").val()
		console.log(carType);
		console.log(carStatus);
		let table = [];
		if (carType == 0) {
			if (carStatus == 0) {
				displayXe(xe)
			} else {
				table = xe.filter(checkCarStatus);
				displayXe(table);
			}
		} else if (carStatus == 0 && carType != 0) {
			table = xe.filter(checkCarType);
			displayXe(table);
		} else {
			table = xe.filter(checkCarType);
			table = table.filter(checkCarStatus);
			displayXe(table);
		}

	})

	function checkCarType(car) {
		return car.carType == $("#carType").val();
	}

	function checkCarStatus(car) {
		return car.carStatus == $("#carStatus").val();
	}

	function displayArr(arr) {
		carTable.innerHTML = "";
		for (let i = 0; i < arr.length; i++) {
			tBody.innerHTML += appendRow(arr[i], i + 1)
		}

	}

	function appendRent(object, number) {
		let html = "<tr><td>" + (number + 1) + "</td>"
			+ "<td>" + object.fullName + "</td>"
			+ "<td>" + object.phone + "</td>"
			+ "<td>" + object.carName + "</td>"
			+ "<td>" + object.carType + "</td>"
			+ "<td>" + object.carPrice + " VND </td>"
			+ "<td>" + object.rentDate + "</td>"
			+ "<td>" + object.returnDate + "</td>"
			+ "<td>" + object.day + "</td>"
			+ "<td>" + object.status + "</td>"
			+ "<td>" + object.total + "</td>"
		html += "<tr>";
		return html;
	}

	function appendRow(object, number) {
		let html = "<tr><td>" + number + "</td>"
			+ "<td>" + "<img src=\"" + object.carImage + "\"</td>"
			+ "<td>" + object.carName + "</td>"
			+ "<td>" + object.carType + "</td>"
			+ "<td>" + object.carPrice + " VNĐ </td>"
		if (object.carStatus == 1) {
			html += "<td class=\"" + object.carID + "\">Có sẵn</td>"
			html += "<td class=\"" + object.carID + "\"><button id=\"" + object.rowID + "\" class=\"fas fa-plug\"></button></td>"
		}
		if (object.carStatus == 2) {
			html += "<td class=\"" + object.carID + "\">Đang được thuê</td>"
			html += "<td class=\"" + object.carID + "\"><button id=\"" + object.rowID + "\"class=\"fas fa-info-circle\"></button></td>"
		}
		html += "<tr>";
		return html;
	}


	function addEvent(arr) {
		for (let i = 0; i < arr.length; i++) {
			let idButton = arr[i].rowID
			let status = arr[i].carStatus
			let carName = form2.carName
			let carType = form2.carType1
			let carPrice = form2.carPrice
			if (status == 1) {
				$("#" + idButton).click(function (event) {
					event.preventDefault();
					event.stopPropagation()
					carName.value = arr[i].carName
					carType.value = arr[i].carType + " chỗ"
					carPrice.value = arr[i].carPrice
					code = arr[i].carID;
				})
			} else if (status == 2) {
				$("#" + idButton).click(function (event) {
					event.preventDefault();
					event.stopPropagation()
					alert("Hãng xe :" + arr[i].carName + ", Loại xe: " + arr[i].carType + ", Giá xe/Ngày: " + arr[i].carPrice)
				})
			}
		}
	}

	function validateForm() {
		let check = [];
		//let flag = true;
		let carName = form2.carName;
		console.log(carName)
		let carType = form2.carType1;
		let carPrice = form2.carPrice;
		let fullNames = form2.fullName;
		let address = form2.address;
		let phonenumber = form2.phone;
		let rentDate = form2.rentDate;
		let returnDate = form2.returnDate;

		// validate date
		let hDate = new Date(form2.rentDate.value);
		let rDate = new Date(form2.returnDate.value);

		//  so sanh
		let diffTime = rDate.getTime() - hDate.getTime()

		//  quy ve ngay
		let diffDays = parseInt(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
		let diff = true
		if (diffDays <= 1) {
			alert("ngày trả xe phải lớn hơn ngày nhận xe 1 ngày");
			diff = false
		}
		check.push(diff);

		//  check rong thi se hien ra message
		check.push(checkObject(carName))
		check.push(checkObject(carType))
		check.push(checkObject(carPrice))
		check.push(checkPrice(carPrice));
		check.push(checkString(fullNames));
		check.push(checkPhone(phonenumber));
		check.push(checkString(address));
		check.push(checkDate(rentDate));
		check.push(checkDate(returnDate));
		// 		
		// thieu check validate cua check box
		// 		
		check.forEach(element => {

			if (element == false) {
				return false;
			}
		})
		return true;
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


	// Validate
	function checkDate(object) {
		let id = object.id + "E";
		if (object.value == "") {
			$("#" + id).attr("style", "display:block");
			return false;
		}
		let date = Date.parse(object.value);
		let today = Date.now();
		if (date < today) {
			$("#" + id).attr("style", "display:block");
			return false;
		}
		$("#" + id).attr("style", "display:none");
		return true;
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


	function checkPrice(object) {
		regex = /^[0-9]+$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value) && value != 0) {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}

	function checkPhone(object) {
		regex = /^[0-9]{9}$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value)) {
			$("#" + id).attr("style", "display:none");
			return true;
		}
		$("#" + id).attr("style", "display:block");
		return false;
	}

	// out ra message
	function checkObject(object) {

		// value cua ô input
		let value = object.value;
		let id = object.id + "E";
		if (value == "") {
			$("#" + id).attr("style", "display:block");
			return false;
		}
		$("#" + id).attr("style", "display:none");
		return true;
	}
})