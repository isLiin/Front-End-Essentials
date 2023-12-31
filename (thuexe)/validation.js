'use strict';

function validateDateOfNow(dateString) {
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

function validateString(name) {
    // Kiểm tra xem chuỗi có bị bỏ trống hay không
    if (name === null || name.trim().length === 0) {
        return false;
    }

    // Kiểm tra xem chuỗi chỉ chứa các ký tự alphabet và khoảng trắng hay không
    var regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(name);
}

/**
 * Phone: Chỉ có 10 số (Số phone Việt Nam)
 */
function validatePhone(value) {
    var regex = /^[0-9]{10}$/;
    return (value.trim().length !== 0) && regex.test(value);
}