/**
 * @author Ho Ngoc Khanh
 */
'use strict';

/**
 * 
 * @param {Document} dcm 
 * @param {Object} user 
 */
function renderGUI(dcm, users) {
    users.forEach(user => {
        $(dcm).html(`${user.first_name}`);
    })
}

/**
 * Ready function
 */
$(document).ready(function () {
    const getUsers = users.filter(user => (user.gender == "Male" && user.age <= 40));
    renderGUI("#group-data-filter", getUsers);
    
    const getAvgAge = users.reduce((avgAge, user) => avgAge + user.age, 0) / users.length;
    $("#group-data-reduce").html(`${getAvgAge.toFixed(2)}`);
});