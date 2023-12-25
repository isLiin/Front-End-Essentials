$(document).ready(function() {
  var i = 1;

  // Add To-Do list item
  $(document).on('click', '.add-todo', function() {
    var todoInputData = $(this).siblings('input').val();
    var todoListData = `<div class="row-parent">
                          <div class="list-row">
                            <div class="list-data">` + todoInputData + `</div>
                            <div class="edit-todo"><i class="fa-regular fa-pen-to-square" style="color: #009dff;"></i></i></div>
                            <div class="remove-todo"><i class="far fa-times-circle" style="color: #f00000;"></i></div>
                          </div>
                          <div class="list-error"></div>
                        </div>`;

    if ($.trim(todoInputData) == '') {
      $(this).parents('.todo-content').find('.error').text('You must enter something!');
    } else {
      $(this).parents('.todo-content').find('.todo-list').append(todoListData);
      i++;
      $(this).parents('.todo-content').find('.error').empty();
    }
    $(this).siblings('input').val('');
  });

  // Add To-Do list item when Enter key is pressed
  $(document).keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      $('.add-todo').click();
    }
  });

  // Delete To-Do list item
  $(document).on('click', '.remove-todo', function() {
    $(this).parent('.list-row').parent('.row-parent').remove();
  });

  // Edit To-Do list item
  $(document).on('click', '.edit-todo', function() {
    $(this).attr('class', 'update-todo');
    $(this).html('<i class="fas fa-check" style="color: #0088c2;"></i>');
    var listText = $(this).parent('.list-row').find('.list-data').text();
    var listDataHeight = $(this).parent('.list-row').find('.list-data').innerHeight();
    $(this).parent('.list-row').find('.list-data').attr('class', 'update-data');

    if (listDataHeight > 99) {
      $(this).parent('.list-row').find('.update-data').html('<textarea style="height:' + listDataHeight + 'px">' + listText + '</textarea>');
    } else {
      $(this).parent('.list-row').find('.update-data').html('<textarea style="height:' + listDataHeight + 'px">' + listText + '</textarea>');
    }
  });

  // Update To-Do list item
  $(document).on('click', '.update-todo', function() {
    var listText = $(this).parent('.list-row').find('textarea').val();
    if ($.trim(listText) == '') {
      $(this).parents('.row-parent').find('.list-error').text('You must enter something!');
    } else {
      $(this).attr('class', 'edit-todo');
      $(this).html('<i class="fa-regular fa-pen-to-square" style="color: #009dff;"></i>');
      $(this).parent('.list-row').find('.update-data').attr('class', 'list-data');
      $(this).parent('.list-row').find('.list-data').text(listText);
      $(this).parents('.row-parent').find('.list-error').empty();
    }
  });

  // Sort To-Do list
  $(document).on('click', '.sort-todo', function() {
    var sortedItems = $('.todo-list .list-row').sort(function(a, b) {
      var textA = $(a).find('.list-data').text().toUpperCase();
      var textB = $(b).find('.list-data').text().toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    $('.todo-list').empty().append(sortedItems);
  });

  // Clear All To-Do list items
  $(document).on('click', '.clear-todo', function() {
    $('.todo-list').empty();
  });

  // Search To-Do list
  $(document).on('input', '.search-todo', function() {
    var searchValue = $(this).val().toUpperCase();
    $('.todo-list .list-row').each(function() {
      var listItem = $(this).find('.list-data').text().toUpperCase();
      if (listItem.includes(searchValue)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
  

});
