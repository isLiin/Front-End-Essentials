$(document).ready(function(){
    $('.btn-seat').addClass('d-none');
    // Khai báo và khởi tạo các regEx
    var inputRegEx = /^[a-zA-Z0-9 ]*$/;
    var phoneRegEx = /^\d{10}$/;
    var cccdRegEx = /^[0-9]{12}$/;

    // Khai báo biến nhận dữ liệu
    var train, ngay, gio, gioR, toa, ghe, name, cmnd, loaive , gia, tong;
    // Các biến để đẩy/hiển thị lỗi ra
    var trainErr, ngayErr, gioErr, toaErr, nameErr, cmndErr, loaiveErr;
    // Lưu data vào array
    var arrData = [];
    var arrTickets = [];

    // Validate ngày đi lớn hơn ngày hiện tại và không được để trống
    function validDate(inputElm, errElm) {
        var currentDate = new Date();
        var val = new Date(inputElm);

        if(inputElm == ""){
            $(errElm).text("Hãy chọn ngày đi!");
            return false;
        }
        
        if(val <= currentDate) {
            $(errElm).text("Ngày đi phải lớn hơn ngày hiện tại!");
            return false;
        }
        
        $(errElm).text("");
        return true;
    };

    // Validate CMND có độ dài 12 số
    // Validate tên chỉ chứa chữ và khoảng trắng
    function validInput(inputElm, errElm, regEx){
        if(inputElm == ""){
            $(errElm).text("Trường này không được để trống");
            return false;
        }

        if(!regEx.test(inputElm)) {
            $(errElm).text("Sai định dạng!");
            return false;
        }
        $(errElm).text("");
        return true;
    };

    // Validate chọn SelectBox
    function checkSelectBox(inputElm, errElm, msg) {
        if(inputElm == "none") {
            $(errElm).text(msg);
            return false;
        } else {
            $(errElm).text("");
            return true;
        }
    };

    $('form').on('change', '#train', function() {
        
        $('.btn-seat').addClass('d-none');
        $('.btn-seat').css('background','#dfdfdf')
        $('#ghe').css('background','#dfdfdf');
        var a = $('#train :selected').val();
        $('#gio option').filter(function() {
            $(this).toggle($(this).val().indexOf(a) > -1);
        })
        
    });

    $('form').on('change','#toa', function() {
        $('.btn-seat').removeClass('d-none');
        $('.btn-seat').css('background','#0f6647')
        $('#ghe').css('background','orange');
    });

    // Add Object vào Array --> input là các giá trị thuộc tính
    var last_id = 0;
    function addObjToArray(arrayObj, train, ngay, gioR, toa, ghe) {
        // Step 1: Lấy độ dài của arrObj (lấy số lượng Obj trong arrObj)
        for(var i in arrayObj) {
            last_id = arrayObj[i].id;
        }
        
        // Step 2: Tạo obj mới và gán giá trị cho các thuộc tính
        var newObj = {
            id: last_id + 1, //id tăng lên 1
            train: train,
            ngay: ngay,
            gio: gioR,
            toa: toa,
            ghe: ghe,
        };
        //Step 3: Add obj mới vào arrObj
        arrayObj.push(newObj);
    }

    function addTicketToArray(arrTickets, cmnd, gia){
        var newObj = {
            cmnd: cmnd,
            gia: gia,
        };

        arrTickets.push(newObj);
    }

    function calculateTotal(arrTickets){
        var total = 0;
        for(var i in arrTickets){
            total += parseInt(arrTickets[i].gia);
        }
        return total;
    }

    // Function lấy dữ liệu khi nhấn chọn ghế
    function getData() {
        // Get data
        train = $('#train').val();
        ngay = $('#ngay').val()
        gio = $('#gio :selected').val();
        gioR = $('#gio option:selected').text();
        toa = $('#toa :selected').val();
        
        //chỗ hiển thị errors
        trainErr = $('#trainErr');
        ngayErr = $('#ngayErr');
        gioErr = $('#gioErr');
        toaErr = $('#toaErr');
    };

    function getDataCus(index) {
        name = $(`#name-${index}`).val();
        cmnd = $(`#cm-${index}`).val();
        loaive = $(`#loaive-${index} :selected`).val();
        gia = $(`#gia-${index}`).text();
        

        nameErr = $(`#name-${index}`).next();
        cmndErr = $(`#cm-${index}`).next();
        loaiveErr = $(`#loaive-${index}`).next();
    };

    // Function display data trong object ra
    function displayData(arrayObj) {
        
        arrayObj.forEach(obj => {
            addNewRow(obj.id, obj.train, obj.ngay, obj.gio, obj.toa, obj.ghe);
        });
    };

    // function reset lai cac o nhap thong tin sau khi luu/cap nhat
    function resetForm() {
        $('form').trigger('reset'); // to reset form input
        // $('select').prop('selectedIndex',0); // to reset select box/drop down
        $('#train').prop('selectedIndex',0);
        $('#gio').prop('selectedIndex',0);
        $('#toa').prop('selectedIndex',0);
        // $('input[name="sex"]').prop('checked', false); //to reset radio buttons
    };

    //Xử lý sự kiện ấn chọn ghế
    $('.btn-seat').click(function(){
        $(this).css('background', 'red');
        ghe = $(this).text();

        getData();
        if(arrData.length >= 3){
            alert("Bạn chỉ được đặt tối đa 3 vé!");
            return false;
        }

        var checkTrain = checkSelectBox(train, trainErr,"Hãy chọn tàu!");
        var checkNgay = validDate(ngay, ngayErr);
        var checkGio = checkSelectBox(gio, gioErr, "Hãy chọn giờ đi!");
        var checkToa = checkSelectBox(toa, toaErr, "Hãy chọn 1 toa!");
        if(checkTrain && checkNgay && checkGio && checkToa){
            resetForm();
            addObjToArray(arrData, train, ngay, gioR, toa, ghe);
            displayData(arrData);
        }

        
        
    });

        $('#loaive-1').on('change', function(e){
            e.preventDefault();
            var a = $('#loaive-1 :selected').val();
            console.log(a);
            $('#gia-1').text(a);
        });
        $('#loaive-2').on('change', function(e){
            e.preventDefault();
            var a = $('#loaive-2 :selected').val();
            console.log(a);
            $('#gia-2').text(a);
        });
        $('#loaive-3').on('change', function(e){
            e.preventDefault();
            var a = $('#loaive-3 :selected').val();
            console.log(a);
            $('#gia-3').text(a);
        });

    // Xử lý sự kiện THANH TOÁN 
    $('#btn-thanhtoan').on('click', function(e) {
        e.preventDefault(); // Gửi dữ liệu nhưng dữ màn hình ở lại
        // check các trường không được bỏ trống
        resetForm();
        $('.btn-seat').addClass('d-none');
        $('.btn-seat').css('background','#dfdfdf')
        $('#ghe').css('background','#dfdfdf');
        console.log(arrData);
        var total = 0;
        for(var i = 0; i < arrData.length; i++){
            // getDataCus(); // Lấy dữ liệu từ form
            var index = i + 1;
            name = $(`#name-${index}`).val();
            cmnd = $(`#cm-${index}`).val();
            loaive = $(`#loaive-${index} :selected`).val();
            gia = $(`#gia-${index}`).text();
        

            nameErr = $(`#name-${index}`).next();
            cmndErr = $(`#cm-${index}`).next();
            loaiveErr = $(`#loaive-${index}`).next();
            
            var checkName = validInput(name, nameErr, inputRegEx);
            var checkCMND = validInput(cmnd, cmndErr, cccdRegEx);
            var checkLoaiVe = checkSelectBox(loaive, loaiveErr, "Hãy chọn 1 loại vé");

            // Nếu tất cả các trường hợp lệ thì add và hiển thị data ra table
            if(checkName && checkCMND && checkLoaiVe) {

                
                //Gọi hàm tạo object và add object vào array
                addTicketToArray(arrTickets, cmnd, gia);
                //Display data ra table danh sách hành khách đã mua vé
                // displayData(arrData);
                // countStudents(arrData);
            }
        }
        total = calculateTotal(arrTickets);
        $('#totalResult').text(total);

        var answer = confirm('Tổng tiền của bạn là: '+total +'. Bạn có muốn tiếp tục đặt vé?');
        if(answer){
            
            resetForm();
            $('#trainResult').text("")
            $('#ngayResult').text("")
            $('#gioResult').text("")
            $('#customerList').trigger('reset');
            $('select').prop('selectedIndex',0);
            arrTickets = [];
        }
        
    });

    

    // Add row data
    function addNewRow(id, train, ngay, gioR, toa, ghe) {
        // if(id > 3){
        //     alert("Bạn chỉ được đặt tối đa 3 vé!");
        //     return false;
        // }
        $('#trainResult').text(train);
        $('#ngayResult').text(ngay);
        $('#gioResult').text(gioR);
        $(`#row-${id}`).removeClass('d-none');
        $(`#stt-${id}`).text(id);
        $(`#toa-${id}`).text(toa);
        $(`#ghe-${id}`).text(ghe);
        // resetForm();
    };

    // xử lý sự kiện xóa 1 hàng thông tin
    $('#customerList').on('click', '.btn-xoa', function(e) {
        e.preventDefault();
        var result = confirm("Do you want to delete this row?");
        if(result){
            //Lấy id của hàng cần delete
            var del_id = $(this).closest('tr').find('th').text();
            // Xóa hàng đấy trong table
            $(this).closest('tr').remove();
            //Xóa obj trong arrayData
            deleteObj(del_id, arrData);
        }
    });

    function deleteObj(id, arrayObj) {
        for(var i in arrayObj){
            if(arrayObj[i].id == id){
                arrayObj.splice(i,1);
                break;
            }
        }
        return arrayObj;
    };

    function findObject(input_id, arrayObj){
        return arrayObj.find(({id}) => id == input_id);
    };
    
    // Function sửa thông tin trong Array Object
    function changeData(id, name, phone, train, ngay, address, cccd, gioR, ticketNum) {
        for(var i in arrayObj){
            if(arrayObj[i].id == id){
                arrayObj[i].name = name;
                arrayObj[i].phone = phone;
                arrayObj[i].train = train;
                arrayObj[i].ngay = ngay;
                arrayObj[i].address = address;
                arrayObj[i].cccd = cccd;
                arrayObj[i].gio = gioR;
                arrayObj[i].ticketNum = ticketNum;
            }
        }
        return arrayObj;
    };


});