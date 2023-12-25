document.getElementById("radio").addEventListener("change", function () {
    $('#muiTiem').css("display", "flex")
    $("#soLuong").removeAttr('disabled', 'disabled')
})

document.getElementById("soLuong").addEventListener("change", function () {
    var soLuong = $("#soLuong").val();
    if (soLuong < 0 || soLuong > 3) {
        alert("Loi! So mui tiem Vacxin la so nguyen tu 1 den 3");
    } else {
        if (soLuong == 1) {
            $("#ngay2").css("display", "none")
            $("#ngay3").css("display", "none")
        } else if (soLuong == 2) {
            $("#ngay3").css("display", "none")
        }
    }
})
document.getElementById("soLuong").addEventListener("change", function () {
    var soLuong = $("#soLuong").val();
    if (soLuong == 1) {
        $("#ngay2").css("display", "none")
        $("#ngay3").css("display", "none")
    } else if (soLuong == 2) {
        $("#ngay2").css("display", "block")
        $("#ngay3").css("display", "none")
    } else {
        $("#ngay2").css("display", "block")
        $("#ngay3").css("display", "block")
    }
})
document.getElementById("luuThongTin").addEventListener("click", function () {
    var isValid = true;
    var ten = $("#name").val();
    var diaChi = $("#address").val();
    var ngaySinh = $("#date").val();
    var gioiTinh = $("#sex").val();
    var cmnd = $("#cmnd").val();
    var vacxin = $("#radio").val();
    var soLuong = $("#soLuong").val();
    var tbody = document.getElementById("tbody");
    var ngay1 = $("#date1").val();
    var ngay2 = $("#date2").val();
    var ngay3 = $("#date3").val();


    var NamePattern = /^[A-Za-z]+$/; // Biểu thức chính quy kiểm tra chỉ chứa ký tự
    if (!NamePattern.test(ten)) {
        isValid = false;
        $("#name").addClass("is-invalid"); // Thêm lớp "is-invalid" để hiển thị lỗi cho trường nhập liệu
        $('#saiTen').text('Vui long nhap ho va ten dung');
    } else {
        $("#name").removeClass("is-invalid"); // Xóa lớp "is-invalid" nếu trường nhập liệu hợp lệ
        $('#saiTen').text('');
    }
    var dcPattern = /^[A-Za-z]+$/; // Biểu thức chính quy kiểm tra chỉ chứa ký tự
    if (!dcPattern.test(diaChi)) {
        isValid = false;
        $("#address").addClass("is-invalid"); // Thêm lớp "is-invalid" để hiển thị lỗi cho trường nhập liệu
        $('#saiDiaChi').text('Vui long nhap dia chi');
    } else {
        $("#address").removeClass("is-invalid"); // Xóa lớp "is-invalid" nếu trường nhập liệu hợp lệ
        $('#saiDiaChi').text('');
    }
    var ngayHienTai = new Date();
    var ngay = document.getElementById("date").value;

    if (ngay.trim() === '' || ngay.trim() === undefined || new Date(ngay) >= ngayHienTai) {
        isValid = false;
        $("#date").addClass("is-invalid");
        $('#saiNgay').text('Vui long chon ngay');
    } else {
        $("#date").removeClass("is-invalid");
        $('#saiNgay').text('');
    }

    if (gioiTinh === "") {
        isValid = false;
        $("#sex").addClass("is-invalid"); // Thêm lớp "is-invalid" để hiển thị lỗi cho trường nhập liệu
        $('#saiGioiTinh').text('Vui long chon gioi tinh');
    } else {
        $("#sex").removeClass("is-invalid"); // Xóa lớp "is-invalid" nếu trường nhập liệu hợp lệ
        $('#saiGioiTinh').text('');
    }
    var cmnnPattern = /^\d{12}$/;
    if (!cmnnPattern.test(cmnd)) {
        isValid = false;
        $("#cmnd").addClass("is-invalid"); // Thêm lớp "is-invalid" để hiển thị lỗi cho trường nhập liệu
        $('#saiCmnd').text('Vui long nhap cmnd/cccd(12 so)');
    } else {
        $("#cmnd").removeClass("is-invalid"); // Xóa lớp "is-invalid" nếu trường nhập liệu hợp lệ
        $('#saiCmnd').text('');
    }
    var ngayTiems = document.querySelectorAll(".soNgay")
    for (var i = 0; i < parseInt(soLuong) ; i++) {
        var ngayTiem = ngayTiems[i].value;
        var newRow = document.createElement("tr");
        var ngayHienTai = new Date();
        var ngay1 = new Date(ngayTiems[0].value);
        var ngay2 = new Date(ngayTiems[1].value);
        var ngay3 = new Date(ngayTiems[2].value);
        if (ngayTiem.trim() === '' || ngayTiem.trim() === undefined ) {
            isValid = false;
            $(ngayTiems[i]).addClass("is-invalid");
            $(ngayTiems[i].nextElementSibling).text("Vui lòng nhap ngay");
            isValid = false;
        } else {
            $(ngayTiems[i]).removeClass("is-invalid");
            $(ngayTiems[i].nextElementSibling).text("");
        }
        if (isValid) {
            newRow.innerHTML =
                `
          <td>${tbody.rows.length}</td>
          <td>${ten}</td>
          <td>${gioiTinh}</td>
          <td>${ngaySinh}</td>
          <td>${cmnd}</td>
          <td>${vacxin}</td>
          <td>${ngayTiem}</td>
          <td><i class="far fa-trash-alt delete2"></i></td>
        `;
            tbody.appendChild(newRow);
        }
        document.getElementById("soNguoi").innerText = "Danh sach nay co "+(tbody.rows.length -1)+ " nguoi";
        
    }

    if (!isValid) {
        return;
    }
    document.getElementById("name").value = "";
    document.getElementById("cmnd").value = "";
    document.getElementById("date").value = "";
    document.getElementById("address").value = "";
    document.getElementById("sex").value = "";
    document.getElementById("cmnd").value = "";
    document.getElementById("soLuong").value = "";
    document.getElementById("radio1").value ="";
})
$("#tbody").on("click", ".delete2", function () {
    var row = $(this).closest("tr");
    var shouldDelete = confirm("Bạn có chắc muốn xóa Record Data này không?");

    // Nếu người dùng chọn "OK" trong hộp thoại xác nhận
    if (shouldDelete) {
        // Xóa hàng chứa nút "Edit" khỏi bảng
        row.remove();
    }
    document.getElementById("soNguoi").innerText = "Danh sach nay co "+(tbody.rows.length -1)+ " nguoi";

});