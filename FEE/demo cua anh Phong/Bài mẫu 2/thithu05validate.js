$(document).ready(function() {
    // validate tên 
    isLastName = function(selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[a-zA-Z0-9]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa nhập!!!");
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
    
      // Validate chỉ nhập kí tự
      isMatch = function(selector) {
        let regex = /^[a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn nhập chưa đúng định dạng.");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
      };
      
       // validate bắt buộc và leng i 
       isRequired = function(selector, i) {
        if ($(selector).val().trim() == "" || $(selector).val().length != i) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
      }
      // validate cvv
      isMatchCVV = function(selector) {
        let regex = /^[0-9]{3}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
      };
      // Validate cái mã zip(chuỗi 5 số)
      isMatchZipCode = function(selector) {
        let regex = /^[0-9]{5}$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua đúng định dạng");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
      };
      //validate tháng
      isMatchMonth = function(selector) {
        // let regex = /^0[1-9]|1[0-2]$/;
        let regex = /^(01|02|03|04|05|06|07|08|09|10|11|12)$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Sai thang");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
      };
      //validate năm
      isMatchYear = function(selector) {
        let regex = /^(2\d\d\d)$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap");
            return false;
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Sai năm");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true
        }
      
      };
      // validate sdt
      isMatchPhone = function(selector, i) {
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
      
      
      // Validate Email
      isMatchEmail = function(selector) {
        let regex = /^\w+([\.-]?\w+)*@fsoft[\.]com[\.]vn$/;
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
      
      //  validate Điểm
      isScore = function(selector) {
        let score = parseFloat($(selector).val());
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban chua nhap truong nay");
            return false;
        } else if (score < 0 || score > 10) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban nhap chua phải trong khoảng 0 - 10 ");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
      };

      // Validate selection (chưa chọn)
      isSelect = function(selector) {
        if ($(selector).val() == $("option:first-child").val()) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn chưa nhập lựa chọn:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }

        
      };
      // validate mã số
      isCodeMatch = function(selector) {
        let string = "";
        let string1 = "";
      
        $(selector).keyup(function() {
            let regex = /^[0-9]$/;
            let lastChar = $(selector)
                .val()
                .substr($(selector).val().length - 1);
      
            if (regex.test(lastChar)) {
      // đội dài chuỗi có 19 kí tự
                if ($(selector).val().length == 19) {
                    string1 = $(selector).val();
                }
                if ($(selector).val().length <= 19) {
                  // xuất hiện gạch ngang sau số 4,9,14
                    if ($(selector).val().length == 4 || $(selector).val().length == 9 || $(selector).val().length == 14) {
                        string = $(selector).val();
                    }
      
                    if ($(selector).val().length == 4 || $(selector).val().length == 9 || $(selector).val().length == 14) {
                        $(selector).val(string + "-");
                    }
                } else {
                    $(selector).val(string1);
                }
            } else {
                $(selector).val("");
            }
        });
      }
      
      /// validate checkbox
      isCheckBox = function() {
        let selector = 'input[type="checkbox"]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa nhập kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
      }
      
      // console.log(new Date() > new Date('2022'))
      // validate ngày nhập không được nhỏ hơn năm hiện tại
      nhoHonNamHT = function(selector) {
        let namnhapvao = $(selector).val();
        let ngayht = new Date();
        let sosanh = (ngayht > new Date(namnhapvao));
        if (!sosanh) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Ban phai nhap nho hon năm hien tai");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
      }

        // validate ngày nhập không được nhỏ hơn năm hiện tại
        nhoHonNgayHT = function(selector) {
            let namnhapvao = $(selector).val();
            let ngayht = new Date();
            let sosanh = (ngayht > new Date(namnhapvao));
            if (!sosanh) {
                $(selector).addClass("is-invalid");
                $(selector).next().html("Ngày nhập phải nhỏ hơn ngày hiện tại:");
                return false;
            } else {
                $(selector).removeClass("is-invalid");
                return true;
            }
          }













          // validate thắng
          checkNgaySinh = function(selector){

        var hientai = new Date();
    
        var ngaynhap = new Date(inputElem);
    
        var y = hientai.getTime() - ngaynhap.getTime();
    
    
    
        if(inputElem ==''){
    
            $(elemErr).addClass('text-danger').html("Nhập ngày tháng năm sinh!");
    
            return false;
    
        }else{
    
            if(y < 0){
    
                $(elemErr).addClass('text-danger').html("Ngày tháng năm sinh phải nhỏ hơn ngày hiện tại!");
    
                return false;
    
            }else{
    
                $(elemErr).removeClass('text-danger').html("");
    
                return true;
    
            }
    
        }
    
    }


//validate chọn select và ko chọn option đầu tiên

checkSelectedbox = function (selector){//này này dùng chung cho 2 selected nên xí gọi 2 lần bằng 2 thuộc tính khác nhau cho 2 selected

    // var selected = inputElem.index();

    // console.log(selected)- ra mảng và lấy theo index

    if (inputElem == "") { //value - 0

        $(elemErr).addClass('text-danger').html(msg);

        return false;

    } else {

        $(elemErr).removeClass('text-danger').html("");

        return true;

    }

}

//check số trong input điểm
checkDiem = function(selector){

    var reg = /^([0-9]{1}|[0-9]{1}\.[0-9]{1,2}|10)$/gm;

    // (th1 | th2 | th3)

    // th1 : so nguyen 0- 9 [0-9]{1}

    // th2: so thuc chua 2 so thap phan (6.5, 6.25) [0-9]{1}\.[0-9]{1,2}

    // th3: 10

    if (!reg.test(inputElm)) {

        $(errElm).addClass('text-danger').html("Nhập điểm không hợp lệ, phải là số thực <= 10!!!");

        return false;

    } else {

        $(errElm).removeClass('text-danger').html("");

        return true;

    }  

}











    });