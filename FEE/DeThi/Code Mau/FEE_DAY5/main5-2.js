document.getElementById('personForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Lấy giá trị từ các trường nhập liệu
    var fullName = document.getElementById('fullName').value;
    var birthdate = document.getElementById('birthdate').value;
    var gender = document.getElementById('gender').value;

    // Tính tuổi
    var today = new Date();
    var birthdateObj = new Date(birthdate);
    var age = today.getFullYear() - birthdateObj.getFullYear();

    // Hiển thị thông tin và tuổi
    var output = document.getElementById('output');
    output.innerHTML = "Họ và tên: " + fullName + "<br>";
    output.innerHTML += "Ngày sinh: " + birthdate + "<br>";
    output.innerHTML += "Giới tính: " + gender + "<br>";
    output.innerHTML += "Tuổi: " + age;
});
