$(document).ready(function () {
  var listData = [];
  const inputMSP = $("#input-Masp");
  const inputTenSP = $("#input-Tensp");
  const inputSoluong = $("#input-Soluong");
  const inputDongia = $("#input-Dongia");
  const inputMota = $("#input-Mota");
  const btnAddGoods = $("#btn-addGoods");
  const btnAdd = $("#btn-add");
  const inputSlpay = $("#ip-slpay");
  const btnDelete = $("#btn-delete");
  const RowOrder = document.getElementById("row-order");
  const TBody = document.getElementById("tbody");
  const btnPay = $("#btn-pay");
  const btnCancelpay = $("#btn-cancelpay");
  const inputSearch = $("#ip-search");
  const btnSearch = $("#btn-search");

  var arrKhachHang = [];
  var arrLichSuMuaHang = [];

  /*Validate*/
  function validateData(data) {
    resultCheck = true;
    if (!checkMSP()) {
      resultCheck = false;
    }
    if (!checkTSP()) {
      resultCheck = false;
    }
    if (!checkSL()) {
      resultCheck = false;
    }
    if (!checkDGia()) {
      resultCheck = false;
    }
    if (!checkMoTa()) {
      resultCheck = false;
    }
    return resultCheck;
  }
  let err = "";
  let txt = "";
  let regex = "";
  function checkDGia() {
    err = $("#input-Dongia");
    txt = $("#sp-dongia");
    regex = /^[0-9]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Đơn giá chưa đúng");
      err.addClass("is-invalid");
      return false;
    }
  }
  function checkMoTa() {
    err = $("#input-Mota");
    txt = $("#sp-mota");
    regex = /^[a-zA-Z0-9\s]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Yều cầu nhập mô tả");
      err.addClass("is-invalid");
      return false;
    }
  }
  function checkMSP() {
    err = $("#input-Masp");
    txt = $("#sp-masanpham");
    regex = /^[a-zA-Z0-9\s]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Yêu cầu nhập mã");
      err.addClass("is-invalid");
      return false;
    }
  }

  function checkTSP() {
    err = $("#input-Tensp");
    txt = $("#sp-tensanpham");
    regex = /^[a-zA-Z0-9\s]+$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Yều cầu nhập tên");
      err.addClass("is-invalid");
      return false;
    }
  }

  function checkSL() {
    err = $("#input-Soluong");
    txt = $("#sp-soluong");
    regex = /^[1-9]\d*$/i;
    txt.html("");
    err.removeClass("is-valid").removeClass("is-invalid");
    if (regex.test(err.val())) {
      err.addClass("is-valid");
      return true;
    } else {
      txt.html("Số lượng chưa đúng");
      err.addClass("is-invalid");
      return false;
    }
  }


  /** Xử lý nút đặt hàng*/
  btnAddGoods.on("click", function () {
    $("#row-order").find(".is-valid").removeClass("is-valid");
    $("#row-order").removeClass("d-none");
  });
  function ipclear() {
    inputMSP.val("");
    inputTenSP.val("");
    inputSoluong.val("");
    inputDongia.val("");
    inputMota.val("");
  }


  /**Xử lý nút xóa */
  btnDelete.on("click", function () {
    ipclear();
    RowOrder.className = "d-none";
  });


  /**Nút thêm sản phẩm */
  btnAdd.on("click", function () {
    const data = {
      MSP: inputMSP.val(),
      TenSP: inputTenSP.val(),
      DGia: inputDongia.val(),
      SL: inputSoluong.val(),
      MoTa: inputMota.val(),
    };

    if (validateData(data)) {
      arrKhachHang.push(data);
      renderKhachHang(arrKhachHang);
      RowOrder.className = "d-none";
      ipclear();
    }
  });

  function updatePrice(msp) {
    for (var i = 0; i < arrKhachHang.length; i++) {
      if (arrKhachHang[i].MSP === msp.DhMSP) {
        arrKhachHang[i].SL = arrKhachHang[i].SL - msp.DhSL;
      }
    }
  }

  function renderKhachHang(data) {
    TBody.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
      var row = document.createElement("tr");
      row.innerHTML = `
          <td>${data[i].MSP}</td>
          <td>${data[i].TenSP}</td>
          <td>${data[i].SL}</td>
          <td>${data[i].DGia}</td>
          <td>${data[i].MoTa}</td>
          <td class="pl-3 ">
              <button class="btn-order" style="background-color: #0d79ff; width: 60%; height: 35px;" data="${data[i].MSP}">Đặt Hàng</button>
              <button class="btn-cancel" style="background-color: #d9354a; width: 30%; height: 35px;" data="${data[i].MSP}">Xóa</button>
          </td>
          `;
      TBody.appendChild(row);
    }
  }
   /**order row ds hàng hóa */
  $(document).on("click", ".btn-order", function () {
    $("#dathang").removeClass("invisible");
    $("#ip-slpay").removeAttr("disabled");
    let masp = $(this).attr("data");
    for (var i = 0; i < arrKhachHang.length; i++) {
      if (arrKhachHang[i].MSP === masp) {
        $("#pay-msp").val(arrKhachHang[i].MSP);
        $("#pay-tsp").val(arrKhachHang[i].TenSP);
      }
    }
  });
  /**Xóa row ds hàng hóa */
  $(document).on("click", ".btn-cancel", function () {
    let masp = $(this).attr("data");
    for (var i = 0; i < arrKhachHang.length; i++) {
      if (arrKhachHang[i].MSP === masp) {
        arrKhachHang.splice(i, 1);
      }
    }
    renderKhachHang(arrKhachHang);
  });
  /**Nút mua hàng */
  btnPay.on("click", function () {
    $("#dathang").addClass("invisible");
    function gia(msp) {
      for (var i = 0; i < arrKhachHang.length; i++) {
        if (arrKhachHang[i].MSP === msp) {
          return arrKhachHang[i].DGia;
        }
      }
    }
    const data = {
      DhMSP: $("#pay-msp").val(),
      DHTSanPham: $("#pay-tsp").val(),
      DhSL: inputSlpay.val(),
      DHDonGia: gia($("#pay-msp").val()),
      TT: gia($("#pay-msp").val()) * inputSlpay.val(),
    };

    const clearDH = function () {
      $("#pay-msp").val("");
      $("#pay-tsp").val("");
      inputSlpay.val("");
    };
      arrLichSuMuaHang.push(data);
      clearDH();
      renderLichSuMuaHang(arrLichSuMuaHang);
      updatePrice(data);
      renderKhachHang(arrKhachHang);
      const sum = arrLichSuMuaHang.reduce(function (
        previousValue,
        currentValue
      ) {
        return previousValue + currentValue.TT;
      },
      0);
      console.log(sum)
      $("#tongtien").html(sum);
  });
  function renderLichSuMuaHang(arrLichSuMuaHang) {
    $("#dataAll").html("");
    for (var i = 0; i < arrLichSuMuaHang.length; i++) {
      var row = document.createElement("tr");
      row.innerHTML = `
          <th>${i + 1}</th>
          <td>${arrLichSuMuaHang[i].DhMSP}</td>
          <td>${arrLichSuMuaHang[i].DHTSanPham}</td>
          <td>${arrLichSuMuaHang[i].DhSL}</td>
          <td>${arrLichSuMuaHang[i].TT}</td>         
          `;
      $("#dataAll").append(row);
    }
  }
  btnSearch.click(function (e) {
    let valueSearch = inputSearch.val();
    let listSearch = [];
    if (valueSearch === '') {
        renderLichSuMuaHang(arrLichSuMuaHang);
        return;
    }
    for (let i = 0; i < arrLichSuMuaHang.length; i++) {
        if (arrLichSuMuaHang[i].DhMSP.includes(valueSearch) || arrLichSuMuaHang[i].DHTSanPham.includes(valueSearch)) {
            listSearch.push(arrLichSuMuaHang[i]);
        }
    }
    console.log(listSearch);
    renderLichSuMuaHang(listSearch);
  })
});
