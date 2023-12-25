// Tự Tạo thêm validate  cho Jquery
// check String ko có ký tự đặc biệt
jQuery.validator.addMethod(
    "textString",
    function (value, element) {
        let regexText = /^[a-zA-Z0-9]*$/;
        return regexText.test(value);
    },
    "Does not contain special characters and spaces"
);
// check ko lấy giá trị đầu tiền trong select
jQuery.validator.addMethod(
    "checkSelect",
    function (value, element) {
        return value > 0;
    },
    "Don't select the first line"
);
// check email có đuôi fsoft
jQuery.validator.addMethod(
    "emailFsoft",
    function (value, element) {
        let regexEmail = /^([\w]*[\w\.]*(?!\.)@fsoft.com.vn)$/;
        return regexEmail.test(value);
    },
    "Invalid email!Email must be ...@fsoft.com.vn "
);
// check numbercard xxxx-xxxx-xxxx-xxxx
jQuery.validator.addMethod(
    "regexCard",
    function (value, element) {
        let regexCard = /^[0-9]{4}[-][0-9]{4}[-][0-9]{4}[-][0-9]{4}$/;
        return regexCard.test(value);
    },
    "Invalid Card "
);
$(document).ready(function () {
    // tự thêm - sau mỗi 4 số
    $("#Creditcardnumber").keyup(function () {
        value = $(this).val().split("-").join("");
        value = value.match(new RegExp(".{1,4}$|.{1,4}", "g")).join("-");
        $(this).val(value);
    });
    // validate các rule
    $("#form").validate({
        rules: {
            // name của các ô input
            FirstName: {
                //bắt buộc phải nhập
                required: true,
                textString: true,
            },
            LastName: {
                required: true,
                textString: true,
            },
            NameonCard: {
                required: true,
                textString: true,
            },
            Address: {
                required: true,
                textString: true,
            },
            City: {
                required: true,
                textString: true,
            },
            Phone: {
                required: true,
                // phải là số
                digits: true,
                // độ dài tối thiểu
                minlength: 10,
                // độ dài tối đa
                maxlength: 10,
            },
            ZipCode: {
                required: true,
                digits: true,
                minlength: 5,
                maxlength: 5,
            },
            ExpYear: {
                required: true,
                digits: true,
                maxlength: 4,
                // giá trị tối thiểu
                min: 2000,
            },
            ExpMonth: {
                required: true,
                digits: true,
                maxlength: 2,
                // giá trị nằm ở khoảng a->b
                range: [1, 12],
            },
            CVV: {
                required: true,
                digits: true,
                minlength: 3,
                maxlength: 3,
            },
            Creditcardnumber: {
                required: true,
                regexCard: true,
            },
            Email: {
                required: true,
                emailFsoft: true,
            },
            checkbox: {
                required: true,
            },
            inputState: {
                checkSelect: true,
            },
        },
        //Thay đổi thông báo mặc định khi có lỗi
        message: {
            // inputState: {
            //     checkSelect: "abc xyz",
            // },
        },
        // submid khi ko có lỗi
        submitHandler: function (form) {
            setData(getInfo());
            renderListName();
        },
    });
});
// lấy các giá trị từ input lưu vào 1 obj
function getInfo() {
    let formElement = document.querySelector("#form");
    // lấy tất các các trường có name và ko disabled
    let formInputs = formElement.querySelectorAll("[name]:not([disabled])");
    // lặp qua và thêm các field cho obj
    let formValues = Array.from(formInputs).reduce(
        (values, input) => {
            values[input.name] = input.value;
            return values;
        },
        { id: uuid() } // giá trị khởi tạo
    );
    return formValues;
}
// tạo ra mã định danh
function uuid() {
    var temp_url = URL.createObjectURL(new Blob());
    var uuid = temp_url.toString();
    URL.revokeObjectURL(temp_url);
    return uuid.substr(uuid.lastIndexOf("/") + 1);
}
// lấy dữ liệu từ local storage
function getData() {
    return localStorage.getItem("valueInput")
        ? JSON.parse(localStorage.getItem("valueInput"))
        : [];
}
// set dữ liệu cho local storage
function setData(data) {
    let datas = getData();
    if (datas) {
        datas.push(data);
    }
    localStorage.setItem("valueInput", JSON.stringify(datas));
}
// lấy thẻ cha từ thẻ con , tham số đầu vào(thẻ con,tên thẻ cha)
function getparent(element, selector) {
    while (element.parentElement) {
        if (element.parentElement.matches(selector)) {
            return element.parentElement;
        }
        element = element.parentElement;
    }
}
// ren data ra html
function renderListName() {
    let datas = getData();
    if (datas.length > 0) {
        document.getElementById("tbody").innerHTML = "";
        document.getElementById("table").style.display = "block";
        datas.forEach((data) => {
            document.getElementById("tbody").innerHTML += ` 
        <tr id=${data.id}>
            <td>${data.FirstName}</td>
            <td>${data.LastName}</td>
            <td>${data.Email}</td>
            <td>${data.Phone}</td>
            <td>${data.Address}</td>
            <td>${data.City}</td>
            <td>${data.inputState}</td>
            <td>${data.ZipCode}</td>
            <td>${data.NameonCard}</td>
            <td>${data.Creditcardnumber}</td>
            <td>${data.ExpMonth}</td>
            <td>${data.ExpYear}</td>
            <td>${data.CVV}</td>
            <td><a href=""  class="btn btn-outline-danger">Delete</a></td>
          </tr>
            `;
        });
    } else {
        document.getElementById("table").style.display = "none";
    }
}
// xóa data từ local storage
function deleteData() {
    const datas = getData();
    const tbodyElement = document.getElementById("tbody");
    const trElement = tbodyElement.querySelectorAll("tr");
    let btnDelete;
    let id;
    trElement.forEach((element) => {
        btnDelete = element.querySelector(".btn-outline-danger");
        if (btnDelete) {
            btnDelete.addEventListener("click", (e) => {
                let isComfirm = confirm("Do you want Delete !");
                if (isComfirm) {
                    id = getparent(e.target, "tr").id;
                    localStorage.setItem(
                        "valueInput",
                        JSON.stringify(datas.filter((data) => data.id !== id))
                    );
                    renderListName();
                }
            });
        }
    });
}
setTimeout(() => {
    deleteData();
}, 1000);

renderListName();
