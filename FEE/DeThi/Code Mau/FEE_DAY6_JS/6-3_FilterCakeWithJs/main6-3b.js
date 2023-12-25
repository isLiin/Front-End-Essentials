// Định nghĩa hàm xử lý sự kiện khi nhấn vào nút filter
function filterSelection(tag) {
    var elements = document.getElementsByClassName('column');
  
    // Kiểm tra tag được chọn
    if (tag === 'all') {
      // Hiển thị tất cả các ảnh
      for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = 'block';
      }
    } else {
      // Ẩn các ảnh không thuộc tag được chọn
      for (var i = 0; i < elements.length; i++) {
        var classNames = elements[i].className.split(' ');
  
        if (classNames.includes(tag)) {
          elements[i].style.display = 'block';
        } else {
          elements[i].style.display = 'none';
        }
      }
    }
  }
  
  // Lặp qua từng nút filter và đăng ký sự kiện click
  var buttons = document.getElementsByClassName('btn');
  
  Array.prototype.forEach.call(buttons, function(button) {
    button.addEventListener('click', function() {
      var current = document.getElementsByClassName('active');
      current[0].className = current[0].className.replace(' active', '');
      this.className += ' active';
    });
  });
  
  // Định nghĩa hàm xử lý sự kiện khi người dùng nhập keyword
  document.getElementById('searchInput').addEventListener('keyup', function() {
    var keyword = this.value.toLowerCase();
    var elements = document.getElementsByClassName('column');
  
    // Lặp qua từng ảnh và kiểm tra tên
    Array.prototype.forEach.call(elements, function(element) {
      var name = element.getElementsByClassName('desc')[0].getElementsByTagName('h5')[0].innerText.toLowerCase();
  
      // Kiểm tra xem tên ảnh có chứa keyword không
      if (name.indexOf(keyword) > -1) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
  });
  
  


(function() {
    let searchInput = document.getElementById('searchInput');
    let cards = document.getElementsByClassName('card');
  
    searchInput.addEventListener('input', function(event) {
        let searchValue = event.target.value.toLowerCase();
        Array.from(cards).forEach(function(card) {
            let cardText = card.querySelector('.card-text');
            let cardBody = card.querySelector('.card-body');
            if (cardText.textContent.toLowerCase().includes(searchValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
  })();
  