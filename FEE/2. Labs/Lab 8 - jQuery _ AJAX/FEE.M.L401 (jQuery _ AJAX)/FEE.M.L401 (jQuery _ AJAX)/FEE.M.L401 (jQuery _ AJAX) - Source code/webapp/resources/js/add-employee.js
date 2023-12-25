$(document).ready(function() {
    // Create attribute maxDate to check if input date higher than current date
    $.validator.addMethod("maxDate", function(value, element) {
        var curDate = new Date();
        var inputDate = new Date(value);
        if (inputDate < curDate)
            return true;
        return false;
    }, "Invalid date of birth");

    $("#addEmpForm").validate({
        rules: {
            employeeName: {
                required: true,
                minlength: 5
            },
            dateOfBirth: {
                required: true,
                maxDate: true
            },
            dept: {
                required: true
            }
        },
        messages: {
            employeeName: {
                required: "Please enter employee name",
                minlength: "Employee name must contain at least 5 characters"
            },
            dateOfBirth: {
                required: "Please choose a date"
            },
            dept: {
                required: "Please choose a deparment"
            }
        },
        submitHandler: function(form) {
            $.get({
                url: "/views/list-employees.html",
                success: function(response) {
                    $(".container").html(response);
                }
            });
        }
    });

});