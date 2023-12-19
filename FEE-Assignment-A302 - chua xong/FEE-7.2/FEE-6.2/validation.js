
/**
 * validate form don't input empty, not space
 */
function validateText(value) {
    if (value.trim() === '') {
        return false;
    }
    return true;
}
