$(document).ready(function () {
    let loaiPhong, nguoiLon, treEm, checkIn, checkOut, soNgay, tong, giaPhong

    function getData() {
        loaiPhong = $("#loaiPhong").val()
        nguoiLon = $("#nguoiLon").val()
        treEm = $("#treEm").val()
    }


    $("#truNguoiLon").on('click', function () {
        nguoiLon = $("#nguoiLon").val() - 1
        if (nguoiLon < 1) {
            alert("So luong nguoi lon phai lon hon hoac bang 1")
            nguoiLon = 1
            $("#nguoiLon").val(nguoiLon)
        }
        $("#nguoiLon").val(nguoiLon)
        if (nguoiLon > 0 && nguoiLon < 4) {
            $("#soNguoiLon").text(nguoiLon)
        } else {
            $("#soNguoiLon").text("")
        }
    })
    $("#congNguoiLon").on('click', function () {
        nguoiLon = parseInt($("#nguoiLon").val()) + 1
        $("#nguoiLon").val(nguoiLon)
        treEm = parseInt($("#treEm").val())
        tong = nguoiLon + treEm
        if (tong > 3) {
            $("#canhBao").text("So luong nguoi vuot qua gioi han cua phong. Chi toi da 3 nguoi/phong")
            $("#nguoiLon").val(0)
            $("#treEm").val(0)

        } else {
            $("#canhBao").text("")
        }
        if (nguoiLon > 0 && nguoiLon < 4) {
            $("#soNguoiLon").text(nguoiLon)
        } else {
            $("#soNguoiLon").text("")
        }
        if (tong > 3) {
            $("#soNguoiLon").text("")
            $("#soTreEm").text("")
        }
    })

    $("#truTreEm").on('click', function () {
        treEm = $("#treEm").val() - 1

        if (treEm === -1) {
            alert("So luong tre em phai lon hon hoac bang 0")
            $("#soTreEm").text("")
            treEm = 0
            $("#treEm").val(treEm)
        } else if (treEm === 1) {
            $("#doTuoi").html(`<select>
            <option selected disabled>-Do tuoi tre em 1-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>`)
        } else if (treEm === 2) {
            $("#doTuoi").html(`<select>
            <option selected disabled>-Do tuoi tre em 1-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>
        <select>
            <option selected disabled>-Do tuoi tre em 2-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>`)
        } else if (treEm === 3) {
            $("#doTuoi").html(`<select>
            <option selected disabled>-Do tuoi tre em 1-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>
        <select>
            <option selected disabled>-Do tuoi tre em 2-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>
        <select>
            <option selected disabled>-Do tuoi tre em 3-</option>
            <option value="1">1</option>
            <option value="2">2</option>

        </select>`)
        } else if (treEm <= 0) {
            $("#doTuoi").html(``)
        }

        $("#treEm").val(treEm)
        $("#soTreEm").text(treEm)
    })
    $("#congTreEm").on('click', function () {

        treEm = parseInt($("#treEm").val())
        if (treEm < 2) {

            treEm = treEm + 1
            if (treEm === 1) {
                $("#doTuoi").html(`<select>
                <option selected disabled>-Do tuoi tre em 1-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                </select>`)
            } else if (treEm === 2) {
                $("#doTuoi").html(`<select>
                <option selected disabled>-Do tuoi tre em 1-</option>
                <option value="1">1</option>
                <option value="2">2</option>

                </select>
                <select>
                    <option selected disabled>-Do tuoi tre em 2-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>

                </select>`)
            } else if (treEm === 3) {
                $("#doTuoi").html(`<select>
                <option selected disabled>-Do tuoi tre em 1-</option>
                <option value="1">1</option>
                <option value="2">2</option>

                </select>
                <select>
                    <option selected disabled>-Do tuoi tre em 2-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>

                </select>
                <select>
                    <option selected disabled>-Do tuoi tre em 3-</option>
                    <option value="1">1</option>
                    <option value="2">2</option>

                </select>`)
            } else if (treEm <= 0) {
                $("#doTuoi").html(``)
            }
            $("#treEm").val(treEm)
            nguoiLon = parseInt($("#nguoiLon").val())
            tong = nguoiLon + treEm
            if (tong > 3) {
                $("#canhBao").text("So luong nguoi vuot qua gioi han cua phong. Chi toi da 3 nguoi/phong")
                $("#nguoiLon").val(0)
                $("#treEm").val(0)
                $("#soNguoiLon").text("")
                $("#soTreEm").text("")
            } else {
                $("#canhBao").text("")
            }

        }
        if (treEm > 0 && treEm < 4) {
            $("#soTreEm").text(treEm)
        } else {
            $("#soTreEm").text("")
        }

    })


    // $("#congTreEm").on('click', function () {
    //     treEm = parseInt($("#treEm").val())
    //     if (treEm === 1) {
    //         $("#treEm").html(`<select>
    //         <option selected disabled>-Do tuoi tre em-</option>
    //         <option value="1">1</option>
    //         <option value="2">2</option>

    //     </select>`)
    //     }
    // })

    $(".changeDate").on('change', function () {
        checkIn = $("#fromDate").val()
        checkOut = $("#toDate").val()
        soNgay = (new Date(checkOut) - new Date(checkIn)) / 1000 / 60 / 60 / 24
        if (soNgay < 0) {
            $("#soNgay").text("Ngay checkout phai lon hon ngay checkIn")
        } else if (soNgay >= 0 && soNgay < 10) {
            $("#soNgay").text("0" + soNgay)
        } else {
            $("#soNgay").text(soNgay)

        }

    })

    $("#loaiPhong").on('change', function () {

        if ($("#nguoiLon").val() < 1) {
            nguoiLon = 1
            $("#nguoiLon").val(1)
            $("#soNguoiLon").text(1)
        }


        loaiPhong = $("#loaiPhong").val()
        if (loaiPhong == "Superior Ocean Twin") {
            giaPhong = "1.500.000"
        } else if (loaiPhong == "Superior Ocean Double") {
            giaPhong = "1.500.000"
        } else if (loaiPhong == "Deluxe Ocean Twin") {
            giaPhong = "2.500.000"
        }
        $("#bodyTable").html(` <tr>
            <td>${loaiPhong}</td>
            <td id="soNguoiLon"></td>
            <td id="soTreEm"></td>
            <td id="tienPhong">${giaPhong}</td>
            </tr>`)

        if (tong < 4 || tong > 0) {
            $("#soNguoiLon").text(nguoiLon)
            $("#soTreEm").text(treEm)
        }
    })

    $(".diffAdd").on('click', function () {
        if (tong > 3 || tong < 0) {
            $("#soNguoiLon").text("")
            $("#soTreEm").text("")
            $("#doTuoi").html(``)
        }
    })


    $("#nguoiLon").on('change', function () {
        nguoiLon = parseInt($("#nguoiLon").val())
        treEm = parseInt($("#treEm").val())
        tong = nguoiLon + treEm

        if (nguoiLon < 1) {
            alert("So luong nguoi lon phai lon hon hoac bang 1")
            $("#nguoiLon").val(1)
            $("#soNguoiLon").text("")
        }
        if (tong > 3) {
            $("#canhBao").text("So luong nguoi vuot qua gioi han cua phong. Chi toi da 3 nguoi/phong")
            $("#nguoiLon").val(1)
            $("#treEm").val(0)
            $("#soNguoiLon").text("")
        } else {
            $("#canhBao").text("")

        }

    })

    $("#treEm").on('change', function () {
        nguoiLon = parseInt($("#nguoiLon").val())
        treEm = parseInt($("#treEm").val())
        tong = nguoiLon + treEm

        if (treEm < 1) {
            alert("So luong tre em phai lon hon hoac bang 0")
            $("#treEm").val(0)
            $("#soTreEm").text("")
            $("#doTuoi").html(``)
        }
        if (tong > 3) {
            $("#canhBao").text("So luong nguoi vuot qua gioi han cua phong. Chi toi da 3 nguoi/phong")
            $("#treEm").val(0)
            $("#nguoiLon").val(1)
            $("#soTreEm").text("")
            $("#doTuoi").html(``)
        } else {
            $("#canhBao").text("")

        }

        if (treEm === 1) {
            $("#doTuoi").html(`<select>
            <option selected disabled>-Do tuoi tre em 1-</option>
            <option value="1">1</option>
            <option value="2">2</option>
            </select>`)
        } else if (treEm === 2) {
            $("#doTuoi").html(`<select>
            <option selected disabled>-Do tuoi tre em 1-</option>
            <option value="1">1</option>
            <option value="2">2</option>

            </select>
            <select>
                <option selected disabled>-Do tuoi tre em 2-</option>
                <option value="1">1</option>
                <option value="2">2</option>

            </select>`)
        } else if (treEm <= 0) {
            $("#doTuoi").html(``)
        }
    })
})