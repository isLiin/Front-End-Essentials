var option = prompt(
  "Moi ban chon chuc nang !\n 1. Assignment 1 !\n 2.  2 !\n 3.  3 !  "
);
switch (option) {
  case "1":
    validate();
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

/* ====================================6.1==================================== */
function validate() {
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
  }
