$(document).ready(function () {
    // Lấy ngày hiện tại dạng chuỗi
    var today = new Date().toISOString().split('T')[0];

    // Hàm kiểm tra dữ liệu nhập vào form
    // function validateForm() {
    //     var validate = true;
    //     var nameReg = /^[a-zA-Z0-9\s]+$/;
    //     var idReg = /^\d{9}$/;
    //     var name = $('#name').val();
    //     var id = $('#id').val();
    //     var date = $('#date').val();
    //     var address = $('#address').val();
    //     var note = $('#note').val();

    //     if (name === "" || !nameReg.test(name)) {
    //         $('#name-error').text('Họ tên không hợp lệ');
    //         validate = false;
    //     } else {
    //         $('#name-error').text('');
    //     }

    //     if (id === "" || !idReg.test(id)) {
    //         $('#id-error').text('CMND không hợp lệ');
    //         validate = false;
    //     } else {
    //         $('#id-error').text('');
    //     }

    //     if (date === "" || date > today) {
    //         $('#date-error').text('Ngày xuất hóa đơn không hợp lệ');
    //         validate = false;
    //     } else {
    //         $('#date-error').text('');
    //     }

    //     if (address === "") {
    //         $('#address-error').text('Địa chỉ không được để trống');
    //         validate = false;
    //     } else {
    //         $('#address-error').text('');
    //     }

    //     if (note === "") {
    //         $('#note-error').text('Ghi chú không được để trống');
    //         validate = false;
    //     } else {
    //         $('#note-error').text('');
    //     }

    //     return validate;
    // }

    function validateData(data) {
        var resultCheck = true;
        if (!checkName()) {
          resultCheck = false;
        }
        return resultCheck;
      }

    let err = "";
    let txt = "";
    let regex = "";

    //Check name
    function checkName() {
        err = $("#name");
        txt = $("#name-error");
        regex = /^[a-zA-Z]+$/i;
        txt.html("");
        err.removeClass("is-valid").removeClass("is-invalid");
        if (regex.test(err.val())) {
          err.addClass("is-valid");
          return true;
        } else {
          txt.html("Họ tên không hợp lệ");
          err.addClass("is-invalid");
          return false;
        }
    }

    //check 


    // Hàm thêm dòng mới vào bảng chi tiết hóa đơn
    function addRow() {
        var newRow = $("<tr>");
        var cols = "";
        cols += '<td><input type="text" class="stt form-control"/></td>';
        cols += '<td><input type="text" class="itemName form-control"/></td>';
        cols += '<td><input type="text" class="itemQuantity form-control"/></td>';
        cols += '<td><input type="text" class="itemPrice form-control"/></td>';
        cols += '<td><button type="button" class="btn deleteRow" onclick="deleteRow(this)"><i class="fa fa-trash"></i></button></td>';
        newRow.append(cols);
        $("#invoice-details").append(newRow);
    }

    // Hàm kiểm tra và xuất hóa đơn
    function validateAndExportInvoice() {
        var isValid = true;
        var invoiceDetails = [];
        var itemReg = /^[a-zA-Z0-9\s]+$/;

        $("#invoice-details tbody tr").each(function () {
            var $row = $(this);
            var itemName = $row.find('.itemName').val();
            var itemQuantity = parseInt($row.find('.itemQuantity').val()) || 0;
            var itemPrice = parseInt($row.find('.itemPrice').val()) || 0;

            if (!itemName || !itemReg.test(itemName)) {
                $row.find('.itemName').addClass('is-invalid');
                isValid = false;
            } else {
                $row.find('.itemName').removeClass('is-invalid');
            }

            if (!itemQuantity || itemQuantity <= 0) {
                $row.find('.itemQuantity').addClass('is-invalid');
                isValid = false;
            } else {
                $row.find('.itemQuantity').removeClass('is-invalid');
            }

            if (!itemPrice || itemPrice <= 0) {
                $row.find('.itemPrice').addClass('is-invalid');
                isValid = false;
            } else {
                $row.find('.itemPrice').removeClass('is-invalid');
            }

            if (isValid) {
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

    // Hàm xóa dòng bảng chi tiết hóa đớn
    function deleteRow(btn) {
        $(btn).closest('tr').remove();
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

    // Hàm xóa dòng trong table
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
        if (validateForm()) {
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
});