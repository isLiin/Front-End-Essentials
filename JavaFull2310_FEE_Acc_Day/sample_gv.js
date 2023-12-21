const data = [
    {
      id: 1,
      name: "Test",
      status: "1",
    },
    {
      id: 2,
      name: "Test 2",
      status: "2",
    },
    {
      id: 3,
      name: "Test 3",
      status: "3",
    },
  ];
  
  const statusOptions = [
    {
      id: 1,
      name: "Done",
    },
    {
      id: 2,
      name: "Inprogress",
    },
    {
      id: 3,
      name: "Cancel",
    },
  ];
  
  let selectedItem;
  
  function renderTodoContent() {
    const tbody = $("#todoContent");
  
    let html = "";
    let count = 1;
    for (let item of data) {
      const status = statusOptions.find((it) => it.id == item.status);
  
      html += `
          <tr>
            <td>${count++}</td>
            <td>${item.name}</td>
            <td>${status.name}</td>
            <td>
              <button onclick="handleSelectItem(${
                item.id
              })" class="btn btn-primary">Edit</button>
              <button onclick="deleteTodo(${
                item.id
              })" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        `;
    }
  
    html += `<tr><td></td><td colspan="2" style="background-color: red">merged cell</td><td></td></tr>`;
  
    tbody.html(html);
  }
  
  function handleSelectItem(todoId) {
    const index = data.findIndex((it) => it.id === todoId);
  
    if (index === -1) {
      return;
    }
    const item = data[index];
  
    $('#todoForm input[name="todoName"]').val(item.name);
    $('#todoForm select[name="status"]').val(item.status);
  
    selectedItem = index;
  }
  
  function deleteTodo(todoId) {
    const index = data.findIndex((it) => it.id === todoId);
  
    if (index === -1) {
      return;
    }
    const item = data[index];
  
    if (confirm(`Delete item: ${item.name} ?`)) {
      data.splice(index, 1);
  
      renderTodoContent();
    }
  }
  
  function showError(element, message) {
    element.next(".invalid-feedback").remove();
    element.addClass("is-invalid");
    element.parent().append(`
      <div class="invalid-feedback">${message}</div>
    `);
  }
  
  function hideError(element) {
    element.removeClass("is-invalid");
    element.next(".invalid-feedback").remove();
  }
  
  function addTodo(e) {
    e.preventDefault();
  
    const todoNameElement = $(this.todoName);
    const todoName = todoNameElement.val().trim();
  
    if (!todoName) {
      // Error:
      showError(todoNameElement, "Please input Todo Name");
    } else if (todoName.length < 6) {
      showError(todoNameElement, "Please input 6 characters");
    } else {
      hideError(todoNameElement);
    }
  
    const statusElement = $(this.status);
    if (!statusElement.val()) {
      // Error:
      showError(statusElement, "Please select Todo status");
    } else {
      hideError(statusElement);
    }
  
    const isInvalid = !!$("#todoForm .invalid-feedback").length;
  
    if (isInvalid) {
      return;
    }
  
    if (selectedItem !== undefined) {
      // update
      data[selectedItem] = {
        id: data[selectedItem].id,
        // name: data[selectedItem].name,
        // status: data[selectedItem].status
  
        name: todoName,
        status: statusElement.val(),
      };
      selectedItem = undefined;
    } else {
      // add to list
      data.push({
        id: Math.random() * 100000000,
        name: todoName,
        status: statusElement.val(),
      });
    }
  
    renderTodoContent();
    this.reset();
  }
  
  function renderStatusOptions() {
    const element = $('#todoForm select[name="status"]');
  
    let html = "";
    for (let item of statusOptions) {
      html += `<option value="${item.id}">${item.name}</option>`;
    }
  
    element.append(html);
  }
  
  $(document).ready(function () {
    console.log("ready");
    renderStatusOptions();
    renderTodoContent();
  
    $("#todoForm").on("submit", addTodo);
    $("#todoForm").on("reset", function () {
      // clear error
      // clear selected item
    });
  });