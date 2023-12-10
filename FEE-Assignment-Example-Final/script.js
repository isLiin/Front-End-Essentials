'use strict';

// Create list Students
let listStudents = [];

// Create object student
const objStudent = {
    name: "",
    gender: "",
    dob: "",
    grade: "",
    class: "",
    math: 0,
    physics: 0,
    chemistry: 0,
    sum: function () {
        return ((parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.chemistry)) / 3).toFixed(2);
    }
}

/**
 * Show data
 */
const showData = () => {

    const container = $("#container-data");
    // clear: xoa du lieu
    container.html("");

    // append: them du lieu vao table
    listStudents.map((student, index) => {
        console.log(student);
        container.append(`<tr class="row">
                                <td class="col">${index}</td>
                                <td class="col">${student.name}</td>
                                <td class="col">${student.gender}</td>
                                <td class="col">${student.dob}</td>
                                <td class="col">${student.grade}</td>
                                <td class="col">${student.class}</td>
                                <td class="col">${student.math}</td>
                                <td class="col">${student.physics}</td>
                                <td class="col">${student.chemistry}</td>
                                <td class="col">${student.sum()}</td>
                                <td class="col">
                                    <button class="btn btn-outline-warning">
                                        <i class="far fa-edit"></i>
                                    </button>
                                    <button class="btn btn-outline-danger">
                                        <i class="far fa-trash-alt"></i>
                                    </button>
                                </td>
                            </tr>
                        `);
    })
};


/**
 * Updates the class options based on the selected grade.
 *
 * @param {string} grade - The selected grade.
 */
function updateClass(grade) {
    const container = $("#student__class");

    switch (grade) {
        case "10":
            container.html("");
            container.append(`<option value="10a">10a</option>`);
            container.append(`<option value="10b">10b</option>`);
            break;
        case "11":
            container.html("");
            container.append(`<option value="11a">11a</option>`)
            container.append(`<option value="11b">11b</option>`)
            break;
        case "12":
            container.html("");
            container.append(`<option value="12a">12a</option>`);
            container.append(`<option value="12b">12b</option>`);
            break;
        default:
            container.html("");
            container.append(`<option value="0">chọn khối ...</option>`);
            break;
    }
}

/**
 * Clears the form fields 
 * */
function cleanForm() {
    objStudent.name = $("#student__name").val("");
    objStudent.gender = $("#gender__male").prop("checked", true);
    objStudent.dob = $("#student__dob").val("");
    objStudent.grade = $("#student__grade").html(`
                                    <option value="0">chọn khối ...</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>`);
    objStudent.class = $("#student__class").html(`<option value="0">Chọn lớp học ...</option>`);
    objStudent.math = $("#point-math").val("");
    objStudent.physics = $("#point-physics").val("");
    objStudent.chemistry = $("#point-chemistry").val("");
    $("#student__name").focus();
}

$(document).ready(function () {
    console.log("ready!");

    // Change grade
    $("#student__grade").on("change", function () {
        const grade = $("#student__grade").val();
        updateClass(grade);
    })


    $("#btn-submit").click(function () {
        objStudent.name = $("#student__name").val();
        objStudent.gender = $("input[name=gender]:checked").val();
        objStudent.dob = $("#student__dob").val();
        objStudent.grade = $("#student__grade").val();
        objStudent.class = $("#student__class").val();
        objStudent.math = $("#point-math").val();
        objStudent.physics = $("#point-physics").val();
        objStudent.chemistry = $("#point-chemistry").val();

        // Validate
        $("#name-alert").addClass("d-none");
        if (!validateName(objStudent.name)) {
            $("#name-alert").removeClass("d-none");
            $("#name-alert").html("Tên học sinh phải bao gồm chuỗi và khoảng trắng!");
            return;
        }

        $("#dob-alert").addClass("d-none");
        if (!validateDateOfBirth(objStudent.dob)) {
            $("#dob-alert").removeClass("d-none");
            $("#dob-alert").html("Ngày sinh cua học sinh phải nhỏ hơn ngày hien tai!");
            return;
        }

        $("#grade-alert").addClass("d-none");
        if (validateSelectedOption(objStudent.grade)) {
            $("#grade-alert").removeClass("d-none");
            $("#grade-alert").html("Chọn Khối lớp học!");
            return;
        }

        $("#class-alert").addClass("d-none");
        if (validateSelectedOption(objStudent.class)) {
            $("#class-alert").removeClass("d-none");
            $("#class-alert").html("Chọn lớp học!");
            return;
        }

        $("#math-alert").addClass("d-none");
        if (!validateSubjectScore(objStudent.math)) {
            $("#math-alert").removeClass("d-none");
            $("#math-alert").html("Điem môn toan phải nhỏ hơn hoặc bằng 10!");
            return;
        }

        $("#physics-alert").addClass("d-none");
        if (!validateSubjectScore(objStudent.chemistry)) {
            $("#chemistry-alert").removeClass("d-none");
            $("#chemistry-alert").html("Điem môn sinh phải nhỏ hơn hoặc bằng 10!");
            return;
        }

        $("#chemistry-alert").addClass("d-none");
        if (!validateSubjectScore(objStudent.physics)) {
            $("#physics-alert").removeClass("d-none");
            $("#physics-alert").html("Điem môn hoa phải nhỏ hơn hoặc bằng 10!");
            return;
        }


        // add data to list
        listStudents.push(objStudent);
        // add data to table
        showData();
        cleanForm();
    })
});