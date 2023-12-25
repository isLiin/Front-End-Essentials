$(document).ready(function x() {
    var form = document.forms[0];
    var form2 = document.forms[1];
    var fullName = form.fullName;
    var gender = form.gender;
    var birthDate = form.birthDate;
    var group = form.group;
    var classN = form.classN;
    var math = form.math;
    var physic = form.physic;
    var chemistry = form.chemistry;
    var saveBtn = form.saveBtn;
    var updateBtn = form.updateBtn;
    var tBody = document.getElementById("tableBody");
    var search = document.getElementById("search");
    var index = 0;


    var listStudent = [
        { fullName: "Miku Ohashi", gender: "Nam", birthDate: "2023-03-02", group: "10", className: "10A", math: 10, physic: 8.5, chemistry: 6, diemTB: 8.17 },
        { fullName: "Hoang Dung", gender: "Nu", birthDate: "2023-03-02", group: "11", className: "11A", math: 7, physic: 8.5, chemistry: 6, diemTB: 7.17 },
        { fullName: "Hoang Thuy Linh", gender: "Nam", birthDate: "2023-03-02", group: "12", className: "12A", math: 10, physic: 8.5, chemistry: 6, diemTB: 8.17 },
        { fullName: "Lexi Belle", gender: "Nam", birthDate: "2023-03-02", group: "11", className: "11A", math: 10, physic: 8.5, chemistry: 9, diemTB: 9.17 },
        { fullName: "Eimi Fukuda", gender: "Nam", birthDate: "2023-03-02", group: "10", className: "10A", math: 4.2, physic: 8.5, chemistry: 6, diemTB: 6.23 },
        { fullName: "Yui Hatano", gender: "Nam", birthDate: "2023-03-02", group: "11", className: "11A", math: 3, physic: 8.5, chemistry: 6, diemTB: 5.83 },
        { fullName: "Maria Ozawa", gender: "Nam", birthDate: "2023-03-02", group: "12", className: "12A", math: 10, physic: 8.5, chemistry: 1, diemTB: 6.5 },
        { fullName: "Mia Khalifa", gender: "Nam", birthDate: "2023-03-02", group: "10", className: "10A", math: 6, physic: 8.5, chemistry: 6, diemTB: 6.83 },
        { fullName: "Nguyen Van Hung", gender: "Nam", birthDate: "2023-03-02", group: "12", className: "20A", math: 4.5, physic: 8.5, chemistry: 6, diemTB: 6.33 },
    ];

    displayArr(listStudent);
    $("#updateBtn").hide();
    $(".error").hide();

    saveBtn.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateForm() == true) {
            var tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value)) / 3;
            var student = { fullName: fullName.value, gender: gender.value, birthDate: birthDate.value, group: group.value, className: classN.value, math: math.value, physic: physic.value, chemistry: chemistry.value, diemTB: tb.toFixed(2) };
            listStudent.push(student);
            displayArr(listStudent);
            addEvent(listStudent);
            resetForm();
        }
    })

    updateBtn.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (validateForm() == true) {
            var tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value)) / 3;
            var x = listStudent[index];
            x.fullName = fullName.value;
            x.gender = gender.value;
            x.birthDate = birthDate.value;
            x.group = group.value;
            x.className = classN.value;
            x.math = math.value;
            x.physic = physic.value;
            x.chemistry = chemistry.value;
            x.diemTB = tb.toFixed(2);
            resetForm();
            displayArr(listStudent);
            $("#updateBtn").hide();
            $("#saveBtn").show();
            $(".error").hide();
        }
    })

    search.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        var searchRS = [];
        flag = false;
        var searchName = form2.searchName;
        if (checkString(searchName) == false) {
            return;
        }
        listStudent.forEach(student => {
            if (student.fullName.includes(searchName.value)) {
                searchRS.push(student);
                flag = true;
            }
        })

        if (flag) {
            displayArr(searchRS);
        } else {
            alert("Khong tim thay hoc sinh nao co ten: " + searchName.value);
        }


    })



    function displayArr(arr) {
        tBody.innerHTML = "";
        for (let i = 0; i < arr.length; i++) {
            tBody.innerHTML += appendRow((i), arr[i]);
        }
        countNumber(arr);
        addEvent(arr);
    }

    function appendRow(number, object) {
        let html = "<tr id=" + number + ">"
            + "<td>" + number + "</td>"
            + "<td>" + object.fullName + "</td>"
            + "<td>" + object.gender + "</td>"
            + "<td>" + object.birthDate + "</td>"
            + "<td>" + object.group + "</td>"
            + "<td>" + object.className + "</td>"
            + "<td>" + object.math + "</td>"
            + "<td>" + object.physic + "</td>"
            + "<td>" + object.chemistry + "</td>"
            + "<td>" + object.diemTB + "</td>"
            + "<td><button class=\"editBtn btn btn-outline-warning\"></button><button class=\"deleteBtn btn btn-outline-danger\"></button></td>" + "</td>"
            // + "<td><button class=\"editBtn btn btn-outline-warning far fa-edit\"></button><button class=\"deleteBtn btn btn-outline-danger far fa-trash-alt\"></button></td>"
            + "</tr>"
        return html;
    }

    function countNumber(arr) {
        var k10 = [];
        var k11 = [];
        var k12 = [];
        arr.forEach(element => {
            if (element.group == 10) {
                k10.push(element);
            } else if (element.group == 11) {
                k11.push(element);
            } else if (element.group == 12) {
                k12.push(element);
            }
        });
        $("#khoi10").text(k10.length);
        $("#khoi11").text(k11.length);
        $("#khoi12").text(k12.length);
    }

    function addEvent(arr) {
        var editBtn = document.getElementsByClassName("editBtn");
        var deleteBtn = document.getElementsByClassName("deleteBtn");
        for (let i = 0; i < editBtn.length; i++) {
            deleteBtn[i].addEventListener("click", function (event) {
                event.stopPropagation();
                // tra ve chuoi html co id = i
                document.getElementById(i).outerHTML = "";
                // Xoa phan tu trong mang
                arr.splice(i, 1);
                displayArr(arr)
            })
            editBtn[i].addEventListener("click", function (event) {
                var x = arr[i];
                event.stopPropagation;
                $("#updateBtn").show();
                $("#saveBtn").hide();
                fullName.value = x.fullName;
                gender.value = x.gender;
                birthDate.value = x.birthDate;
                group.value = x.group;
                classN.value = x.className;
                math.value = x.math;
                physic.value = x.physic;
                chemistry.value = x.chemistry;
                // tra ve index de luc click updateBtn thi biet update vao index nao
                index = i;
            }
            )
        }
    }

    function validateForm() {
        var check = [];
        var flag = true;
        check.push(checkString(fullName));
        check.push(checkDate(birthDate));
        check.push(checkObject(group));
        check.push(checkObject(classN));
        check.push(checkNumber(math));
        check.push(checkNumber(physic));
        check.push(checkNumber(chemistry));
        check.forEach(element => {
            if (element == false) {
                flag = false;
            }
        });
        return flag;
    }

    function resetForm() {
        fullName.value = "";
        gender.value = "Nam"
        birthDate.value = "";
        group.value = 0;
        classN.value = 0;
        math.value = "";
        physic.value = "";
        chemistry.value = ""
    }

    function checkString(object) {
        let regex = /^[a-zA-Z\s]+$/;
        let value = object.value;
        let id = object.id + "E";
        if (regex.test(value)) {
            $("#" + id).attr("style", "display:none");
            return true;
        }
        $("#" + id).attr("style", "display:block");
        return false;
    }


    function checkNumber(object) {
        regex = /^[0-9]+.?[0-9]{0,2}$/
        let value = object.value;
        let id = object.id + "E";
        if (regex.test(value) && value >= 0 && value <= 10) {
            $("#" + id).attr("style", "display:none");
            return true;
        }
        $("#" + id).attr("style", "display:block");
        return false;
    }

    function checkObject(object) {
        let value = object.value;
        let id = object.id + "E";
        if (value == 0) {
            $("#" + id).attr("style", "display:block");
            return false;
        }
        $("#" + id).attr("style", "display:none");
        return true;
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

});