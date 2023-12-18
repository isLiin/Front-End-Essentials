function validate(){
    $().ready(function(){
        $('#formCreateBill').validate({
            onfocusout: false,
            onkeyup: false,
            onchange: true,
            onclick: false,
            rules:{
                name:{
                    required: true,
                    pattern: /^[a-zA-Z0-9 ]+$/,
                },
                address:{
                    required: true,
                    pattern: /^[a-zA-Z0-9 ]+$/,
                },
                note:{
                    required: true,
                    pattern: /^[a-zA-Z0-9 ]+$/,
                },
                cmnd:{
                    required: true,
                    pattern: /^[0-9]{9}$/,
                }
            },
            messages:{
                name:{
                    required: "Required Input",
                    pattern: "Invalid Input",
                },
                address:{
                    required: "Required Input",
                    pattern: "Invalid Input",
                },
                note:{
                    required: "Required Input",
                    pattern: "Invalid Input",
                },
                cmnd:{
                    required: "Required Input",
                    pattern: "Invalid Input",
                }
            }
        });
    });
    
}

validate();


var tempBill;
var tempDetail;
var listBill = [
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn2",
        cmnd: "2002200202",
        date: "12/10/2021",
        details: [
            {
                productName: "Xi Măng2",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát2",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch2",
                qtt: 51,
                price: 10000
            },
            {
                productName: "Gạch2",
                qtt: 51,
                price: 10000
            },
            {
                productName: "Gạch2",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
    {
        name: "Tuấn1",
        cmnd: "1002200202",
        date: "10/10/2021",
        details: [
            {
                productName: "Xi Măng1",
                qtt: 10,
                price: 100000
            },
            {
                productName: "Cát1",
                qtt: 5,
                price: 120000
            },
            {
                productName: "Gạch1",
                qtt: 51,
                price: 10000
            },
        ]
    },
];

$('#formCreateBill').submit(function(e){
    e.preventDefault();
    console.log($("#formCreateBill").valid());
    if($("#formCreateBill").valid()){

        var itemSubmit = {
            id: listBill.length++,
            name: $('#name').val(),
            cmnd: $('#cmnd').val(),
            date: $('#day').val(),
            details: [

            ]
        }
        console.log(itemSubmit);
        tempBill = itemSubmit;

        //Details
        $('.productName').prop('disabled', false);
        $('.qtt').prop('disabled', false);
        $('.price').prop('disabled', false);

        $('#editBill').prop('disabled', false);
        $('#addRow').prop('disabled', false);
        $('#printBill').prop('disabled', false);

        //disable input fields
        disableInputCreateBill(true);
        //disable button create
        $('#createBill').prop('disabled', true);
    }
});

function disableInputCreateBill(isDisable){
    //disable input fields
    $('#name').prop('disabled', isDisable);
    $('#cmnd').prop('disabled', isDisable);
    $('#day').prop('disabled', isDisable);
    $('#address').prop('disabled', isDisable);
    $('#note').prop('disabled', isDisable);
}

$('#editBill').on('click', function(e){
    e.preventDefault();
    disableInputCreateBill(false);
    $('#createBill').prop('disabled', false);
    $('#createBill').text("Lưu hoá đơn");
});

$('#printBill').on('click',function(e){
    e.preventDefault();
    //flag
    var isValid = true;

    var productNameList = $('.productName');
    var qttList = $('.qtt');
    var priceList = $('.price');

    var tempObj = [productNameList,qttList,priceList];
    isValid = validateArrInput(tempObj);
    // for (let index = 0; index < productNameList.length; index++) {
    //     if(isEmpty(productNameList.eq(index).val())){
    //         isValid = false;
    //         productNameList.eq(index).addClass('is-invalid');
    //         productNameList.eq(index).after('<div class="invalid-feedback">Required!!</div>');
    //     }
    //     if(isEmpty(qttList.eq(index).val())){
    //         isValid = false;
    //         qttList.eq(index).addClass('is-invalid');
    //         qttList.eq(index).after('<div class="invalid-feedback">Required!!</div>');
    //     }
    //     if(isEmpty(priceList.eq(index).val())){
    //         isValid = false;
    //         priceList.eq(index).addClass('is-invalid');
    //         priceList.eq(index).after('<div class="invalid-feedback">Required!!</div>');
    //     }
    // }

    if(isValid){
        for (let index = 0; index < productNameList.length; index++) {
            var detail = {
                productName: productNameList.eq(index).val(),
                qtt: qttList.eq(index).val(),
                price: priceList.eq(index).val()
            }
            tempBill.details.push(detail);
        }
        listBill.push(tempBill);
        writeTable(listBill);
        $('#listDetail').html(`<tr>
                                    <th scope="row">1</th>
                                    <td class="form-group"><input type="text" class="form-control productName" disabled required/></td>
                                    <td class="form-group"><input type="text" class="form-control qtt" disabled/></td>
                                    <td class="form-group"><input type="text" class="form-control price" disabled/></td>
                                    <td onclick="deleteDetail(this)">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                            <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                        </svg>
                                    </td>
                                </tr>`);
        disableInputCreateBill(false);
        $('#createBill').prop('disabled', false);
        $('#formCreateBill').trigger("reset");
    }
});

function deleteDetail(item){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
                //code delete
            var row = item.parentElement;
            row.remove();
        }
    });
    // console.log("delete " + item);
    // var row = item.parentElement;
    // row.remove();
}



