
const dataXe = [
    {
        ID: 1,
        HinhXe: "",
        HangXe: "Kia Morning",
        LoaiXe: "4 chỗ",
        GiaXe: 500000
    },
    {
        ID: 2,
        HinhXe: "",
        HangXe: "Huynhdai I10",
        LoaiXe: "4 chỗ",
        GiaXe: 700000
    },
    {
        ID: 3,
        HinhXe: "",
        HangXe: "Kia K3",
        LoaiXe: "4 chỗ",
        GiaXe: 900000
    },
    {
        ID: 3,
        HinhXe: "",
        HangXe: "Kia Rondo",
        LoaiXe: "4 chỗ",
        GiaXe: 900000
    },
    {
        ID: 4,
        HinhXe: "",
        HangXe: "Toyata Fortuner",
        LoaiXe: "7 chỗ",
        GiaXe: 1100000
    }
];

const dataDatxe = [
    {
        XeID : 1,
        NgayNhan : new Date(2023, 6, 27),
        NgayTra : new Date(2023, 6, 28),
    }

];

$(document).ready(function() {
    settingHangXeCombobox();
    settingDataXe();
    settingDataDatXe();

    $("#btnTimXe").on("click", function() {
        settingDataXe($("#cbbLoaiXe").val(), $("#cbbTinhTrangXe").val());
    });

    $("#btnDatxe").on("click", handleButtonDatxe);

    $("[name='rdbCLoai']").on("change", function() {
        if($("#rdbCLoaithuetaixe").prop("checked")) {
            $("#arePhithutaixe").removeClass("d-none");
        } else {
            $("#arePhithutaixe").addClass("d-none");
        }
    });
});

function settingHangXeCombobox() {
    let cbbHangXe = $("#cbbLoaiXe");

    let html = '<option value="">---Chọn loại xe---</option>';
    $.each(dataXe, function(idx, el) { 
        html += '<option value="' + el.HangXe + '">' + el.HangXe + '</option>';
    });

    cbbHangXe.html(html);
}


function settingDataXe(hangXeSelected, tinhTrangXeSeleted) {

    let toDay = getToDay();

    let tbXeBody = $("#tbXe tbody");

    tbXeBody.html("");

    let htmlBody = "";
    // dataXe.forEach(function(el, idx) {});
    $.each(dataXe, function(idx, el) {
       
        if(hangXeSelected && hangXeSelected != el.HangXe) { return; }
 
        let isDangThue = false;
        for (let idx = 0; idx < dataDatxe.length; idx++) {
            const eleDatxe = dataDatxe[idx];
            
            if (el.ID == eleDatxe.XeID
                && eleDatxe.NgayNhan.getTime() <= toDay.getTime()
                && eleDatxe.NgayTra.getTime() >= toDay.getTime())
            {
                isDangThue = true;
                break;
            }
        }

        if(tinhTrangXeSeleted) {
            if(tinhTrangXeSeleted == "1" && isDangThue) { return;}
            if(tinhTrangXeSeleted == "2" && !isDangThue) { return; }
        }
            
        let htmlBodyTemp = "";
        htmlBodyTemp += "<tr>";
        htmlBodyTemp += "<td>" + (idx + 1) + "</td>";
        htmlBodyTemp += "<td>" + el.HinhXe + "</td>";
        htmlBodyTemp += "<td>" + el.HangXe + "</td>";
        htmlBodyTemp += "<td>" + el.LoaiXe + "</td>";
        htmlBodyTemp += "<td>" + el.GiaXe + "</td>";
        if(isDangThue) {
            htmlBodyTemp += "<td>" + "Đang thuê xe" + "</td>";
            htmlBodyTemp += "<td>" + '<input class="val-id" type="hidden" value="' + el.ID + '"><i class="fa-solid fa-circle-info btn-xe-dangthua"></i>' + "</td>";
        }else {
            htmlBodyTemp += "<td>" + "Có sẵn" + "</td>";
            htmlBodyTemp += "<td>" + '<input class="val-id" type="hidden" value="' + el.ID + '"><i class="fa-solid fa-plug btn-xe-cosan"></i>' + "</td>";
        }

        htmlBodyTemp += "</tr>";
        

        htmlBody += htmlBodyTemp;
    });

    tbXeBody.html(htmlBody);

    addEventTableXe();
}


