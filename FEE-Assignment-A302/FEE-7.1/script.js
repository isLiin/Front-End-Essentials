'use strict'

function updatePrice() {
    let price = $(".myPrice").html();
    let quantity = $(".myQuantity");
    let total = $(".myTotal");
    let msgError = $(".error");

    if (quantity.val() > 0) {
        // update
        let sum = parseInt(price) * parseInt(quantity.val())
        total.html(sum);
        msgError.html("");
    } else {
        quantity.val(1);
        msgError.html("Quantity more than 0.");
    }
}

function plusQuantity() {
    let quantity = $(".myQuantity");
    quantity.val(parseInt(quantity.val()) + 1);
    updatePrice();
}
function minusQuantity() {
    let quantity = $(".myQuantity");
    quantity.val(parseInt(quantity.val()) - 1);
    updatePrice();
}

$(document).ready(() => {
    $(".myQuantity").on('change', () => updatePrice());
    $(".myQuantity").on('keyup', () => updatePrice());
    $(".btnPlus").on('click', () => plusQuantity());
    $(".btnMinus").on('click', () => minusQuantity());
})