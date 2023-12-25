$(document).ready(function x() {
    let fullName, email, phone, mui1Date = "", mui2Date = "", status, buyBtn, resetBtn, result;
    buyBtn = $("#buyBtn");
    resetBtn = $("#resetBtn");
    result = document.getElementById("result");
    let i = 0;
    let chuaTiem = true;

    $("#mui1").prop("checked", false);
    $("#mui2").prop("checked", false);



    let listPersons = [
        { id: 1, fullName: "Mark", phone: "(+84)0902666812", email: "diemnguyen@gmail.com", tiemChung: ["Da tiem 2 mui", "09-09-2022", "09-12-2022"], status: "Cho xac nhan" },
        { id: 2, fullName: "Mark", phone: "(+84)0902666812", email: "diemnguyen@gmail.com", tiemChung: ["Da tiem 1 mui", "09-01-2023"], status: "Khong du dieu kien" },
        { id: 3, fullName: "Mark", phone: "(+84)0902666812", email: "diemnguyen@gmail.com", tiemChung: ["Chua tiem"], status: "Khong du dieu kien" }
    ]

    displayArr(listPersons)

    $("#buyBtn").on('click', () => {
        i = listPersons.length
        let flag = false;
        let checkName = isName("#fullName");
        let checkEmail = isMatchEmail("#email");
        let checkPhone = isMatchPhone("#phone")
        let checkAccecpt = ischeckbox("#accept", "Đồng ý tuân thủ quy định 5K");
        let checkKhaiBao = ischeckbox("#khaiBao", "Khai báo Y tế khi đến Sân vận động");
        let checkMui1 = false;
        let checkMui2 = false;
        let checkAfter = false;

        // Neu nhu ca hai mui deu uncheck
        if (!$("#mui1").is(':checked') && !$("#mui2").is(':checked')) {
            checkMui1 = true;
            checkMui2 = true;
            checkAfter = true;
            chuaTiem = true
        }
        // console.log($("#mui1").is(':checked'));
        // console.log($("#mui2").is(':checked'));

        if ($("#mui1").is(':checked')) {
            checkMui1 = nhoHonNamHT("#mui1Date")
            if (checkMui1) {
                mui1Date = $("#mui1Date").val();
            }
        } else if (!$("#mui1").is(':checked')) {
            chuaTiem = true
            checkMui1 = true;
        }


        if ($("#mui2").is(':checked')) {
            checkMui2 = nhoHonNamHT("#mui2Date")
            checkAfter = lonHonNamHTandNgayKhac("#mui1Date", "#mui2Date")

            if (checkMui2 && checkAfter) {
                mui2Date = $("#mui2Date").val();
                $("#mui2Date").next().hide();

            } else {
                $("#mui2Date").next().show();

            }
        } else if (!$("#mui2").is(':checked')) {
            checkMui2 = true;
            checkAfter = true;
            mui2Date = "";
        }

        console.log(checkMui1);
        console.log(checkMui2);
        console.log(checkAfter);
        console.log(mui1Date);
        console.log(mui2Date);


        if (checkName && checkEmail && checkPhone && checkAccecpt && checkKhaiBao && checkMui1 && checkMui2 && checkAfter) {
            getData()

            let ve = { id: i + 1, fullName: fullName, phone: phone, email: email, tiemChung: [], status: status };
            if (chuaTiem) {
                ve.tiemChung.push("Chua tiem")
                flag = true;
            } else if (mui1Date != "" && mui2Date == "") {
                ve.tiemChung.push("Da tiem 1 mui")
                ve.tiemChung.push(mui1Date)
                flag = true

            } else if (mui1Date != "" && mui2Date != "") {
                ve.tiemChung.push("Da tiem 2 mui")
                ve.tiemChung.push(mui1Date)
                ve.tiemChung.push(mui2Date)
                flag = true
            }

            if (flag) {
                // $(".invalid-feedback").hide()
                listPersons.push(ve)
                displayArr(listPersons)
                $("form").trigger("reset");
            }

        }
    });

    // $("#deleteBtn").on('click', function () {
        $('tbody').on('click', '#deleteBtn', function () {
        let cf = confirm("Ban co muon xoa?");
        let id = $(this).parent().parent().attr('id');
        // console.log(id);
        removeTicket(id);
    })

    function removeTicket(id) {
        listPersons = listPersons.filter((e) => e.id != id);
        displayArr(listPersons);
    }
    function getData() {
        fullName = $("#fullName").val();
        email = $("#email").val();
        phone = $("#phone").val();

        if (mui1Date != "" && mui2Date != "") {
            status = "Cho xac nhan"
        } else {
            status = "Khong du dieu kien"
        }

    }

    function displayArr(array) {
        result.innerHTML = "";
        for (let i = 0; i < array.length; i++) {
            result.innerHTML += appendRow(array[i])
        }
        count(listPersons)
    }


    function appendRow(object) {
        let rowSpan = object.tiemChung.length;
        let html = `<tr id="${object.id}">
            <td rowspan="${rowSpan}">${object.id}</td>
            <td rowspan="${rowSpan}">${object.fullName}</td>
            <td rowspan="${rowSpan}">${object.phone}</td>
            <td rowspan="${rowSpan}">${object.email}</td>
            <td>${object.tiemChung[0]}</td>
            <td rowspan="${rowSpan}">${object.status}</td>
            <td rowspan="${rowSpan}"><button class="btn btn-success deleteBtn" id="deleteBtn">Delete</button></td>
            </tr>`;
        if (rowSpan > 1) {
            for (let i = 1; i < rowSpan; i++) {
                html += `<tr><td>Mui ${i}: ${object.tiemChung[i]}</td></tr>`;
            }
        }
        return html;
    }

    function count(arr) {
        let duDK = []
        let kDuDK = []

        arr.forEach(element => {
            if (element.status == "Cho xac nhan") {
                duDK.push(element)
            } else if (element.status == "Khong du dieu kien") {
                kDuDK.push(element)
            }
        });

        $("#totalNum").text(listPersons.length)
        $("#duDKNum").text(duDK.length)
        $("#koDuDKNum").text(kDuDK.length)
    }

    $("#resetBtn").on('click', () => {
        $("#ddddd").trigger("reset");
    })

    //Bat su kien khi click mui 1, mui 2

    $("#mui1Date").prop("disabled", true);
    $("#mui2Date").prop("disabled", true);
    $("#mui2").prop("disabled", true);


    $("#mui1").on('change', () => {

        if ($("#mui1").is(':checked')) {
            $("#mui1Date").prop("disabled", false)
            $("#mui2").prop("disabled", false)
            console.log('checked');
            chuaTiem = false;
        } else {
            $("#mui1Date").prop("disabled", true)
            $("#mui2Date").prop("disabled", true)
            $("#mui2").prop("disabled", true)
            $("#mui2").prop('checked', false)
            chuaTiem = true
        }
    })

    $("#mui2").on('change', () => {
        if ($("#mui2").is(':checked')) {
            $("#mui2Date").prop("disabled", false)
        } else {
            $("#mui2Date").prop("disabled", true)
        }
    });
})