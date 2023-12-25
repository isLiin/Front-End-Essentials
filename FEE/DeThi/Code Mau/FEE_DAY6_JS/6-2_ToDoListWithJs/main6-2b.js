window.onload = () => {
  const form1 = document.querySelector("#addForm");

  let items = document.getElementById("items");
  let submit = document.getElementById("submit");
  const clear = document.getElementById("clear");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const lblSuccess = document.getElementById("lblsuccess");

  let editItem = null;

  form1.addEventListener("submit", addItem);
  items.addEventListener("click", removeItem);
  items.addEventListener("remove", removeItem);
  clear.addEventListener("click", clearAll);
  search.addEventListener("input", searchItems);
  sort.addEventListener("click", sortItems);

   // Load items from local storage on page load
   loadItems();
};

function addItem(e) {
  e.preventDefault();

  if (submit.value != "Add Item") {
	const value = input.value;
    if (value === '') {
        showError(input, 'Vui lòng điền vào trường này');
        return; // Dừng việc thực hiện hàm addItem nếu có lỗi
    }

    editItem.target.parentNode.childNodes[0].data =
      document.getElementById("item").value;

    submit.value = "Add Item";
    document.getElementById("item").value = "";

    document.getElementById("lblsuccess").innerHTML =
      "Text edited successfully";

    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
      document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

	// Save items to local storage
	saveItems();

    return false;
  }

  let newItem = document.getElementById("item").value;
  if (newItem.trim() == "" || newItem.trim() == null) return false;
  else document.getElementById("item").value = "";

  let li = document.createElement("li");
  li.className = "list-group-item";

  let deleteButton = document.createElement("button");

  deleteButton.innerHTML =
    "<i class='fa-regular fa-circle-xmark' style='color:red'></i>";
  deleteButton.className = "btn btn-sm float-right delete";

  // deleteButton.appendChild(document.createTextNode("Delete"));
  // deleteButton.appendChild(document.createElement("Delete"));

  let editButton = document.createElement("button");

  editButton.innerHTML =
    "<i class='fa-regular fa-pen-to-square' style='color:#21d1e8'></i>";
  editButton.className = "btn btn-sm float-right edit";

  editButton.appendChild(document.createTextNode(""));

  li.appendChild(document.createTextNode(newItem));
  li.appendChild(deleteButton);
  li.appendChild(editButton);

  items.appendChild(li);

  // Save items to local storage
  saveItems();
}

function removeItem(e) {
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    let li = e.target.parentNode;
    items.removeChild(li);
    document.getElementById("lblsuccess").innerHTML =
      "Text deleted successfully";

    document.getElementById("lblsuccess").style.display = "block";

    setTimeout(function () {
      document.getElementById("lblsuccess").style.display = "none";
    }, 3000);

	// Save items to local storage
	saveItems();
  }
  if (e.target.classList.contains("edit")) {
    document.getElementById("item").value =
      e.target.parentNode.childNodes[0].data;
    submit.value = "Confirm";
    editItem = e;
  }
}

function clearAll(e) {
    e.preventDefault();
    items.innerHTML = "";
    lblSuccess.innerHTML = "All text deleted successfully";
    lblSuccess.style.display = "block";
    setTimeout(function () {
      lblSuccess.style.display = "none";
    }, 3000);

    // Save items to local storage
    saveItems();
  }

  function searchItems(e) {
    const searchValue = e.target.value.toLowerCase();
    const itemList = items.getElementsByTagName("li");

    Array.from(itemList).forEach(function (item) {
      const itemName = item.firstChild.textContent.toLowerCase();
      if (itemName.indexOf(searchValue) !== -1) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  function toggleButton(ref, btnID) {
    document.getElementById(btnID).disabled = false;
  }

  function sortItems() {
    const itemList = Array.from(items.getElementsByTagName("li"));

    itemList.sort(function (a, b) {
      const itemA = a.firstChild.textContent.toLowerCase();
      const itemB = b.firstChild.textContent.toLowerCase();

      if (itemA < itemB) {
        return -1;
      } else if (itemA > itemB) {
        return 1;
      } else {
        return 0;
      }
    });

    itemList.forEach(function (item) {
      items.appendChild(item);
    });
  }


function saveItems() {
    // Get all list items
    const itemList = items.getElementsByTagName("li");

    // Create an array to store the item values
    const itemArray = [];
    for (let i = 0; i < itemList.length; i++) {
      itemArray.push(itemList[i].childNodes[0].data);
    }

    // Convert the array to a string and store it in local storage
    localStorage.setItem("items", JSON.stringify(itemArray));
  }

  function loadItems() {
    // Retrieve items from local storage
    const storedItems = localStorage.getItem("items");

    // Check if there are any stored items
    if (storedItems) {
      const itemArray = JSON.parse(storedItems);

      // Create list items for each stored item
      for (let i = 0; i < itemArray.length; i++) {
        let li = document.createElement("li");
        li.className = "list-group-item";

        let deleteButton = document.createElement("button");

        deleteButton.innerHTML =
          "<i class='fa-regular fa-circle-xmark' style='color:red'></i>";
        deleteButton.className = "btn btn-sm float-right delete";

        let editButton = document.createElement("button");

        editButton.innerHTML =
          "<i class='fa-regular fa-pen-to-square' style='color:#21d1e8'></i>";
        editButton.className = "btn btn-sm float-right edit";

        editButton.appendChild(document.createTextNode(""));

        li.appendChild(document.createTextNode(itemArray[i]));
        li.appendChild(deleteButton);
        li.appendChild(editButton);

        items.appendChild(li);
      }
    }
  }
