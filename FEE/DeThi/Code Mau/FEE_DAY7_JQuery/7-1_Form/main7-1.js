$(document).ready(function() {
    $(".btn-success").on("click", function() {
        $(".form-control").val(parseInt($(".form-control").val()) + 1);
        if(parseInt($(".form-control").val()) >= 1) {
            $(".input-group span").addClass("d-none");
            $(".total-quantity").text($(".form-control").val());
            $(".total-money").text((parseInt($(".form-control").val())  * parseInt($(".cost").text().replace(',', ''))).toLocaleString() + " $");
        } else {
            $(".input-group span").removeClass("d-none");
        }
    });
    $(".btn-danger").on("click", function() {
        $(".form-control").val(parseInt($(".form-control").val()) - 1);
        if(parseInt($(".form-control").val()) >= 1) {
            $(".input-group span").addClass("d-none");
            $(".total-quantity").text($(".form-control").val());
            $(".total-money").text((parseInt($(".form-control").val())  * parseInt($(".cost").text().replace(',', ''))).toLocaleString() + " $");
        } else {
            $(".input-group span").removeClass("d-none");
        }
    });
    $(".form-control").on("input", function() {
        if(parseInt($(".form-control").val()) >= 1) {
            $(".input-group span").addClass("d-none");
            $(".total-quantity").text($(".form-control").val());
            $(".total-money").text((parseInt($(".form-control").val())  * parseInt($(".cost").text().replace(',', ''))).toLocaleString() + " $");
        } else {
            $(".input-group span").removeClass("d-none");
        }
    });
});