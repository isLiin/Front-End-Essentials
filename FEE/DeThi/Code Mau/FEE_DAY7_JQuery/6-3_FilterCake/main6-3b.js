$(document).ready(function() {
  // Xử lý sự kiện khi nhấn vào nút filter



  // Xử lý sự kiện khi người dùng nhập keyword
  $('#searchInput').on('keyup', function() {
    var keyword = $(this).val().toLowerCase();
    var elements = $('.column');

    // Lặp qua từng ảnh và kiểm tra tên
    elements.each(function() {
      var name = $(this).find('.desc h5').text().toLowerCase();

      // Kiểm tra xem tên ảnh có chứa keyword không
      if (name.indexOf(keyword) > -1) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
