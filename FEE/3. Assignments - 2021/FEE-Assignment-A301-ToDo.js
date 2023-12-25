const ipData = document.getElementById("ipText");
const update_Data = document.getElementById("save_update");
const btnAdd = document.getElementById("btn_add");
const clearBtn = document.getElementById("clear");

var index = 0;

btnAdd.addEventListener("click", function () {
  const data = {
    text: ipData.value
  };
  const clearInput = function () {
    ipData.value = "";
  };
  const index = arrInput;
  index.push({ text: data.text });
  clearInput();
  render(arrInput);
});
var arrInput = [
  {
    text: "Javascrip",
  },
  {
    text: "Jquery",
  }
];
//hien thi thong tin input:
render(arrInput);
function render(arrInput) {
  tbody.innerHTML = "";
  for (let i = 0; i < arrInput.length; i++) {
    const row = document.createElement("tr");

    row.innerHTML = `
        <th scope="row">${i + 1}</th>
        <td class="col-10">${arrInput[i].text}</td>
        <td class="col-1"><button type="submit" class="btn btn-danger ms-1" style="background-color: transparent; border: none;"><i
        class="fa-regular fa-circle-xmark" style="color: #d2202a" onclick="deleteText('${i}')"></button></td>
        <td><button type="submit" class="btn btn-primary" style="background-color: transparent; border: none;"><i class="fas fa-edit"
        style="color: #44c5ea;" onclick="editText('${i}')"></button></td>
        `;
    tbody.appendChild(row);
  }
}
function deleteText(i) {
  arrInput.splice(i, 1);
  render(arrInput);
}
function clearInput() {
  ipData.value = '';
}
update_Data.addEventListener("click", function () {
  arrInput[index].text = ipData.value;
  clearInput();
  render(arrInput);
  document.getElementById("add").classList.remove("d-none")
  document.getElementById("update").classList.add("d-none")
});
function editText(i) {
  document.getElementById("add").classList.add("d-none")
  document.getElementById("update").classList.remove("d-none")
  ipData.value = arrInput[i].text;
  index = i
}
clearBtn.addEventListener("click", function () {
  arrInput.length = 0
  render(arrInput);
});