function addEventTableXe() {

    $(".btn-xe-dangthua").off("click").on("click", handleClickXeDangThue);
    $(".btn-xe-cosan").off("click").on("click", handleClickXeCoSan);

}

function handleClickXeDangThue(e) {
    let idSelected = $(this).closest("tr").find(".val-id").val();

    let dataXeSelected = undefined;
    $.each(dataXe, function(idx, el) {
        if(el.ID == idSelected) {
            dataXeSelected = el;
            return false;
        }
    });

    let dataDatXeSelected = undefined;
    $.each(dataDatxe, function(idx, el) {
        if(el.XeID == idSelected) {
            dataDatXeSelected = el;
            return false;
        }
    });
    
    alert(JSON.stringify(dataXeSelected) + "\n" + JSON.stringify(dataDatXeSelected));
}

function handleClickXeCoSan(e) {
    let idSelected = $(this).closest("tr").find(".val-id").val();

    let dataXeSelected = undefined;
    $.each(dataXe, function(idx, el) {
        if(el.ID == idSelected) {
            dataXeSelected = el;
            return false;
        }
    });

    $("#txtBHangXe").val(dataXeSelected.HangXe);
    $("#txtBLoaiXe").val(dataXeSelected.LoaiXe);
    $("#txtBGiaXe").val(dataXeSelected.GiaXe);

}

function settingDataDatXe() {


}

function handleButtonDatxe() {
    let valBHangXe = $("#txtBHangXe").val();
    let valBLoaiXe = $("#txtBLoaiXe").val();
    let valBGiaXe = $("#txtBGiaXe").val();
    
    if(!valBHangXe || !valBLoaiXe || !valBGiaXe) {
        alert("Mời chọn xe !!!");
        return;
    }


    let valCHoten = $("#txtCHoten").val();
    let valCSodienthoai = $("#txtCSodienthoai").val();
    let valCDiachi = $("#txtCDiachi").val();
    let valCNgaynhan = $("#txtCNgaynhan").val();
    let valCNgaytra = $("#txtCNgaytra").val();

    let regex1 = /^[0-9a-z ]+$/i;
    let regex2 = /^[0-9]{9}$/;

    if (!regex1.test(valCHoten) || !regex1.test(valCDiachi)) {
        alert("Mời nhập Họ tên và Địa chỉ đúng định dạng !!!");
        return;
    }
    
    if (!regex2.test(valCSodienthoai)) {
        alert("Mời nhập số điện thoại đúng định dạng !!!");
        return;
    }

    if(!valCNgaynhan || !valCNgaytra){
        alert("Mời nhập ngày nhận xe và ngày trả xe !!!");
        return;
    }

    let valCNgaynhanDate = parseDate(valCNgaynhan);
    let valCNgaytraDate = parseDate(valCNgaytra);
    let toDay = getToDay();

    if (valCNgaynhanDate.getTime() < toDay.getTime()) {
        alert("Ngày bắt đầu phải >= ngày hiện tại !!!");
        return;
    }

    if (addDate(valCNgaynhanDate, 1).getTime() > valCNgaytraDate.getTime()) {
        alert("Ngày trả phải sau ngày nhận ít nhất 1 ngày !!!");
        return;
    }

    $(".txt-input").val("");
    $("#rdbCLoaitulai").prop("checked", true);
    $("[name='rdbCLoai']").trigger("change");

}


function parseDate(strYMD) {
    let arr = strYMD.split("-");
    return new Date(parseInt(arr[0]), parseInt(arr[1]) - 1, parseInt(arr[2]));
}

function addDate(valDate, valAdd) {
    return new Date(valDate.getFullYear(), valDate.getMonth(), valDate.getDate() + valAdd);
}

function getToDay() {
    let now = new Date(); // Date + Time
    return new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Only Date
}