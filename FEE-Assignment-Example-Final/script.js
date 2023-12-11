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

    // count
    let count_10 = 0;
    let count_11 = 0;
    let count_12 = 0;

    // append: them du lieu vao table
    listStudents.forEach((student, index) => {

        switch (student.grade) {
            case "10":
                count_10++;
                break;
            case "11":
                count_11++;
                break;
            case "12":
                count_12++;
                break;
        }

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

    // Show total number of students
    $(".count-10").html("Grade 10: " + count_10);
    $(".count-11").html("Grade 11: " + count_11);
    $(".count-12").html("Grade 12: " + count_12);
    $(".count-total").html("Grade total: " + listStudents.length);
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
    $("#student__name").val("");
    $("#gender__male").prop("checked", true);
    $("#student__dob").val("");
    $("#student__grade").html(`
                <option value="0">chọn khối ...</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>`);
    $("#student__class").html(`<option value="0">Chọn lớp học ...</option>`);
    $("#point-math").val("");
    $("#point-physics").val("");
    $("#point-chemistry").val("");
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
    // cleanForm();
    cleanForm();

    if ($("#btn-submit").attr('value') == "Cập nhật thông tin") {
        $("#btn-submit").attr('value', "Lưu thông tin");
    }
}

function changeStudentGrade() {
    const grade = $("#student__grade").val();
    updateClass(grade);
}

function editStudent(index) {

    // change title
    $("#btn-submit").attr('value', "Cập nhật thông tin");

    // Get
    let items_name = listStudents[index].name;
    let items_dob = listStudents[index].dob;
    let items_gender = listStudents[index].gender;
    let items_grade = listStudents[index].grade;
    let items_class = listStudents[index].class;
    let items_math = listStudents[index].math;
    let items_physics = listStudents[index].physics;
    let items_chemistry = listStudents[index].chemistry;

    // Show
    $("#student__name").val(items_name);
    console.log(items_gender);
    switch (items_gender) {
        case "Nam":
            $("#gender__male").prop("checked", true);
            break;
        case "Nữ":
            $("#gender__female").prop("checked", true);
            break;
        case "Khác":
            $("#gender__other").prop("checked", true);
            break;
    }

    $("#student__dob").val(items_dob);
    $("#student__grade").val(items_grade);

    updateClass(items_grade);
    $("#student__class").val(items_class);

    $("#point-math").val(items_math);
    $("#point-physics").val(items_physics);
    $("#point-chemistry").val(items_chemistry);

    // Delete
    listStudents.splice(index, 1);
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc muốn xóa Row thông tin này không?”. ")) {
        // Delete
        listStudents.splice(index, 1);
        // Show
        showData(listStudents);
    }
}

function searchStudent() {
    let result = [];
    // Get
    let search = $("#showing__search").val();

    // Validate
    if (!validateName(search)) {
        alert("Kiểm tra lai ten");
        $("#showing__search").focus();
        return;
    }

    // Search
    for (let i = 0; i < listStudents.length; i++) {
        if (listStudents[i].name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            result.push(listStudents[i]);
        }
    }

    // Show
    showData(result);
}