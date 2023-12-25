$(document).ready(function(){
	const form = document.forms[0];
	const fullName = form.fullName;
	const cccd = form.cccd;
	const billDate = form.billDate;
	const address = form.address;
	const note = form.note;
	const createBill = document.getElementById("createBill")
	const editInfo = form.editInfo;
	const addInfo = form.addInfo; 
	const table = document.getElementById("billTable");
	const rTable = document.getElementById("resultTable")
	const submit = document.getElementById("submitButton")
	var rowNumber = 2;
	var count = 2;
	var countTable = 0;

	var form2 = document.getElementsByClassName("form2")
	var input2 = document.getElementsByClassName("input2")

	createEvent("tbrow2","btn2");

	for (let i = 0; i<form2.length;i++){
		form2[i].disabled = true;
	}

	createBill.addEventListener("click", function(event){
		event.preventDefault();
		event.stopPropagation();
		let checkFullName = checkString(fullName);
		let checkCC = checkCCCD(cccd);
		let checkAddress = checkString(address);
		let checkNote = checkString(note);
		let checkBillDate = checkDate(billDate);
		if (checkAddress && checkBillDate && checkCC && checkFullName && checkNote) {
			for (let i = 0; i<form2.length;i++){
				form2[i].disabled = false;
			}
			fullName.disabled = true;
			cccd.disabled = true;
			address.disabled=true;
			note.disabled = true;
			billDate.disabled = true;
			createBill.disabled = true;
		}
	})

	editInfo.addEventListener("click",function(event){
		event.preventDefault();
		event.stopPropagation();
		for (let i = 0; i<input2.length;i++) {
			input2[i].value = "";
		}
		for (let i = 0; i<form2.length;i++){
			form2[i].disabled = true;
		}
		fullName.disabled = false;
		cccd.disabled = false;
		address.disabled=false;
		note.disabled = false;
		billDate.disabled = false;
		createBill.disabled = false;
	})

	addInfo.addEventListener("click",function(event){
		event.preventDefault();
		event.stopPropagation();
		rowNumber ++;
		count ++;
		let rowID = "tbrow" + rowNumber;
		let btnID = "btn" + rowNumber;
		let tr = document.createElement("tr");
		tr.id = rowID;
		let td1 = document.createElement("td");
		td1.innerText = rowNumber;
		let td2 = document.createElement("td");
		let td3 = document.createElement("td");
		let td4 = document.createElement("td");
		let td5 = document.createElement("td");
		let input1 = document.createElement("input");
		input1.setAttribute("type","text");
		input1.setAttribute("name","hangHoa"+rowNumber)
		input1.id ="hangHoa" + rowNumber;
		input1.className ="form2 input2 hhname form-control col-12";
		let input2 = document.createElement("input");
		input2.setAttribute("type","number");
		input2.setAttribute("name","soLuong"+rowNumber)
		input2.id ="soLuong" + rowNumber ;
		input2.className = "form2 input2 number form-control col-12";
		let input3 = document.createElement("input");
		input3.setAttribute("name","donGia"+rowNumber)
		input3.id ="donGia" + rowNumber;
		input3.setAttribute("type","number");
		input3.className ="form2 input2 number form-control col-12"
		let small1 = document.createElement("small");
		small1.id = "hangHoa"+rowNumber+"E";
		small1.className = "errorText"
		small1.innerText = "Yêu cầu nhập tên hàng hóa"
		let small2 = document.createElement("small");
		small2.id = "soLuong"+rowNumber+"E";
		small2.className = "errorText"
		small2.innerText = "Số lượng không hợp lệ"
		let small3 = document.createElement("small");
		small3.id = "donGia"+rowNumber+"E";
		small3.className = "errorText"
		small3.innerText = "Đơn giá không hợp lệ"
		td2.appendChild(input1);
		td3.appendChild(input2);
		td4.appendChild(input3);
		td2.appendChild(small1);
		td3.appendChild(small2);
		td4.appendChild(small3);
		let btn = document.createElement("button")
		btn.className = "fa fa-trash";
		btn.id = btnID;
		td5.appendChild(btn);
		tr.appendChild(td1);
		tr.appendChild(td2);
		tr.appendChild(td3);
		tr.appendChild(td4);
		tr.appendChild(td5);
		table.appendChild(tr);
		createEvent(rowID,btnID);
	})

	submit.addEventListener("click",function(event){
		event.stopPropagation();
		let flag = true;
		$.each($(".input2"), function(){
			if (!checkString(this)) {
				flag = false;
			}
		})
		$.each($(".number"), function(){
			if (!checkNumber(this)) {
				flag = false;
			}
		})
	
		if (!flag) {
			return;
		}
		console.log(flag);
		let hhName = document.getElementsByClassName("hhname");
		let hhnumber = document.getElementsByClassName("number");
		countTable++;
		for (let i = 0; i<form2.length;i++){
			form2[i].disabled = true;
		}
		fullName.disabled = false;
		cccd.disabled = false;
		address.disabled=false;
		note.disabled = false;
		billDate.disabled = false;
		createBill.disabled = false;
		let idRow = "kqRow" + countTable;
		let idTongTien = "tongTien" + countTable;
		let idXoa = "kqXoa" + countTable;
		let tongTien = 0;
		html = "<tr class=\"" + idRow + "\">"
		let addNo = "<td rowspan=\""+ count + "\">" + countTable + "</td>"
		let addName = "<td rowspan=\""+ count + "\">" + fullName.value + "</td>"
		let addCMND = "<td rowspan=\""+ count + "\">" + cccd.value + "</td>"
		let addDate = "<td rowspan=\""+ count + "\">" + billDate.value + "</td>"
		let addHHName = "<td>" + hhName[0].value + "</td>"
		let addSoLuong = "<td class=\"soLuong\">" + hhnumber[0].value + "</td>"
		let addDonGia = "<td>" + hhnumber[1].value + "</td>"
		let addThanhTien = "<td>" + hhnumber[1].value*hhnumber[0].value + "</td>"
		tongTien += hhnumber[1].value*hhnumber[0].value;
		let addTongTien = "<td class=\"thanhTien\" rowspan=\""+ count + "\" id=\""+ idTongTien + "\"></td>"
		let addXoa = "<td rowspan=\""+ count + "\"><button class=\"fa fa-trash nutXoa\" id = \"" + idXoa + "\"></button></td>"
		html += addNo+addName+addCMND+addDate+addHHName+addSoLuong+addDonGia+addThanhTien+addTongTien+addXoa;
		for (let i = 1; i< count;i++) {
			let addHHName1 = "<td>" + hhName[i].value + "</td>"
			let addSoLuong1 = "<td class=\"soLuong\">" + hhnumber[i*2].value + "</td>"
			let addDonGia1 = "<td>" + hhnumber[i*2+1].value + "</td>"
			let addThanhTien1 = "<td>" + hhnumber[i*2].value*hhnumber[i*2+1].value + "</td>"
			tongTien += hhnumber[i*2].value*hhnumber[i*2+1].value;
			html += "<tr class=\""+idRow+"\">" + addHHName1 + addSoLuong1 + addDonGia1 + addThanhTien1 + "</tr>";
		}
		rTable.innerHTML += html + "</tr>";
		addKetQua(idTongTien,tongTien);
		calculate()
		$("#tfoot").attr("style","display:block")
		resetForm();
		
	})

	function addKetQua(idTongTien,tongTien){
		$("#"+idTongTien).text(tongTien);
		let x = document.getElementsByClassName("nutXoa");
		for(let i = 0; i<x.length;i++) {
			x[i].addEventListener("click",function(event) {
				let idRow = "kqRow";
				event.preventDefault();
				let y = i+1;
				idRow += y;
				console.log(idRow);
				$.each($("."+idRow),function(){
					$(this).remove()
					calculate();
				})
			})
		}
	}

	function calculate(){
		let x = 0;
		let y = 0;
		$.each($(".soLuong"),function(){
			x+= parseInt($(this).text());
		})
		$.each($(".thanhTien"),function(){
			y+= parseInt($(this).text());
		})
		$("#quantity").text(x);
		$("#totalCost").text(y);
	}

	function createEvent(rowID,btnID){
		let row = document.getElementById(rowID);
		let btn = document.getElementById(btnID);
		btn.addEventListener("click",function(event){
			event.preventDefault();
			event.stopPropagation();
			row.innerHTML=""
			count--;
		})
	}
	
	function resetForm(){
		let reset = document.getElementsByTagName("input");
		for (let i = 0; i<reset.length;i++) {
			reset[i].value = "";
		}
	}

	function checkString(object) {
		let regex = /^[a-zA-Z0-9\s]+$/;
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value)) {
			$("#" + id).attr("style","display:none");
			return true;
		}
		$("#" + id).attr("style","display:block");
		return false;
	}

	function checkCCCD(object) {
		regex = /^[0-9]{9}$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value)) {
			$("#" + id).attr("style","display:none");
			return true;
		}
		$("#" + id).attr("style","display:block");
		return false;
	}

	function checkNumber(object) {
		regex = /^[0-9]+$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value) && value > 0) {
			$("#" + id).attr("style","display:none");
			return true;
		}
		$("#" + id).attr("style","display:block");
		return false;
	}

	function checkDate(object){
		let date = Date.parse(object.value);
		console.log(date);
		let today = Date.now();
		console.log(today);
		let id = object.id + "E";
		if ( date > today) {
			$("#" + id).attr("style","display:block");
			return false;
		}
		$("#" + id).attr("style","display:none");
			return true;
	}

})