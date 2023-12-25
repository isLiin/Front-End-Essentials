var option = prompt(
  "Moi ban chon chuc nang !\n 1. Assignment 1 !\n 2. Assignment 2 !\n 3. Assignment 3 !  "
);
switch (option) {
  case "1":
    Assignment1();
    break;
  case "2":
    Assignment2();
    break;
  case "3":
    Assignment3();
    break;
  default:
    console.log("Lựa chọn không hợp lệ");
    break;
}
/* ------------------------------------5.1-------------------------------------- */
function Assignment1() {
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 11, 15, 13, 12, 14];
  var arrChan = [];
  var arrLe = [];
  var sumChan = 0;
  var sumLe = 0;
  arr.forEach((index) => {
    if (index % 2 == 0) {
      arrChan.push(index);
      sumChan = sumChan + index;
    } else {
      arrLe.push(index);
      sumLe = sumLe + index;
    }
  });

  document.write("arrChan = " + arrChan + "<br>");
  document.write("arrLe = " + arrLe + "<br>");
  document.write("Sum Chan = " + sumChan + "<br>");
  document.write("Sum Le = " + sumLe + "<br>");

  document.write("<br>");

  const a = prompt("nhap a: ");
  const b = prompt("nhap b: ");
  var arrList = [];
  arr.forEach((index) => {
    if (index >= a && index <= b) {
      arrList.push(index);
    }
  });
  document.write(
    "Khoang cach tu  = " +
      a +
      " toi " +
      b +
      " trong mang la: " +
      arrList +
      "<br>"
  );

  document.write("<br>");
  document.write("Sort cach 1: ");
  document.write("<br>");
  arrChan.sort((a, b) => a - b);
  arrLe.sort((a, b) => a - b);

  document.write("Khoang cach Chan trong mang la: " + arrChan + "<br>");
  document.write("Khoang cach Le trong mang la: " + arrLe + "<br>");

  document.write("Sort cach 2: ");
  document.write("<br>");
  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    const pivot = arr[Math.floor(arr.length / 2)];
    const less = [];
    const equal = [];
    const greater = [];

    for (let element of arr) {
      if (element < pivot) {
        less.push(element);
      } else if (element > pivot) {
        greater.push(element);
      } else {
        equal.push(element);
      }
    }

    return [...quickSort(less), ...equal, ...quickSort(greater)];
  }
  const sortedArrayChan = quickSort(arrChan);
  document.write(
    "Khoang cach Chan tu  = " +
      a +
      " toi " +
      b +
      " trong mang la: " +
      sortedArrayChan +
      "<br>"
  );
  const sortedArrayLe = quickSort(arrLe);
  document.write(
    "Khoang cach Chan tu  = " +
      a +
      " toi " +
      b +
      " trong mang la: " +
      sortedArrayLe +
      "<br>"
  );
}

/* ------------------------------------5.2-------------------------------------- */

function Assignment2() {
  const Hoten = prompt("Nhap Ten: ");
  const Ngaysinh = prompt("Nhap Ngay sinh");
  const Gioitinh = prompt("Nhap gioi tinh");
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
}

/* ------------------------------------5.3-------------------------------------- */

function Assignment3() {
  
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
}