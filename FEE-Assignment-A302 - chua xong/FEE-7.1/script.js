'use strict'

function updatePrice() {
    let price = $(".myPrice").html();
    let quantity = $(".myQuantity").val();

    // sum

    if ($(".myQuantity").val() > 0) {
        // update
        let sum = parseInt(price) * parseInt(quantity)
        $(".myTotal").html(sum);
        $(".error").html("");
    } else {
        $(".myQuantity").val(1);
        $(".error").html("Quantity more than 0.");
    }
}

function plusQuantity() {
    $(".myQuantity").val(parseInt($(".myQuantity").val()) + 1);
    updatePrice();
}
function minusQuantity() {
    $(".myQuantity").val(parseInt($(".myQuantity").val()) - 1);
    updatePrice();
}

$(document).ready(() => {
    $(".myQuantity").on('change', () => updatePrice());
    $(".myQuantity").on('keyup', () => updatePrice());
    $(".btnPlus").on('click', () => plusQuantity());
    $(".btnMinus").on('click', () => minusQuantity());
})