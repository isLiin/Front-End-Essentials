
    // tạo 1 mảng có nhiều data
let data=[
    {
        id: 1,
        maSP: "1001",
        tenSP:  "iphone",
        sl: 20,
        danhMuc: "dien thoai"
    },
    {
        id: 2,
        maSP: "1002",
        tenSP:  "v-smart",
        sl: 20,
        danhMuc: "dien thoai"
    },
    {
        id: 3,
        maSP: "1003",
        tenSP:  "oppo a100",
        sl: 23,
        danhMuc: "dien thoai"
    },
    {
        id: 4,
        maSP: "1004",
        tenSP:  "oppo a10",
        sl: 100,
        danhMuc: "dien thoai"
    }
]

// duyệt mảng để lấy data và insert vào bảng
let tbody_dssp= document.getElementById("tbody_dssp");
let strHTML="";
for (let item of data){
    strHTML+= `
    <tr>
        <td>${item.id}</td>
        <td id="a1">${item.maSP}</td>
        <td id="a2">${item.tenSP}</td>
        <td>${item.sl}</td>
        <td id="a3">${item.danhMuc}</td>
        <td>
            <i class="fa fa-shopping-cart fa-2x cartt" id="${item.id}" aria-hidden="true" ></i> 
        </td>
    </tr>`
}
tbody_dssp.innerHTML= strHTML;

let cartt= document.getElementsByClassName("cartt");
//phieu xuat kho
let id;
let slcon;
let masanpham= document.getElementById("masanpham");
let tensanpham= document.getElementById("tensanpham");
let danhmucsanpham= document.getElementById("danhmucsanpham");
let dongia= document.getElementById("dongia");
let slxk= document.getElementById("slxk");
let ngayxuatkho= document.getElementById("ngayxuatkho");
//click vào cart
for (let c of cartt){
    c.addEventListener("click", ()=>{
        let item= data.find((e)=> e.id==c.id);  // ()=>jadlfjad
        masanpham.value= item.maSP;
        tensanpham.value= item.tenSP;
        danhmucsanpham.value= item.danhMuc;
        id= item.id;
        slcon= item.sl;
    })
}


var count = 1; // biến này để tạo số cho row - tự tăng khi tạo row mới
//danh sách sản phẩm đã xuất
let tbody_dssp_da_xuat = document.getElementById("tbody_dssp_da_xuat");

//nut xuat kho
let btnXuatKho= document.getElementById("xuatkhobtn");// lấy ra theo id của thằng xuất kho
btnXuatKho.addEventListener("click", function(){

    //validate
    let isValidate= false;
    // lấy ra theo id của thẻ p
    let donGiaErr= document.getElementById("dongiaErr");
    let slErr= document.getElementById("slErr");
    let ngayErr= document.getElementById("ngayErr");
    let dem=0;

    if (dongia.value<0){//trả về false
        donGiaErr.style.display="block";// nếu trả về true thì sẽ hiện ra dòng chữ đã ẩn sẵn
    }else {
        donGiaErr.style.display="none";// nếu trả về false thì tiếp tục none
        dem++;
    }

    if (slxk.value<0 || slxk.value> slcon){//trả về false
        slErr.style.display="block";
    }else {
        slErr.style.display="none";
        dem++;
    }

    let date1= new Date(ngayxuatkho.value);
    let date2= new Date();
    if (date1>=date2){//trả về false
        ngayErr.style.display="block";
    }else {
        ngayErr.style.display="none";
        dem++;
    }

    if(dem==3){
        isValidate= true;
    }
    // let kq_dongia = isLastName('#lastname');
    // let kq_slxuatkho = isMatchEmail('#email')
    // let kq_ngayxuatkho = nhoHonNgayHT('#ngayxuatkho')


    if (isValidate){
        let row= tbody_dssp_da_xuat.insertRow();
        let cell0= row.insertCell(0);
        let cell1= row.insertCell(1);
        let cell2= row.insertCell(2);
        let cell3= row.insertCell(3);
        let cell4= row.insertCell(4);
        let cell5= row.insertCell(5);
        let cell6= row.insertCell(6);
        let cell7= row.insertCell(7);
        let cell8= row.insertCell(8);

        cell0.innerHTML= count;
        cell1.innerHTML= masanpham.value;
        cell2.innerHTML= tensanpham.value;
        cell3.innerHTML= danhmucsanpham.value;
        cell4.innerHTML= slxk.value;
        cell5.innerHTML= dongia.value;
        cell6.innerHTML= ngayxuatkho.value;
        cell7.innerHTML= slxk.value*dongia.value;
        cell8.innerHTML= slxk.value*dongia.value;
        cell9.innerHTML= '<i class="fa-solid fas fa-times" onclick="xoadong(this)"></i>'// dùng để clik vào xóa dòng
    
        // masanpham.value="";
        // tensanpham.value="";
        // danhmucsanpham.value="";
        // slxk.value="";
        // dongia.value="";
        // ngayxuatkho.value="";
    }
    count++;
    
})



// event xóa dòng khi click vào
function xoadong(r){
    let i= r.parentNode.parentNode.parentNode.rowIndex;
    var result = confirm("Want to delete?");
    if (result) {
        tbody_dssp_da_xuat.deleteRow(i);
    }
}





 
  









