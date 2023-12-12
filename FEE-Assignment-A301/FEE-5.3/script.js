
// filter: tim kiem
function checkUser(user) {
    if (user.gender == "Male" && user.age <= 40) {
        return true;
    }
    return false;
}

$(document).ready(function () {
    users.filter(checkUser).forEach((user) => {
        $("#group-data-filter").html(`${user.first_name}</>`);
    })

    const avgAge = users.reduce((sum, user) => sum + user.age, 0) / users.length;
    $("#group-data-reduce").html(`Average age: ${avgAge.toFixed(2)}`);
});