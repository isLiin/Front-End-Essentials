window.onload = function() {
  // Declare helper function
  function renderTodoList() {
    // clear list content
    list.innerHTML = '';

    todoList.forEach(todo => {
      var li = document.createElement('li');
      li.classList.add('list-group-item');
      li.classList.add('d-flex');
      li.classList.add('justify-content-between');
      li.dataset.id = todo.id;

      if (todo.isCompleted) {
        li.classList.add('list-group-item-success');
      }

      var span = document.createElement('span');
      span.textContent = todo.text;

      var btnRemove = document.createElement('button');
      btnRemove.dataset.id = todo.id;
      btnRemove.textContent = 'Delete';
      btnRemove.classList.add('btn');
      btnRemove.classList.add('btn-danger');

      li.appendChild(span);
      li.appendChild(btnRemove);

      list.appendChild(li);

      // Implement Delete button
      btnRemove.removeEventListener('click', handleRemove);
      btnRemove.addEventListener('click', handleRemove);

      // Implement Complete functionality
      li.removeEventListener('click', toggleTask);
      li.addEventListener('click', toggleTask);
    });
  }

  function handleRemove(event) {
    event.stopPropagation();

    // remove todo from todoList
    var index = todoList.findIndex(t => t.id == this.dataset.id);
    todoList.splice(index, 1);
    // and re-render todoList
    renderTodoList();
  }

  function toggleTask() {
    // Find index of selected Todo
    var index = todoList.findIndex(t => t.id == this.dataset.id);

    // reverse current value of isCompleted
    todoList[index].isCompleted = !todoList[index].isCompleted;

    // re-render todoList
    renderTodoList();
  }

  // Declare DOM object
  var container = document.querySelector('#tasks');
  var form = container.querySelector('#tasks-form');
  var taskText = form.querySelector('input');
  var list = container.querySelector('#tasks-list');

  // Declare JS Object
  var todoList = [];

  // Binding Events
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // 1. Check if input text is empty
    if (taskText.value == '') {
      // Do nothing
      return;
    }

    // 2. add a new Todo into the todoList
    todoList.push({
      id: new Date().getTime(),
      text: taskText.value,
      isCompleted: false
    });
    // 3. Clear input text
    taskText.value = '';

    // 4. render the todoList
    renderTodoList();
  });
};
