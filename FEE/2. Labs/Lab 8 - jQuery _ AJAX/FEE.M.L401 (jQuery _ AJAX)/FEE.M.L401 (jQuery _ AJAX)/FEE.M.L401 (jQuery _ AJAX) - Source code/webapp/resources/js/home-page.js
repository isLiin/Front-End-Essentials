$(document).ready(function() {
    $("#addEmpLink").click(function() {
        $.get({
            url: "/views/add-employee.html",
            success: function(response) {
                $(".container").html(response);
                $("#employeeName").focus();
            }
        });
    });

    $("#listEmpsLink").click(function() {
        $.get({
            url: "/views/list-employees.html",
            success: function(response) {
                $(".container").html(response);
            }
        });
    });


});