$('#addRow').on('click',function(e){
    e.preventDefault();
    // var detail = {
    //     productName: $('.productName').eq($('.productName').length-1).val(),
    //     qtt: $('.qtt').eq($('.qtt').length-1).val(),
    //     price: $('.price').eq($('.price').length-1).val()
    // };
    // tempBill.details.push(detail);
    // console.log(tempBill);

    //reset
    var strDetail = '';
    strDetail = `<tr>
                    <th scope="row">1</th>
                    <td class="form-group"><input type="text" class="form-control productName" required/></td>
                    <td class="form-group"><input type="text" class="form-control qtt" /></td>
                    <td class="form-group"><input type="text" class="form-control price" /></td>
                    <td onclick="deleteDetail(this)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path
                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </td>
                </tr>`;
    $('#listDetail').append(strDetail);
   
});


function writeTable(list){
    var str = "";
    list.forEach((element,index) => {
        var total = getTotal(element.details);
        var numberDetail = element.details.length;
        str += `<tr>
                    <th scope="row" rowspan="${numberDetail}">${index+1}</th>
                    <td rowspan="${numberDetail}">${element.name}</td>
                    <td rowspan="${numberDetail}">${element.cmnd}</td>
                    <td rowspan="${numberDetail}">${element.date}</td>
                    <td>${element.details[0].productName}</td>
                    <td>${element.details[0].qtt}</td>
                    <td>${element.details[0].price}</td>
                    <td>` + element.details[0].qtt * element.details[0].price+`</td>
                    <td rowspan="${numberDetail}">${total}</td>
                    <td rowspan="${numberDetail}" onclick="deleteBill(${index})">&nbsp;&nbsp;&nbsp;&nbsp;<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path
                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg></td>
                </tr>`;
        // temp.details.shift();
        for (let index = 1; index < element.details.length; index++) {
            detail = element.details[index];
            str += `<tr>
                        <td>${detail.productName}</td>
                        <td>${detail.qtt}</td>
                        <td>${detail.price}</td>
                        <td>` + detail.qtt * detail.price+`</td>
                    </tr>`;
        }
    });
    $('#listBill').html(str); 

    console.log(listBill);
}



function deleteBill(index){
    //alert
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
            listBill.splice(index,1);
            writeTable(listBill);
        }
    });
}

function getTotal(details){
    var total = 0;
    details.forEach(element => {
        total += element.qtt * element.price;
    });
    return total;
}
writeTable(listBill);



function isEmpty(value){
    return !value || !value.trim();
}


/*
    addClass('is-invalid') : add error
    .after(<div class="invalid-feedback">Please input task name</div>) // error message
*/

function validateArrInput(obj){
    var flag = true;
    obj.forEach(element => {
        for (let index = 0; index < element.length; index++) {
            if(isEmpty(element.eq(index).val())){
                flag = false;
                element.eq(index).addClass('is-invalid');
                element.eq(index).after('<div class="invalid-feedback">Required!!</div>');
            }
        }
    });
    return flag;
}

