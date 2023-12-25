
var checkCreditCardID = function (id) {
  if (id.length != 13) return false;
  for (var i = 0, sum = 0; i < 12; i++) {
    sum += parseFloat(id.charAt(i)) * (13 - i);
  }
  if ((11 - sum % 11) % 10 != parseFloat(id.charAt(12))) {
    return false;
  }
  return true;
}

var rules = {
  inNum: { rule: /^[0-9]+$/, errmsg: "Chỉ được nhập số", ruleType: "regex" },
  inNum10: { rule: /^[0-9]{10}$/, errmsg: "Chỉ được nhập 10 số", ruleType: "regex" },
  creditNumb: { rule: checkCreditCardID, errmsg: "Không đúng định dang creadit card (10 số)", ruleType: "function" },
  email: { rule: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, errmsg: "không đúng định dang email", ruleType: "regex" },
  url: { rule: /^(https?:\/\/)?([^\s\/]+\.[^\s\/]+)\/?$/, errmsg: "không đúng định dạng Url", ruleType: "regex" },
  alphaNumeric: { rule: /^[a-zA-Z0-9]+$/, errmsg: "chỉ chứa chữ và số không chưa kí tự đặc biệt", ruleType: "regex" },
}

// function createValidate(r) {
  //check null
  if (!(r && r.rule && r.ruleType)) return;
  if ("regex" === r.ruleType) {
    return function (e) {
      var errorEle = e.target.nextElementSibling;
      if (!r.rule.test(e.target.value)) {
        errorEle.innerHTML = r.errmsg;
        errorEle.style.color = "red";
      } else {
        errorEle.innerHTML = "Đúng";
        errorEle.style.color = "blue";
      }
    };
  } else if ("function" === r.ruleType) {
    return function (e) {
      var errorEle = e.target.nextElementSibling;
      if (!r.rule(e.target.value)) {
        errorEle.innerHTML = r.errmsg;
        errorEle.style.color = "red";
      } else {
        errorEle.innerHTML = "Đúng";
        errorEle.style.color = "blue";
      }
    };
  }
// }

for (var rName in rules) {
  if (rules.hasOwnProperty(rName)) {
    var rule = rules[rName];
    var elist = document.getElementsByClassName(rName);
    for (var i = elist.length; i--;) {
      var ele = elist[i];
      ele.onchange = createValidate(rule);
    }
  }
}