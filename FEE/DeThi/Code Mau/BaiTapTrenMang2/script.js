$(document).ready(function () {
    // Lấy ngày hiện tại dạng chuỗi
    var today = new Date().toISOString().split('T')[0];


    // Hàm thêm dòng mới vào bảng chi tiết hóa đơn
    function addRow() {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<td><input type="text" class="stt form-control"/></td>';
        cols += '<td><input type="text" class="itemName form-control"/><div class="itemName-error error-text"></div></td>';
        cols += '<td><input type="text" class="itemQuantity form-control"/><div class="itemQuantity-error error-text"></div></td>';
        cols += '<td><input type="text" class="itemPrice form-control"/> <div class="itemPrice-error error-text"></div></td>';
        cols += '<td><button type="button" class="btn deleteRow delete-link" onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>';
        newRow.append(cols);
        $("#invoice-details").append(newRow);
    }

    function validateAndExportInvoice() {
        var isValid = true;
        var invoiceDetails = [];

        $("#invoice-details tbody tr").each(function () {
            var $row = $(this);

            if (!checkItemName($row)) {
                isValid = false;
            }

            if (!checkItemQuantity($row)) {
                isValid = false;
            }

            if (!checkItemPrice($row)) {
                isValid = false;
            }

            if (isValid) {
                var itemName = $row.find('.itemName').val();
                var itemQuantity = parseInt($row.find('.itemQuantity').val()) || 0;
                var itemPrice = parseInt($row.find('.itemPrice').val()) || 0;

                invoiceDetails.push({
                    itemName: itemName,
                    itemQuantity: itemQuantity,
                    itemPrice: itemPrice,
                    totalAmount: itemQuantity * itemPrice
                });
            }
        });

        if (isValid) {
            // Get invoice info
            var name = $("#name").val();
            var idNumber = $("#id").val() || "N/A";
            var exportDate = $("#date").val() || "N/A";

            // Calculate the total amount
            var totalAmount = invoiceDetails.reduce(function (acc, detail) {
                return acc + detail.totalAmount;
            }, 0);

            // Add new row to the invoice list table
            var rowIndex = 1;
            invoiceDetails.forEach(function (detail, index) {
                var newRow = $("<tr>");
                var cols = "";

                if (index === 0) {
                    cols += '<td rowspan="' + invoiceDetails.length + '">' + rowIndex + '</td>';
                    cols += '<td rowspan="' + invoiceDetails.length + '">' + name + '</td>';
                    cols += '<td rowspan="' + invoiceDetails.length + '">' + idNumber + '</td>';
                    cols += '<td rowspan="' + invoiceDetails.length + '">' + exportDate + '</td>';
                }

                cols += '<td>' + detail.itemName + '</td>';
                cols += '<td id="quantity">' + detail.itemQuantity + '</td>';
                cols += '<td>' + detail.itemPrice + '</td>';
                cols += '<td>' + detail.totalAmount + '</td>';

                if (index === 0) {
                    cols += '<td id ="money" rowspan="' + invoiceDetails.length + '">' + totalAmount + '</td>';
                    cols += '<td rowspan="' + invoiceDetails.length + '"><button""><i class="fa fa-trash delete-link"></i></button></td>';
                }

                newRow.append(cols);
                $("#invoice-list").append(newRow);
            });

            // Reset form and invoice details table
            $('#invoice-form')[0].reset();
            $('#invoice-form :input').prop('disabled', false);
            $('#invoice-form').find(':submit').prop('disabled', false);
            $("#invoice-details tbody").empty();
        }
    }

    function checkItemName($row) {
        var itemName = $row.find('.itemName');
        var itemNameError = $row.find('.itemName-error');
        var itemReg = /^[a-zA-Z0-9\s]+$/;
      
        itemName.removeClass('is-invalid');
        itemNameError.html("").css('color', '');
      
        if (!itemName.val() || !itemReg.test(itemName.val())) {
          itemName.addClass('is-invalid');
          itemNameError.html("Yêu cầu nhập tên hàng hóa").css('color', 'red');
          return false;
        }
        return true;
      }
      
      function checkItemQuantity($row) {
        var itemQuantity = $row.find('.itemQuantity');
        var itemQuantityError = $row.find('.itemQuantity-error');
      
        itemQuantity.removeClass('is-invalid');
        itemQuantityError.html("").css('color', '');
      
        if (!itemQuantity.val() || parseInt(itemQuantity.val()) <= 0) {
          itemQuantity.addClass('is-invalid');
          itemQuantityError.html("Số lượng không hợp lệ").css('color', 'red');
          return false;
        }
        return true;
      }
      
      function checkItemPrice($row) {
        var itemPrice = $row.find('.itemPrice');
        var itemPriceError = $row.find('.itemPrice-error');
      
        itemPrice.removeClass('is-invalid');
        itemPriceError.html("").css('color', '');
      
        if (!itemPrice.val() || parseInt(itemPrice.val()) <= 0) {
          itemPrice.addClass('is-invalid');
          itemPriceError.html("Đơn giá khoogn hợp lệ").css('color', 'red');
          return false;
        }
        return true;
      }

    // Hàm tính tổng số lượng và thành tiền 
    function sumQuan() {
        var numQuan = document.querySelectorAll('#quantity');
        var arrQuan = [];
        for (let index = 0; index < numQuan.length; index++) {
            const element = parseInt(numQuan[index].innerHTML);
            arrQuan.push(element);
        }
        function getSum(total, num) {
            return total + Math.round(num);
        }
        document.getElementById('total-quantity').innerHTML = arrQuan.reduce(getSum, 0);
    }

    function sumTotal() {
        var numTotal = document.querySelectorAll('#money');
        var arrMoney = [];
        for (let index = 0; index < numTotal.length; index++) {
            const element = parseInt(numTotal[index].innerHTML);
            arrMoney.push(element);
        }
        function getSum(total, num) {
            return total + Math.round(num);
        }
        document.getElementById('total-sum').innerHTML = arrMoney.reduce(getSum, 0);
    }

    // Hàm xóa dòng trong table bất kì
    $(document).on('click', '.delete-link', function () {
        var row = $(this).closest('tr');
        var rowspan = row.find('td:first-child').attr('rowspan');

        if (rowspan && parseInt(rowspan) > 2) {
            row.find('td:first-child').attr('rowspan', parseInt(rowspan) - 1);
        } else {
            row.remove();
        }
    });

    // Sự kiện submit form
    $('#invoice-form').on('submit', function (e) {
        e.preventDefault();
        if (validateData()) {
            addRow();
            addRow();
            $('#edit-invoice-details, #add-row, #export-invoice').removeClass('disabled');
            $('#invoice-form :input').prop('disabled', true);
            $(this).find(':submit').prop('disabled', true);
        }
    });

    // Sự kiện click nút chỉnh sửa chi tiết hóa đơn
    $('#edit-invoice-details').click(function () {
        if (!$(this).hasClass('disabled')) {
            $("#invoice-details tbody").empty();
            $('#invoice-form :input').prop('disabled', false);
            $('#invoice-form').find(':submit').prop('disabled', false);
        }
    });

    // Sự kiện click nút thêm dòng
    $('#add-row').click(function () {
        addRow();
    });

    // Sự kiện click nút xuất hóa đơn
    $('#export-invoice').click(function () {
        if (!$(this).hasClass('disabled')) {
            validateAndExportInvoice();
            sumTotal();
            sumQuan();
        }
    });



    
    function validateData(data) {
        let resultCheck = true;
        if (!checkName()) {
            resultCheck = false;
        }
        if (!checkCMND()) {
            resultCheck = false;
        }
        if (!checkInvoiceDate()) {
            resultCheck = false;
        }
        if (!checkAddress()) {
            resultCheck = false;
        }
        if (!checkNote()) {
            resultCheck = false;
        }
        return resultCheck;
    }

    let err = "";
    let txt = "";
    let regex = "";

    // Check name
    function checkName() {
        err = $("#name");
        txt = $("#name-error");
        regex = /^[a-zA-Z ]+$/i;
        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (regex.test(err.val())) {
            err.addClass("is-valid");
            return true;
        } else {
            txt.html("Yêu cầu nhập họ và tên");
            err.addClass("is-invalid");
            return false;
        }
    }

    // Check CMND
    function checkCMND() {
        err = $("#id");
        txt = $("#id-error");
        regex = /^[0-9]{9,12}$/;

        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (regex.test(err.val())) {
            err.addClass("is-valid");
            return true;
        } else {
            txt.html("Yêu cầu nhập CMND");
            err.addClass("is-invalid");
            return false;
        }
    }

    // Check Ngày xuất hóa đơn
    function checkInvoiceDate() {
        err = $("#date");
        txt = $("#date-error");
        let invoiceDate = new Date(err.val());
        let currentDate = new Date();
        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (invoiceDate <= currentDate) {
            err.addClass("is-valid");
            return true;
        } else {
            txt.html("Ngày xuất hóa đơn không hợp lệ");
            err.addClass("is-invalid");
            return false;
        }
    }

    // Check địa chỉ
    function checkAddress() {
        err = $("#address");
        txt = $("#address-error");
        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (err.val().trim().length > 0) {
            err.addClass("is-valid");
            return true;
        } else {
            txt.html("Yêu cầu nhập địa chỉ");
            err.addClass("is-invalid");
            return false;
        }
    }

    // Check ghi chú
    function checkNote() {
        err = $("#note");
        txt = $("#note-error");
        regex = /^[a-zA-Z ]+$/i;
        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (regex.test(err.val())) {
            err.addClass("is-valid");
            return true;
        } else {
            txt.html("Yêu cầu nhập ghi chú");
            err.addClass("is-invalid");
            return false;
        }
    }


});