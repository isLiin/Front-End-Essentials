$(document).ready(function(){
	const form = document.forms[0];
	const form2 = document.forms[1];
	const fullName = form.fullName;
	// console.log(fullName);
	const gender = form.gender;
	const birthDate = form.birthDate;
	const group = form.group;
	const classN = form.classN;
	const math = form.math;
	const physic = form.physic;
	const chemistry = form.chemistry;
	const saveBtn = form.saveBtn;
	const updateBtn = form.updateBtn;
 	const tBody = document.getElementById("tableBody")
	const search = document.getElementById("search");
	var listStudent = [
		{fullName:"Miku Ohashi",gender:"Nam",birthDate:"2023-03-02",group:"10",className:"10A",math:10,physic:8.5,chemistry:6,diemTB:8.17},
		{fullName:"Hoang Dung",gender:"Nu",birthDate:"2023-03-02",group:"11",className:"11A",math:7,physic:8.5,chemistry:6,diemTB:7.17},
		{fullName:"Hoang Thuy Linh",gender:"Nam",birthDate:"2023-03-02",group:"12",className:"12A",math:10,physic:8.5,chemistry:6,diemTB:8.17},
		{fullName:"Lexi Belle",gender:"Nam",birthDate:"2023-03-02",group:"11",className:"11A",math:10,physic:8.5,chemistry:9,diemTB:9.17},
		{fullName:"Eimi Fukuda",gender:"Nam",birthDate:"2023-03-02",group:"10",className:"10A",math:4.2,physic:8.5,chemistry:6,diemTB:6.23},
		{fullName:"Yui Hatano",gender:"Nam",birthDate:"2023-03-02",group:"11",className:"11A",math:3,physic:8.5,chemistry:6,diemTB:5.83},
		{fullName:"Maria Ozawa",gender:"Nam",birthDate:"2023-03-02",group:"12",className:"12A",math:10,physic:8.5,chemistry:1,diemTB:6.5},
		{fullName:"Mia Khalifa",gender:"Nam",birthDate:"2023-03-02",group:"10",className:"10A",math:6,physic:8.5,chemistry:6,diemTB:6.83},
		{fullName:"Nguyen Van Hung",gender:"Nam",birthDate:"2023-03-02",group:"12",className:"20A",math:4.5,physic:8.5,chemistry:6,diemTB:6.33},
	];
	var index = 0;

	displayArr(listStudent);
	$("#updateBtn").hide()
	
	saveBtn.addEventListener("click",function(event){
		event.preventDefault();
		if (validateForm() === true) {
			let tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value))/3; 
			let student = {fullName: fullName.value,gender: gender.value,birthDate:birthDate.value,group:group.value,className:classN.value,math:math.value,physic:physic.value,chemistry:chemistry.value,diemTB:tb.toFixed(2)}
			listStudent.push(student);
			console.log(student);
			displayArr(listStudent);
			addEvent(listStudent);
			resetForm();
		} else {
			return;
		}
	}) 


	function displayArr(arr){
		tBody.innerHTML = "";
		for(let i = 0; i<arr.length;i++) {
			tBody.innerHTML += appendRow(arr[i],i);
		}
		countNumber(arr);
		addEvent(arr);
	}

	function validateForm(){
		let check = [];
		let flag = true;
		check.push(checkString(fullName));
		check.push(checkDate(birthDate));
		check.push(checkOption(group));
		check.push(checkOption(classN));
		check.push(checkNumber(math));
		check.push(checkNumber(physic));
		check.push(checkNumber(chemistry));
		check.forEach(element => {
			console.log(element);
			if (element == false) {
				flag = false;
			}
		})
		return flag;
	}

	updateBtn.addEventListener("click",function(event){
		event.preventDefault();
		event.stopPropagation();
		if (validateForm() === true) {
			let tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value))/3; 
			let x = listStudent[index];
			x.fullName = fullName.value;
			x.gender = gender.value;
			x.birthDate =birthDate.value;
			x.group =group.value;
			x.className = classN.value;
			x.math = math.value;
			x.physic = physic.value;
			x.chemistry = chemistry.value;
			x.diemTB = tb.toFixed(2);
			resetForm();
			displayArr(listStudent);
			$("#updateBtn").hide();
			$("#saveBtn").show();
		} else {
			return;
		}
		
	})

	search.addEventListener("click",function(event) {
		event.preventDefault();
		event.stopPropagation();
		let searhRS = [];
		flag = false;
 		let searchName = form2.searchName;
		console.log(searchName);
		if (checkString(searchName) == false) {
			return;
		}
		listStudent.forEach(student => {
			if (student.fullName.includes(searchName.value)) {
				searhRS.push(student);
				flag = true;
			}
		})
		if (flag) {
			displayArr(searhRS);
		} else {
			alert("Không tìm thấy học sinh nào có tên " + searchName.value);
		}
	})

	function addEvent(arr){
		let editBtn = document.getElementsByClassName("editBtn");
		let deleteBtn = document.getElementsByClassName("deleteBtn");

		console.log(deleteBtn);

		for (let i = 0 ; i<editBtn.length;i++) {
			deleteBtn[i].addEventListener("click",function(event){
				event.stopPropagation();
				// document.getElementById(i).outerHTML ="";
				arr.splice(i,1);
				displayArr(arr);
			})
			editBtn[i].addEventListener("click",function(event) {
				let x = arr[i];
				event.stopPropagation();
				$("#updateBtn").show();
				$("#saveBtn").hide();
				console.log(x);
				fullName.value = x.fullName;
				gender.value = x.gender;
				birthDate.value = x.birthDate;
				group.value = x.group;
				classN.value = x.className;
				math.value= x.math;
				physic.value= x.physic;
				chemistry.value= x.chemistry;
				index = i;
			})
		}
	}

	function countNumber(arr) {
		let k10 = [];
		let k11 = [];
		let k12 = [];
		arr.forEach(element => {
			if (element.group == 10) {
				k10.push(element);
			} else if (element.group == 11) {
				k11.push(element)
			} else if (element.group == 12) {
				k12.push(element);
			}
		})
		$("#khoi10").text(k10.length);
		$("#khoi11").text(k11.length);
		$("#khoi12").text(k12.length);
	}


	function resetForm(){
		fullName.value ="";
		gender.value = "Nam"
		birthDate.value ="";
		group.value = 0;
		classN.value = 0;
		math.value="";
		physic.value="";
		chemistry.value=""
	}

	function appendRow(object,number){
		let html = "<tr id="+number+">"
		+"<td>"+number+"</td>"
		+"<td>"+ object.fullName+ "</td>"
		+"<td>"+ object.gender+ "</td>"
		+"<td>"+ object.birthDate+ "</td>"
		+"<td>"+ object.group+ "</td>"
		+"<td>"+ object.className+ "</td>"
		+"<td>"+ object.math+ "</td>"
		+"<td>"+ object.physic+ "</td>"
		+"<td>"+ object.chemistry+ "</td>"
		+"<td>"+ object.diemTB+ "</td>"
		+"<td><button class=\"editBtn btn btn-outline-warning far fa-edit\"></button><button class=\"deleteBtn btn btn-outline-danger far fa-trash-alt\"></button></td>"
		+"</tr>";
		return html;
	}


	group.addEventListener("change",function(event){
		let khoi = group.value;
		if (khoi == 0) {
			$.each($(".group10"),function(){
				$(this).show();
			})
			$.each($(".group11"),function(){
				$(this).show();
			})
			$.each($(".group12"),function(){
				$(this).show();
			})
		}
		if (khoi == 10) {
			$.each($(".group10"),function(){
				$(this).show();
			})
			$.each($(".group11"),function(){
				$(this).hide();
			})
			$.each($(".group12"),function(){
				$(this).hide();
			})
		} else if (khoi == 11) {
			$.each($(".group10"),function(){
				$(this).hide();
			})
			$.each($(".group11"),function(){
				$(this).show();
			})
			$.each($(".group12"),function(){
				$(this).hide();
			})
		} else if (khoi == 12) {
			$.each($(".group10"),function(){
				$(this).hide();
			})
			$.each($(".group11"),function(){
				$(this).hide();
			})
			$.each($(".group12"),function(){
				$(this).show();
			})
		}
	})

	function checkString(object) {
		let regex = /^[a-zA-Z\s]+$/;
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
		regex = /^[0-9]+.?[0-9]{0,2}$/
		let value = object.value;
		let id = object.id + "E";
		if (regex.test(value) && value >= 0 && value <=10) {
			$("#" + id).attr("style","display:none");
			return true;
		}
		$("#" + id).attr("style","display:block");
		return false;
	}

	function checkOption(object) {
		let value = object.value;
		let id = object.id + "E";
		if (value == 0) {
			$("#" + id).attr("style","display:block");
			return false;
		}
		$("#" + id).attr("style","display:none");
			return true;
	}

	function checkDate(object){
		let id = object.id + "E";
		if (object.value == "") {
			$("#" + id).attr("style","display:block");
			return false;
		}
		let date = Date.parse(object.value);
		let today = Date.now();
		if ( date > today) {
			$("#" + id).attr("style","display:block");
			return false;
		}
		$("#" + id).attr("style","display:none");
			return true;
	}


})