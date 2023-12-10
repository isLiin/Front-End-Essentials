'use strict';

// Application static
$(document).ready(function () {
    console.log("ready!");

    $("#student__name").val("liin");
    $("#point-math").val(10);
    $("#point-physics").val(9);
    $("#point-chemistry").val(9);

    // Change grade
    $("#student__grade").on("change", changeStudentGrade)
    // Submit form
    $("#btn-submit").on("click", submitForm);
    // Edit student
    $("#btn-edit").on("click", () => editStudent);
    // Delete student
    $("#btn-delete").on("click", () => deleteStudent);
    // Search student
    $("#btn-search").on("click", searchStudent);
});

// Create list Students
const listStudents = new Array();

/**
 * Show data
 */
const showData = (listStudents) => {

    const container = $("#container-data");
    // clear: xoa du lieu
    container.html("");
    // append: them du lieu vao table
    listStudents.forEach((student, index) => {
        container.append(`<tr class="row">
                                <td class="col">${index}</td>
                                <td class="col items-name">${student.name}</td>
                                <td class="col items-gender">${student.gender}</td>
                                <td class="col items-dob">${student.dob}</td>
                                <td class="col items-grade">${student.grade}</td>
                                <td class="col items-class">${student.class}</td>
                                <td class="col items-math">${student.math}</td>
                                <td class="col items-physics">${student.physics}</td>
                                <td class="col items-chemistry">${student.chemistry}</td>
                                <td class="col items-sum">${student.sum()}</td>
                                <td class="col">
                                    <button onClick="editStudent(${index})" class="btn btn-outline-warning">
                                        <i class="far fa-edit"></i>
                                    </button>
                                    <button onClick="deleteStudent(${index})" class="btn btn-outline-danger">
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
            container.append(`<option value="10A">10A</option>`);
            container.append(`<option value="10B">10B</option>`);
            break;
        case "11":
            container.html("");
            container.append(`<option value="11A">11A</option>`)
            container.append(`<option value="11B">11B</option>`)
            break;
        case "12":
            container.html("");
            container.append(`<option value="12A">12A</option>`);
            container.append(`<option value="12B">12B</option>`);
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
    Student.name = $("#student__name").val("");
    Student.gender = $("#gender__male").prop("checked", true);
    Student.dob = $("#student__dob").val("");
    Student.grade = $("#student__grade").html(`
                                    <option value="0">chọn khối ...</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>`);
    Student.class = $("#student__class").html(`<option value="0">Chọn lớp học ...</option>`);
    Student.math = $("#point-math").val("");
    Student.physics = $("#point-physics").val("");
    Student.chemistry = $("#point-chemistry").val("");
    $("#student__name").focus();
}

/**
 * Submits the form and performs various validations before adding the student data to the list and table.
 *
 * @return {undefined} No return value.
 */
function submitForm() {
    // Create new Student
    let std_name = $("#student__name").val();
    let std_gender = $("input[name=gender]:checked").val();
    let std_dob = $("#student__dob").val();
    let std_grade = $("#student__grade").val();
    let std_class = $("#student__class").val();
    let std_math = $("#point-math").val();
    let std_physics = $("#point-physics").val();
    let std_chemistry = $("#point-chemistry").val();

    // Validate
    $("#name-alert").addClass("d-none");
    if (!validateName(std_name)) {
        $("#name-alert").removeClass("d-none");
        $("#name-alert").html("Tên học sinh phải bao gồm chuỗi và khoảng trắng!");
        $("#name-alert").focus();
        return;
    }

    $("#dob-alert").addClass("d-none");
    if (!validateDateOfBirth(std_dob)) {
        $("#dob-alert").removeClass("d-none");
        $("#dob-alert").html("Ngày sinh cua học sinh phải nhỏ hơn ngày hien tai!");
        $("#dob-alert").focus();
        return;
    }

    $("#grade-alert").addClass("d-none");
    if (validateSelectedOption(std_grade)) {
        $("#grade-alert").removeClass("d-none");
        $("#grade-alert").html("Chọn Khối lớp học!");
        $("#grade-alert").focus();
        return;
    }

    $("#class-alert").addClass("d-none");
    if (validateSelectedOption(std_class)) {
        $("#class-alert").removeClass("d-none");
        $("#class-alert").html("Chọn lớp học!");
        $("#class-alert").focus();
        return;
    }

    $("#math-alert").addClass("d-none");
    if (!validateSubjectScore(std_math)) {
        $("#math-alert").removeClass("d-none");
        $("#math-alert").html("Điem môn toan phải nhỏ hơn hoặc bằng 10!");
        $("#math-alert").focus();
        return;
    }

    $("#physics-alert").addClass("d-none");
    if (!validateSubjectScore(std_physics)) {
        $("#physics-alert").removeClass("d-none");
        $("#physics-alert").html("Điem môn ly phải nhỏ hơn hoặc bằng 10!");
        $("#physics-alert").focus();
        return;
    }

    $("#chemistry-alert").addClass("d-none");
    if (!validateSubjectScore(std_chemistry)) {
        $("#chemistry-alert").removeClass("d-none");
        $("#chemistry-alert").html("Điem môn hoa phải nhỏ hơn hoặc bằng 10!");
        $("#chemistry-alert").focus();
        return;
    }


    // add data to list
    listStudents.push({
        name: std_name,
        gender: std_gender,
        dob: std_dob,
        grade: std_grade,
        class: std_class,
        math: std_math,
        physics: std_physics,
        chemistry: std_chemistry,
        sum: function () {
            return ((parseFloat(this.math) + parseFloat(this.physics) + parseFloat(this.chemistry)) / 3).toFixed(2);
        }
    });

    // add data to table
    showData(listStudents);
    cleanForm();
}

function changeStudentGrade() {
    const grade = $("#student__grade").val();
    updateClass(grade);
}

function editStudent(index) {
    alert("edit")

    let items_name = $(".items-name").html();
    let items_gender = $(".items-gender").html();
    let items_dob = $(".items-dob").html();
    let items_grade = $(".items-grade").html();
    let items_class = $(".items-class").html();
    let items_math = $(".items-math").html();
    let items_physics = $(".items-physics").html();
    let items_chemistry = $(".items-chemistry").html();


    $("#student__name").html(items_name);
    $("#student__dob").html(items_dob);
    $("#student__grade").html(items_grade);
    $("#student__class").html(items_class);
    $("#point-math").html(items_math);
    $("#point-physics").html(items_physics);
    $("#point-chemistry").html(items_chemistry);
    listStudents.splice(index, 1);
}

function deleteStudent() {
    alert("delete")
    // listStudents.splice(this, 1);
    // showData();
}

function searchStudent() {
    let search = $("#showing__search").val();
    let result = [];

    for (let i = 0; i < listStudents.length; i++) {
        if (listStudents[i].name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            result.push(listStudents[i]);
        }
    }

    showData(result);
}