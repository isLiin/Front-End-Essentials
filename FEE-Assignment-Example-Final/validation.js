

function validateName(name) {
    // Kiểm tra xem chuỗi có bị bỏ trống hay không
    if (name.trim() === '') {
        return false;
    }

    // Kiểm tra xem chuỗi chỉ chứa các ký tự alphabet và khoảng trắng hay không
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
}

function validateDateOfBirth(dateString) {
    // Kiểm tra xem giá trị ngày sinh đã được chọn hay chưa
    if (!dateString) {
        return false;
    }

    // Tạo một đối tượng Date từ chuỗi ngày sinh
    var dateOfBirth = new Date(dateString);

    // Kiểm tra xem ngày sinh có hợp lệ hay không
    if (isNaN(dateOfBirth.getTime())) {
        return false;
    }

    // Tạo một đối tượng Date cho ngày hiện tại
    var currentDate = new Date();

    // So sánh ngày sinh với ngày hiện tại
    if (dateOfBirth >= currentDate) {
        return false;
    }

    return true;
}

function validateSelectedOption(selectElement) {

    // Kiểm tra xem một mục đã được chọn hay chưa
    if (parseInt(selectElement) == 0) {
        return true;
    }

    return false;
}
function validateSubjectScore(score) {
    // Kiểm tra xem điểm môn học đã được nhập hay chưa
    if (!score) {
        return false;
    }

    // Kiểm tra xem điểm môn học có hợp lệ hay không
    var regex = /^\d{1,2}(\.\d{1,2})?$/;
    return regex.test(score) && parseFloat(score) >= 0 && parseFloat(score) <= 10;
}