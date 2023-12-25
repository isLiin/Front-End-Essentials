// - Viết hàm hiển thị danh sách các giá trị chẵn trong mảng và tổng các giá trị chẵn trong mảng
let arrSoChan = [2, 4, 6, 8, 10, 12, 14, 16]
console.log(arrSoChan);

let sumChan = 0;
arrSoChan.forEach(num => { sumChan += num });
console.log(sumChan);

// - Viết hàm hiển thị danh sách các giá trị lẽ trong mảng và tổng các giá trị lẽ trong mảng

let arrSoLe = [1, 3, 5, 7, 9, 11, 13, 15, 17]
console.log(arrSoLe);

let sumLe = 0;
arrSoLe.forEach(num => { sumLe += num });
console.log(sumLe);

// - Viết hàm hiển thị danh sách các giá trị trong mảng ban đầu có giá trị nằm trong khoảng [a, b]. Trong đó, a và b nhập vào từ bàn phím và a ≥ b.

// let a = prompt("Hãy nhập a:");
// let b = prompt("Hãy nhập b:");

while (b < a) {
    b = prompt("Hãy nhập lai b:");
}

let arr3 = []
for (let i = a; i <= b; i++) {
    arr3.push(i)
}

console.log(arr3);

//- Viết hàm sắp xếp các giá trị trong mảng chứa các giá trị chẵn, mảng chứa các giá trị lẽ và mảng ban đầu theo thứ tự tăng dần. 
//(Viết hàm sắp xếp theo các thuật toán (ít nhất 2 thuật toán): Selection sort, Insertion sort, Merge sort, Quick sort, Stooge Sort)

// document.write("<br>");
// document.write("Sort cach 1: ");
// document.write("<br>");
// arrSoChan.sort((a, b) => a - b);
// arrSoLe.sort((a, b) => a - b);

// document.write("Khoang cach Chan trong mang la: " + arrSoChan + "<br>");
// document.write("Khoang cach Le trong mang la: " + arrSoLe + "<br>");

// document.write("Sort cach 2: ");
// document.write("<br>");
// function quickSort(arr) {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     const pivot = arr[Math.floor(arr.length / 2)];
//     const less = [];
//     const equal = [];
//     const greater = [];

//     for (let element of arr) {
//         if (element < pivot) {
//             less.push(element);
//         } else if (element > pivot) {
//             greater.push(element);
//         } else {
//             equal.push(element);
//         }
//     }

//     return [...quickSort(less), ...equal, ...quickSort(greater)];
// }
// const sortedArrayChan = quickSort(arrSoChan);
// document.write(
//     "Khoang cach Chan tu  = " +
//     a +
//     " toi " +
//     b +
//     " trong mang la: " +
//     sortedArrayChan +
//     "<br>"
// );
// const sortedArrayLe = quickSort(arrSoLe);
// document.write(
//     "Khoang cach Chan tu  = " +
//     a +
//     " toi " +
//     b +
//     " trong mang la: " +
//     sortedArrayLe +
//     "<br>"
// );


// 5.2. Viết đoạn chương trình nhập vào thông tin của một người gồm: họ và tên, ngày sinh, giới tính. Hãy hiển thị thông tin và tuổi của người được nhập;

// const Hoten = prompt("Nhap Ten: ");
// const Ngaysinh = prompt("Nhap Ngay sinh");
// const Gioitinh = prompt("Nhap gioi tinh");
let date = new Date(Ngaysinh);
var year = date.getFullYear();
const currentDate = new Date();
const currentYear = currentDate.getFullYear();
let Tuoi = currentYear - year;

const person = {
    name: Hoten,
    age: Tuoi,
    gender: Gioitinh,
};

document.write("ho va ten la : " + person.name + "<br>");
document.write("tuoi la : " + person.age + "<br>");
document.write("gioi tinh la : " + person.gender + "<br>");

// 5.3. Khai báo Array chứa Data như sau:
// var users = [
//   { id: 1, first_name: "Eamon", last_name: "Harhoff", email: "eharhoff0@imageshack.us", gender: "Male", age: 76, salary: 18888 },
//   { id: 2, first_name: "Laney", last_name: "Whittam", email: "lwhittam1@issuu.com", gender: "Female", age: 42, salary: 15018 },
//   { id: 3, first_name: "Lynett", last_name: "Twinberrow", email: "ltwinberrow2@gov.uk", gender: "Female", age: 99, salary: 13343 }
// ];
// Yêu cầu:
// -	Sử dụng hàm filter để lọc và hiển thị các user có gender là male và age dưới 40;
// -	Sử dụng hàm reduce để tính trung bình chung độ tuổi của các user

var users = [
    { id: 1, first_name: "Eamon", last_name: "Harhoff", email: "eharhoff0@imageshack.us", gender: "Male", age: 76, salary: 18888 },
    { id: 2, first_name: "Laney", last_name: "Whittam", email: "lwhittam1@issuu.com", gender: "Female", age: 42, salary: 15018 },
    { id: 23, first_name: "Lynett", last_name: "Twinberrow", email: "ltwinberrow2@gov.uk", gender: "Female", age: 99, salary: 13343 },
    { id: 1, first_name: "Lalalala", last_name: "rewqrew", email: "ehafdshlkhu0@imageshack.us", gender: "Male", age: 34, salary: 18888 }
];

var findInfo = users.filter(function (users) {
    return users.gender === "Male" && users.age < 40;
})
findInfo.forEach(element => {
    document.write("Thong tin tim kiem gender : 'Male' va age < '40' la : " + element.first_name + "<br>");
});

const calculateAverageAge = (users) => {
    const totalAge = users.reduce((acc, user) => acc + user.age, 0);
    const averageAge = totalAge / users.length;
    return averageAge;
};
const averageAge = calculateAverageAge(users);
document.write("Trung binh tuoi cua cac User la : " + averageAge + "<br>");



/* ------------------------------------Bai2-------------------------------------- */

const validateCreditCard = (creditCard) => /^\d{16}$/.test(creditCard);
const validateNumber = (value) => /^\d+$/.test(value);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validateURL = (url) =>
    /^(https?:\/\/)?(www\.)?[^\s/$.?#].[^\s]*$/.test(url);
const validateAlphaNumeric = (text) => /^[a-zA-Z0-9]+$/.test(text);

console.log(validateCreditCard("1234567890123456")); // true
console.log(validateCreditCard("12345678901234")); // false

console.log(validateNumber("123")); // true
console.log(validateNumber("abc123")); // false

console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("testexample.com")); // false

console.log(validateURL("http://www.w3schools.com/")); // true
console.log(validateURL("https://www.w3schools.com/")); // true
console.log(validateURL("www.w3schools.com")); // true
console.log(validateURL("w3schools.com")); // true
console.log(validateURL("invalidurl")); // false

console.log(validateAlphaNumeric("abc123")); // true
console.log(validateAlphaNumeric("abc@123")); // false

/* ------------------------------------To do list-------------------------------------- */
