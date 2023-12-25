$(document).ready(function () {
    let stt, col;
    let id, fullName, email, phone, mui1Date, mui2Date, status;
    let info;
    let listInfo = [
        { id: 1, fullName: "Diem", phone: "0902666912", email: "diem@gmail.com", tiemChung: ["Da tiem 2 mui", "2023-01-01", "2023-08-08"], status: "Cho xac nhan" },
        { id: 2, fullName: "Diem1", phone: "0902666912", email: "diem@gmail.com", tiemChung: ["Da tiem 1 mui", "2023-01-01"], status: "Khong du dieu kien" },
        { id: 3, fullName: "Diem2", phone: "0902666912", email: "diem@gmail.com", tiemChung: ["Chua tiem"], status: "Khong du dieu kien" }
    ]

    let length = listInfo.length

    disArr(listInfo)

    $("#result tbody").on('click', '#deleteBtn', function () {
        let idDelete = $(this).parent().parent().attr('id')
        listInfo = listInfo.filter((e) => e.id != idDelete)
        disArr(listInfo)
    })

    $("#resetBtn").on('click', function () {
        $("#formInput").trigger('reset')
    })

    function getdata() {
        length++;
        id = length;
        fullName = $("#fullName").val()
        email = $("#email").val()
        phone = $("#phone").val()
        mui1Date = $("#mui1Date").val()
        mui2Date = $("#mui2Date").val()
    }

    $("#saveBtn").on('click', function () {
        if (validate()) {
            getdata()
            status = "Khong du dieu kien"
            info = {
                id: id,
                fullName: fullName,
                phone: phone,
                email: email,
                tiemChung: [],
                status: status
            }
            if ($('#mui2Check').is(':checked')) {
                info.tiemChung.push("Da tiem 2 mui")
                info.tiemChung.push(mui1Date)
                info.tiemChung.push(mui2Date)
                info.status = "Cho xac nhan"

            } else if ($('#mui1Check').is(':checked')) {
                info.tiemChung.push("Da tiem 1 mui")
                info.tiemChung.push(mui1Date)
            } else {
                info.tiemChung.push("Chua tiem")

            }
            listInfo.push(info)
            disArr(listInfo)
            $("#formInput").trigger('reset')
        }
    })

    function validate() {
        var checkFullName = isFullName("#fullName");
        var checkEmail = isMatchEmail("#email");
        var checkPhone = isMatchPhone("#phone");
        var checkAccept = isCheckBox("#accept");
        var checkKhaiBao = isCheckBox("#khaiBao");
        var checkMui1 = true, checkMui2 = true;
        if ($('#mui2Check').is(':checked')) {
            checkMui1 = isMui1('#mui1Date')
            checkMui2 = isMui2('#mui1Date', '#mui2Date')
        } else if ($('#mui1Check').is(':checked')) {
            checkMui1 = isMui1('#mui1Date')
        }

        if (checkMui1 && checkMui2) {
            $(".error").hide()
        } else  {
            $(".error").show()
        }
        return checkFullName && checkEmail && checkPhone && checkAccept && checkKhaiBao && checkMui1 && checkMui2
    }

    function disArr(arr) {
        $("#tableBody").empty()
        stt = 0;
        arr.forEach(element => {
            stt++;
            col = element.tiemChung.length
            $("#tableBody").append(
                `<tr id="${element.id}">
                <td rowspan="${col}">${stt}</td>
                <td rowspan="${col}">${element.fullName}</td>
                <td rowspan="${col}">${element.phone}</td>
                <td rowspan="${col}">${element.email}</td>
                <td>${element.tiemChung[0]}</td>
                <td rowspan="${col}">${element.status}</td>
                <td rowspan="${col}"><button id="deleteBtn" class="btn btn-success">Delete</button></td>
            </tr>`
            )

            for (let i = 1; i < col; i++) {
                $("#tableBody").append(
                    `<tr>
                    <td>${element.tiemChung[i]}</td>
                   </tr>`
                )
            }
        });
        count()
    }

    function count() {
        var duDK = 0;
        listInfo.forEach(element => {
            if (element.tiemChung.length == 3) {
                duDK++;
            }
        });

        $("#soGhe").text(listInfo.length)
        $("#dieuKien").text(duDK)
        $("#kDieuKien").text(listInfo.length - duDK)
    }

    isFullName = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập họ và tên!!!");
            return false
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn nhập sai!");
            return false
        } else {
            $(selector).removeClass("is-invalid")
            return true
        }
    }

    isCheckBox = function () {
        let selector = 'input[type="checkbox"]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa check kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isMui1 = function (selector) {

        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban phai nhap nho hon ngay hien tai");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }

    isMui2 = function (selector, selector2) {
        let namnhapvao = $(selector2).val();
        let ngaykhac = $(selector).val();
        // let ngayht = new Date();
        let sosanh = (new Date(ngaykhac) < new Date(namnhapvao));
        if ($(selector2).val() == "") {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!sosanh) {
            $(selector2).addClass("is-invalid");
            $(selector2).next().html("Ban phai nhap lon hon ngay tiem mui 1");
            return false;
        } else {
            $(selector2).removeClass("is-invalid");
            return true;
        }
    }

    isMatchPhone = function (selector) {
        let regex = /^[0][0-9]{9}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng số điện thoại");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }

    };

    isMatchEmail = function (selector) {
        let regex = /^\w+([\.-]?\w+)*@fpt[\.]vn$/;
        // let regex = /^[a-zA-Z][a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            console.log("ok");
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng mail ");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }

    };
})