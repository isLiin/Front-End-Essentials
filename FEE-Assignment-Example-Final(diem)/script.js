'use strict';

// Application static
$(document).ready(function () {
    console.log('%c LIIN Coder!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');

    $("#student__name").val("Liin");
    $("#student__dob").val("2001-06-14")
    $("#point-math").val(8);
    $("#point-physics").val(9);
    $("#point-chemistry").val(9);

    // Change grade
    $("#student__grade").on("change", changeStudentGrade)
    // Submit form
    $("#btn-submit").on("click", submitForm);
    // Edit student
    $("#btn-edit").on("click", () => editStudent);
    // Delete studentx
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
            container.append(`<option value="0" disabled selected>Chọn lớp học ...</option>`);
            container.append(`<option value="10A">10A</option>`);
            container.append(`<option value="10B">10B</option>`);
            break;
        case "11":
            container.html("");
            container.append(`<option value="0" disabled selected>Chọn lớp học ...</option>`);
            container.append(`<option value="11A">11A</option>`)
            container.append(`<option value="11B">11B</option>`)
            break;
        case "12":
            container.html("");
            container.append(`<option value="0" disabled selected>Chọn lớp học ...</option>`);
            container.append(`<option value="12A">12A</option>`);
            container.append(`<option value="12B">12B</option>`);
            break;
        default:
            container.html("");
            container.append(`<option value="0" disabled selected>Chọn lớp học ...</option>`);
            break;
    }
}

/**
 * Clears the form fields 
 * */
function cleanForm() {

    $("#name-alert").addClass("d-none");
    $("#student__name").removeClass("is-invalid");
    $("#dob-alert").addClass("d-none");
    $("#student__dob").removeClass("is-invalid");
    $("#grade-alert").addClass("d-none");
    $("#student__grade").removeClass("is-invalid");
    $("#class-alert").addClass("d-none");
    $("#student__class").removeClass("is-invalid");
    $("#math-alert").addClass("d-none");
    $("#student__math").removeClass("is-invalid");
    $("#physics-alert").addClass("d-none");
    $("#student__physics").removeClass("is-invalid");
    $("#chemistry-alert").addClass("d-none");
    $("#student__chemistry").removeClass("is-invalid");

    $("#student__name").val("");
    $("#gender__male").prop("checked", true);
    $("#student__dob").val("");
    $("#student__grade").html(`
                <option value="0" disabled selected>Chọn khối ...</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>`);
    $("#student__class").html(`<option value="0" disabled selected>Chọn lớp học ...</option>`);
    $("#point-math").val("");
    $("#point-physics").val("");
    $("#point-chemistry").val("");
    $("#student__name").focus();
}

function validateForm(std_name, std_dob, std_grade, std_class, std_math, std_physics, std_chemistry) {
    let isValidate = true;
    // Validate
    $("#name-alert").addClass("d-none");
    $("#student__name").removeClass("is-invalid");
    if (!validateName(std_name)) {
        $("#student__name").addClass("is-invalid");
        $("#name-alert").removeClass("d-none");
        $("#name-alert").html("Tên học sinh phải bao gồm chuỗi và khoảng trắng!");
        $("#name-alert").focus();
        isValidate = false;
    }

    $("#dob-alert").addClass("d-none");
    $("#student__dob").removeClass("is-invalid");
    if (!validateDateOfBirth(std_dob)) {
        $("#student__dob").addClass("is-invalid");
        $("#dob-alert").removeClass("d-none");
        $("#dob-alert").html("Ngày sinh cua học sinh phải nhỏ hơn ngày hien tai!");
        $("#dob-alert").focus();
        isValidate = false;
    }

    $("#grade-alert").addClass("d-none");
    $("#student__grade").removeClass("is-invalid");
    if (!validateSelectedOption(std_grade)) {
        $("#student__grade").addClass("is-invalid");
        $("#grade-alert").removeClass("d-none");
        $("#grade-alert").html("Chọn Khối lớp học!");
        $("#grade-alert").focus();
        isValidate = false;
    }

    $("#class-alert").addClass("d-none");
    $("#student__class").removeClass("is-invalid");
    if (!validateSelectedOption(std_class)) {
        $("#student__class").addClass("is-invalid");
        $("#class-alert").removeClass("d-none");
        $("#class-alert").html("Chọn lớp học!");
        $("#class-alert").focus();
        isValidate = false;
    }

    $("#math-alert").addClass("d-none");
    $("#point-math").removeClass("is-invalid");
    if (!validateSubjectScore(std_math)) {
        $("#point-math").addClass("is-invalid");
        $("#math-alert").removeClass("d-none");
        $("#math-alert").html("Điem môn toan phải nhỏ hơn hoặc bằng 10!");
        $("#math-alert").focus();
        isValidate = false;
    }

    $("#physics-alert").addClass("d-none");
    $("#point-physics").removeClass("is-invalid");
    if (!validateSubjectScore(std_physics)) {
        $("#point-physics").addClass("is-invalid");
        $("#physics-alert").removeClass("d-none");
        $("#physics-alert").html("Điem môn ly phải nhỏ hơn hoặc bằng 10!");
        $("#physics-alert").focus();
        isValidate = false;
    }

    $("#chemistry-alert").addClass("d-none");
    $("#point-chemistry").removeClass("is-invalid");
    if (!validateSubjectScore(std_chemistry)) {
        $("#point-chemistry").addClass("is-invalid");
        $("#chemistry-alert").removeClass("d-none");
        $("#chemistry-alert").html("Điem môn hoa phải nhỏ hơn hoặc bằng 10!");
        $("#chemistry-alert").focus();
        isValidate = false;
    }

    return isValidate;
}

/**
 * Submits the form and performs various validations before adding the student data to the list and table.
 *
 * @return {undefined} No return value.
 */
function submitForm() {
    let std_name = $("#student__name").val();
    let std_gender = $("input[name=gender]:checked").val();
    let std_dob = $("#student__dob").val();
    let std_grade = $("#student__grade").val();
    let std_class = $("#student__class").val();
    let std_math = $("#point-math").val();
    let std_physics = $("#point-physics").val();
    let std_chemistry = $("#point-chemistry").val();

    // Validate
    if (!validateForm(std_name, std_dob, std_grade, std_class, std_math, std_physics, std_chemistry)) {
        return;
    }

    if ($("#btn-submit").attr('value') == "Cập nhật thông tin") {
        let index = $("#infomation").prop("keys");
        // update data to list
        listStudents[index] = {
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
        }
        $("#btn-submit").attr('value', "Lưu thông tin");
    } else {
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
    }

    // add data to table
    showData(listStudents);
    // cleanForm();
    cleanForm();
}

function changeStudentGrade() {
    const grade = $("#student__grade").val();
    updateClass(grade);
}

function editStudent(index) {

    cleanForm();
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
    // console.log(items_gender);
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
    // listStudents.splice(index, 1);
    $("#infomation").prop("keys", index);
}

function deleteStudent(index) {
    if (confirm("Bạn có chắc muốn xóa Row thông tin này không?")) {
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
    // if (!validateName(search)) {
    //     alert("Kiểm tra lai ten");
    $("#showing__search").focus();
    //     return;
    // }

    // Search
    for (let i = 0; i < listStudents.length; i++) {
        if (listStudents[i].name.toLowerCase().indexOf(search.toLowerCase()) != -1) {
            result.push(listStudents[i]);
        }
    }

    // Show
    showData(result);
}