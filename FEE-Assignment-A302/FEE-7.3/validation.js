
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
 * validate form don't 
 *  input empty, not space and last string @fsoft.com.vn
 * */
function validateEmail(value) {
    var regex = /^[a-zA-Z0-9._-]+(@fsoft.com.vn)$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * Phone: Chỉ có 10 số (Số phone Việt Nam)
 */
function validatePhone(value) {
    var regex = /^[0-9]{10}$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * Zip Code: chỉ có 05 số
 */
function validateZipcode(value) {
    var regex = /^\d{5}$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * CVV: Chỉ có 03 số;
 */
function validateCVV(value) {
    var regex = /^\d{3}$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * Credit Card Number: 04 cụm số, mỗi cụm số chỉ chứa 04 số. 
 */
function validateCardNumber(value) {
    var regex = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * Exp Month: chỉ có 02 số, định dạng và ràng buộc đúng giá trị tháng;
 */
function validateExpMonth(value) {
    var regex = /^\d{2}$/;
    return (value.trim().length !== 0) && regex.test(value);
}

/**
 * Exp Year: Chỉ có 04 số, giá trị phải lớn hơn 2000
 */
function validateExpYear(value) {
    var regex = /^\d{4}$/;
    return (value.trim().length !== 0) && regex.test(value) && parseInt(value) > 2000;
}

/**
 * Các trường: State (Không chọn item đầu tiên) 
 */
function validateState(value) {
    return (parseInt(value) > 0);
}
