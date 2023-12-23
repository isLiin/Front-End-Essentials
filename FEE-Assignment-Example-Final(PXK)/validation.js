'use strict';

function validatePrice(price) {
    return (price > 0);
}

function validateQuantity(quantity, quantityNew) {
    return (quantityNew > 0) &&  (quantity >= quantityNew);
}

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