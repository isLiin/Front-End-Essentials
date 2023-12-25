$(document).ready(function () {
  let ten, diachi, cmnd, dienthoai, taudi, ngaydi, giodi, slve;
  let arrPerson = [
    {
      id: 1,
      name: "ten",
      CMND: "098765432111",
      phone: "0987654321",
      Taudi: "SE1",
      Ngaydi: "ngaydi",
      Giodi: "giodi",
      Soluongve: "slve",
    }
  ];
  displayData(arrPerson)
  let i = 0;

  function getdata() {
    ten = $("#name").val(); //
    diachi = $("#address").val(); //
    dienthoai = $("#sdt").val(); //
    cmnd = $("#cmnd").val(); //
    taudi = $("#taudi option:selected").val();
    giodi = $("#giodi option:selected").val();
    ngaydi = $("#ngaydi").val();
    slve = $("#slve").val();
  }

  $("#submit").click(function () {
    let kq_ten = isMatch("#name"); //ok
    let kq_diachi = isMatch("#address"); //ok
    let kq_dienthoai = isMatchPhone("#sdt");
    let kq_cmnd = isCMND("#cmnd");
    let kq_ngaydi = nhoHonNgayHT("#ngaydi");
    let kq_taudi = isSelect("#taudi option:selected");
    let kq_giodi = isSelect("#giodi option:selected");
    let kq_slve = isMatchZipCode("#slve");

    if (
      kq_ten &&
      kq_diachi &&
      kq_cmnd &&
      kq_dienthoai &&
      kq_ngaydi &&
      kq_taudi &&
      kq_giodi &&
      kq_slve
    ) {
      getdata(); //
      i++;
      // tạo 1 object
      let person = {
        id: i,
        name: ten,
        CMND: cmnd,
        phone: dienthoai,
        Taudi: taudi,
        Ngaydi: ngaydi,
        Giodi: giodi,
        Soluongve: slve,
      };
      arrPerson.push(person);
      displayData(arrPerson);
      $("form").trigger("reset"); // reset form
    }
    // sau khi update xong thì trả về nut lưu thông tin
    if ($("#submit").val() == 1) {
      $("#submit").html("Lưu thông tin");
      $("#submit").attr("value", "0");
    }
  });

  function displayData(arrPerson) {
    console.log(arrPerson);
    $("tbody").html(""); // tạo tbody rỗng

    // mảng có nhiều phần tử nên phải duyệt mảng để gọi hàm dưới lên để add thông tin vào
    arrPerson.forEach((person) => {
      addSinglePerson(person);
    });
  }
  // thêm table trong thẻ body
  function addSinglePerson(person) {
    let content = `
    <tr id = ${person.id}>
    <td>${person.id}</td>
    <td>${person.name}</td>
    <td>${person.CMND}</td>
    <td>${person.phone}</td>
    <td>${person.Taudi}</td>
    <td>${person.Ngaydi}</td>
    <td>${person.Giodi}</td>
    <td>${person.Soluongve}</td>
    <td><button type="button" class="btn btn-outline-primary btn-sm" id="del" class="delete" style = "border-color: red;color: red;">
                <i class="fas fa-trash-alt"></i>
    </button>
    </td>
  </tr>
    `;
    $("tbody").append(content); // tạo ra nội dung trong thẻ body
  }

  // event chọn khối lớp
  $("#taudi").on("change", function changeGroup(event) {
    const taudi = event.currentTarget.value;

    if (taudi === "SE1") {
      $("#giodi").html(
        '<option value="" disabled selected>Chọn giờ</option><option value="01:00">01:00</option><option value="15:30">15:30</option>'
      );
    } else if (taudi === "SE2") {
      $("#giodi").html(
        '<option value="" disabled selected>Chọn giờ</option><option value="03:00">03:00</option><option value="20:00">20:00</option>'
      );
    }
  });

  // event để xóa khi click vào
  $('tbody').on('click', '#del', function () {
    let cf = confirm("Ban co muon xoa?");
    let id = $(this).parent().parent().attr('id');
    removePerSonByID(id);
  })

  // xóa đối tượng(update)
  function removePerSonByID(id) {
    arrPerson = arrPerson.filter((e) => e.id != id);
    displayData(arrPerson);
  }
});
