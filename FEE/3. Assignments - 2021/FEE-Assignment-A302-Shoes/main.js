// const quantity = document.querySelector("#quantity");
// const unitPrice = $('#unitPrice').text();
// const totalPrice = document.querySelector("#totalPrice");
const quantity = document.getElementById("#quantity");
const unitPrice = $('#unitPrice').text();
const totalPrice = document.getElementById("#totalPrice");

function addQuantity() {
    quantity.value = parseInt(quantity.value) + 1;
    newTotalPrice = parseInt(quantity.value) * parseInt(unitPrice);
    
    totalPrice.innerHTML = newTotalPrice;
}
function minusQuantity() {
    if (quantity.value > 1) {
        quantity.value = parseInt(quantity.value) - 1;
        newTotalPrice = parseInt(quantity.value) * parseInt(unitPrice);
        
        totalPrice.innerHTML = newTotalPrice;
    } else {
        // Thông báo lỗi nếu quantity.value nhỏ hơn 1
        alert("Số lượng sản phẩm cần mua tối thiểu là 1");
    }
}