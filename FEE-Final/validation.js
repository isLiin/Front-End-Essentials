
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

function validateDateVacxin(dateStart, dateEnd) {
    if (dateStart.trim().length === 0 || dateEnd.trim().length === 0  ) {
        console.log(false);
        return true;
    }

    let date1 = new Date(dateStart);
    let date2 = (dateEnd !== '') ? new Date(dateEnd) : new Date();
    let diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return (diffDays >= 30);
}

function validateGender(gender) {
    return gender !== 'all';
}

/**
 * validate form don't input empty, not space
 * - Các trường: Last Name chỉ được nhập dữ liệu dạng ký tự, không có khoảng trắng, không chứa các ký tự đặc biệt;
 */
 function validateText(value) {
    // regex check not space 
    var regex = /^[a-zA-Z\s._-]+$/;
    return (value.trim().length !== 0) && (regex.test(value));
}
/**
 * Phone: Chỉ có 10 số (Số phone Việt Nam)
 */
 function validateCCCD(value) {
    var regex = /^[0-9]{12}$/;
    return (value.trim().length !== 0) && regex.test(value);
}