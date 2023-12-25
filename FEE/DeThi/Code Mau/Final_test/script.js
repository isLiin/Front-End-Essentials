$(document).ready(function () {

    //Xử lý sự kiện khi click chọn Radio button
    $('#dose-count').prop('disabled', true);

    $('input[type=radio][name=vaccine]').change(function () {
        if (this.id === 'none' && this.checked) {
            $('input[type=radio][name=vaccine]').not(this).hide();
            $('label[for=' + $(this).attr('id') + ']').siblings().not('label[for=none]').hide();
        } else if (this.checked) {
            $('input[type=radio][name=vaccine]').not(this).not('#none').hide();
            $('label[for=' + $(this).attr('id') + ']').siblings().not('label[for=none]').show();
            $('#dose-count').prop('disabled', false);
        }
    });

    $(document).on('click', 'input[type=radio][name=vaccine]:checked', function () {
        $('input[type=radio][name=vaccine]').not('#none').show();
        $('label').not('label[for=none]').show();
        $('#dose-count').prop('disabled', true);
    });

    //Xử lú change/onchange khi nhập số mũi vacxin
    $(document).ready(function () {
        $('#dose-count').on('change', function () {
            var doseCount = parseInt($(this).val());
            if (isNaN(doseCount) || doseCount < 1 || doseCount > 3) {
                alert('Lỗi! số mũi tiêm Vacxin là số nguyên từ 1 đến 3');
                $(this).val('');
                return;
            }

            for (var i = 1; i <= 3; i++) {
                if (i <= doseCount) {
                    $('.date' + i).closest('.col-4').show();
                } else {
                    $('.date' + i).closest('.col-4').hide();
                }
            }
        });
    });


    //Xử lý sự kiện khi click lưu thông tin
    $("#save-btn").click(function () {
        let isValid = true;

        // validate name
        const name = $("#name").val().trim();
        if (name === "") {
            $("#name-error").text("Vui lòng nhập Họ và Tên!");
            isValid = false;
        } else {
            $("#name-error").text("");
        }

        // validate địa chỉ
        const address = $("#address").val().trim();
        if (address === "") {
            $("#address-error").text("Vui lòng nhập địa chỉ!");
            isValid = false;
        } else {
            $("#address-error").text("");
        }

        // validate ngày sinh
        const dob = new Date($("#dob").val());
        const now = new Date();
        if (!$("#dob").val()) {
            $("#dob-error").text("Vui lòng chọn ngày sinh!");
            isValid = false;
        } else if (dob > now) {
            $("#dob-error").text("Ngày sinh không được lớn hơn ngày hiện tại!");
            isValid = false;
        } else {
            $("#dob-error").text("");
        }

        // validate giới tính
        const gender = $("#gender").val();
        if (gender === "select") {
            $("#gender-error").text("Vui lòng chọn giới tính!");
            isValid = false;
        } else {
            $("#gender-error").text("");
        }

        // validate CMND/CCCD
        const idNumber = $("#id-number").val();
        const idRegex = /^\d{12}$/;
        if (idNumber === "") {
            $("#id-error").text("Vui lòng nhập số CCCD, CMND!");
            isValid = false;
        } else if (!idRegex.test(idNumber)) {
            $("#id-error").text("Số CCCD, CMND phải chứa 12 ký tự số.");
            isValid = false;
        } else {
            $("#id-error").text("");
        }

        //Validate ngày tiêm
        const doseCount = parseInt($('#dose-count').val());
        let dates = [];
        let isValidDate = true;
        for (let i = 1; i <= doseCount; i++) {
            let date = new Date($("#date" + i).val());
            if (!$("#date" + i).val()) {
                $("#date" + i + "-error").text("Ngày tiêm mũi " + i + " không được để trống.");
                isValid = false;
                isValidDate = false;
            } else {
                dates.push(date);
            }
        }

        //Chịu làm k kịp ?
        for (let i = 1; i < dates.length; i++) {
            let prevDate = dates[i - 1];
            let currDate = dates[i];
            let diff = Math.abs(currDate - prevDate);
            let diffMonths = Math.ceil(diff / (1000 * 60 * 60 * 24 * 30));

            if (diffMonths < 1) {
                $("#date" + (i + 1) + "-error").text("Mũi tiêm " + (i + 1) + " phải cách mũi tiêm " + i + " ít nhất 1 tháng.");
                isValid = false;
                isValidDate = false;
            } else {
                $("#date" + (i + 1) + "-error").text("");
            }
        }

        if (isValid) {
            const vaccine = $('input[name="vaccine"]:checked').val();

            let dateStrings = dates.map(date => date.toLocaleDateString()).join(", ");
            const newRow = `
            <tr>
                <td>1</td>
                <td>${name}</td>
                <td>${gender}</td>
                <td>${dob.toLocaleDateString()}</td>
                <td>${idNumber}</td>
                <td>${vaccine}</td>
                <td dis>${dateStrings}</td>
                <td>
                <button><i class="far fa-trash-alt delete-btn"></i></button>
                </td>
            </tr>
            `;

            $("#vaccine-table tbody").append(newRow);

            const numPeople = parseInt($(".numPeople span").text()) + 1;
            $(".numPeople span").text(numPeople);
        }
    });

    // Xử lý sự kiện khi bấm button icon delete
    $(document).on('click', '.delete-btn', function () {
        var row = $(this).closest("tr");
        var result = confirm("Bạn có chắc muốn xóa Row Data này không?");
        if (result) {
            row.remove();
        }
        updatePeopleCount();
    });

    // Hàm xử lý sự kiện khi bấm delete (ok)
    $("tbody").on("click", ".delete-link", function () {
        var row = $(this).closest("tr");
        var result = confirm("Bạn có chắc muốn xóa Row Data này không?");
        if (result) {
            row.remove();
        }
    });

    //hàm xử lý sự kiện khi update
    function updatePeopleCount() {
        var count = $('#vaccine-table tbody tr').length;
        $('.numPeople span').text(count);
    }

    // Call the function when the page loads
    $(document).ready(updatePeopleCount);

    // Call the function when a person is deleted
    $('#vaccine-table').on('click', '.delete-btn', function () {
        $(this).closest('tr').remove();
        updatePeopleCount();
    });
});

