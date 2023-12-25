$(document).ready(function x() {

    let form = document.forms[0];
    let form2 = document.forms[1];

    let fullName = form.fullName;

    let gender = form.gender;
    let birthDate = form.birthDate;
    let group = form.group;
    let classN = form.classN;
    let math = form.math;
    let physic = form.physic;
    let chemistry = form.chemistry;
    let saveBtn = form.saveBtn;
    let updateBtn = form.updateBtn;
    let result = document.getElementById("result");
    let searchBtn = document.getElementById("searchBtn");
    let index = 0;
    $(".error").hide();
    $("#updateBtn").hide();
    let listStudent = [
        { fullName: "Nguyen Thi Diem", gender: "Nu", birthDate: "1998-02-01", group: 12, classN: "12A", math: 10, physic: 10, chemistry: 10, diemTB: 10 },
        { fullName: "Nguyen Thi Diem", gender: "Nu", birthDate: "1998-02-12", group: 11, classN: "11B", math: 10, physic: 10, chemistry: 10, diemTB: 10 },
        { fullName: "Nguyen Thi Diem", gender: "Nu", birthDate: "1998-02-13", group: 10, classN: "10A", math: 10, physic: 10, chemistry: 10, diemTB: 10 },
        { fullName: "Nguyen Thi Diem", gender: "Nu", birthDate: "1998-02-14", group: 11, classN: "11A", math: 10, physic: 10, chemistry: 10, diemTB: 10 },
        { fullName: "Nguyen Thi Diem", gender: "Nu", birthDate: "1998-02-15", group: 10, classN: "10B", math: 10, physic: 10, chemistry: 10, diemTB: 10 },
        { fullName: "Nguyen Thi Hoa", gender: "Nu", birthDate: "1998-02-16", group: 12, classN: "12B", math: 10, physic: 10, chemistry: 10, diemTB: 10 }
    ]

    displayArr(listStudent);

    saveBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (validateForm() == true) {
            let tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value)) / 3
            let student = { fullName: fullName.value, gender: gender.value, birthDate: birthDate.value, group: group.value, classN: classN.value, math: math.value, physic: physic.value, chemistry: chemistry.value, diemTB: tb.toFixed(2) }
            listStudent.push(student);
            displayArr(listStudent)
        }
    })


    updateBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (validateForm() == true) {
            let tb = (parseFloat(math.value) + parseFloat(physic.value) + parseFloat(chemistry.value)) / 3
            var x = listStudent[index];
            x.fullName = fullName.value;
            x.gender = gender.value;
            x.birthDate = birthDate.value;
            x.group = group.value;
            x.classN = classN.value;
            x.math = math.value;
            x.physic = physic.value;
            x.chemistry = chemistry.value;
            x.diemTB = tb.toFixed(2);
            $("#ddddd").trigger("reset");
           // resetForm();
            displayArr(listStudent);
            $("#updateBtn").hide();
            $("#saveBtn").show();
        }

    })

    searchBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        event.preventDefault();
        var name = form2.search;
        var listSearch = [];
        var flag=false

        listStudent.forEach(element => {
            if (element.fullName.includes(name.value)) {
                listSearch.push(element)
            }
        });
        if (listSearch.length>0) {
            displayArr(listSearch)
        } else {
            alert("khong ton tai hoc sinh nao co ten: " + name.value)
        }
        // event.preventDefault();
        // event.stopPropagation();
        // var searchRS = [];
        // flag = false;
        // var searchName = form2.search;
        // console.log(searchName.value)
        // if (checkString(searchName) == false) {
        //     return;
        // }
        // listStudent.forEach(student => {
        //     if (student.fullName.includes(searchName.value)) {
        //         searchRS.push(student);
        //         flag = true;
        //     }
        // })

        // if (flag) {
        //     displayArr(searchRS);
        // } else {
        //     alert("Khong tim thay hoc sinh nao co ten: " + searchName.value);
        // }

    })

    function displayArr(array) {
        result.innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            console.log(array[i])
            result.innerHTML += appendRow(i, array[i]);
        }
        count(array)
        addEvent(array)
    }

    function appendRow(number, object) {
        let html = " <tr id=" + number + ">"
            + "<td>" + number + "</td>"
            + "<td>" + object.fullName + "</td>"
            + "<td>" + object.gender + "</td>"
            + "<td>" + object.birthDate + "</td>"
            + "<td>" + object.group + "</td>"
            + "<td>" + object.classN + "</td>"
            + "<td>" + object.math + "</td>"
            + "<td>" + object.physic + "</td>"
            + "<td>" + object.chemistry + "</td>"
            + "<td>" + object.diemTB + "</td>"
            + "<td><button class=\"btn editBtn btn-outline-danger\"></button><button class=\"btn deleteBtn btn-outline-info\"></button></td>"
            + "</tr>"
        return html;
    }


    function count(array) {
        let k12 = [];
        let k11 = [];
        let k10 = [];
        array.forEach(element => {
            if (element.group === 10) {
                k10.push(element);
            } else if (element.group === 11) {
                k11.push(element);
            } else if (element.group === 12) {
                k12.push(element);
            }
        });

        $("#khoi10").text(k10.length);
        $("#khoi11").text(k11.length);
        $("#khoi12").text(k12.length);
    }

    function addEvent(array) {
        var editBtn = document.getElementsByClassName("editBtn");
        var deleteBtn = document.getElementsByClassName("deleteBtn");
        for (let i = 0; i < array.length; i++) {
            deleteBtn[i].addEventListener("click", function (event) {
                event.stopPropagation();
                event.preventDefault();
                document.getElementById(i).outerHTML = "";

                // splice(start, deleteCount)
                array.splice(i, 1);
                displayArr(array)

            })
            editBtn[i].addEventListener("click", function (event) {
                event.stopPropagation();
                event.preventDefault();
                $("#saveBtn").hide();
                $("#updateBtn").show();
                var x = array[i];
                fullName.value = x.fullName;
                gender.value = x.gender;
                birthDate.value = x.birthDate;
                group.value = x.group;
                classN.value = x.classN;
                math.value = x.math;
                physic.value = x.physic;
                chemistry.value = x.chemistry;
                index = i;
            })
        }
    }

    function validateForm() {
        let flag = true;
        let check = [];
        check.push(checkString(fullName))
        check.push(checkObject(gender))
        check.push(checkDate(birthDate))
        check.push(checkObject(group))
        check.push(checkObject(classN))
        check.push(checkNumber(math))
        check.push(checkNumber(physic))
        check.push(checkNumber(chemistry))
        check.forEach(element => {
            if (element == false) {
                flag = false
            }
        });
        return flag

   }
    // function resetForm() {
    //     fullName.value = "";
    //     gender.value = "Nam";
    //     birthDate.value = "";
    //     group.value = 0;
    //     classN.value = 0;
    //     math.value = "";
    //     physic.value = "";
    //     chemistry.value = "";
    // }

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
})