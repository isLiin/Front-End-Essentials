
/**
 * validate form don't input empty, not space
 */
function validateText(value) {
    if (value.trim() === '') {
        return false;
    }

    // regex check not space
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(value);
}

/**
 * validate form don't 
 *  input empty, not space and last string @fsoft.com.vn
 * */
function validateEmail(params) {
    if (params.trim() === '') {
        return false;
    }

    var regex = /^[a-zA-Z0-9._-]+@fsoft.com.vn$/;
    return regex.test(params);
}

