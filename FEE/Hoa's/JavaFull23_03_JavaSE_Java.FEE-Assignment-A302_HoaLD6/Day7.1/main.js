const quantity = document.querySelector("#quantity");
const unitPrice = $('#unitPrice').text();
const totalPrice = document.querySelector("#totalPrice");
$("#form").validate({
    rules:{
        quantity:{
            required:true,
            min:1,
           number: true,
        }
    },
    messages:{
        quantity:{
            required:"abc",
            min:"duoi 1",
            number: "you can only input number",
        }
    },
    errorPlacement: function(error, element) {
        error.insertAfter(element); // <- default, change this to whatever you need
    }
});
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