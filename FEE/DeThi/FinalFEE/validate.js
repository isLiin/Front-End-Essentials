
function valString(stringCheck) {
    let regex = /^[a-zA-Z\s]{10,50}$/;
    return regex.test(stringCheck);
}

function valBoD(stringCheck) {
    if (stringCheck === '') {
        return false;
    }
    let currentDate = new Date();
    let getDate = new Date(stringCheck);
    let getYear = getDate.getFullYear();
    if (getYear < 2000) {
        return false;
    }

    if (currentDate <= getDate) {
        return false;
    } else {
        return true;
    }
}

function valGradeClass(stringCheck) {
    if (stringCheck === "") {
        return false;
    } else {
        return true;
    }
}

Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
}

function valPoint(stringCheck) {
    if (Number(stringCheck).countDecimals() > 2) {
        return false;
    }
    if (stringCheck === '') {
        return false;
    }

    if (stringCheck >= 0 && stringCheck <= 10) {
        return true;
    } else {
        return false;
    }
}

function valNumber(stringCheck){
    if(!isNaN(stringCheck) && Number(stringCheck) > 0 && Number(stringCheck).countDecimals() === 0 && stringCheck.length >=9 && stringCheck.length <= 11){
        return true;
    }else{
        return false;
    }
}

function valEmail(stringCheck) {
    let regex = /^[a-zA-Z0-9._%+-]+[@][a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(stringCheck);
}

function valExpMonth(stringCheck) {
    if ($.isNumeric(stringCheck) && Number(stringCheck) > 0 && Number(stringCheck) < 13) {
        return true;
    } else {
        return false;
    }
}

function valExpYear(stringCheck) {
    if ($.isNumeric(stringCheck) && Number(stringCheck) > 2000) {
        return true;
    } else {
        return false;
    }
}


