$(document).ready(function(){
    var newItemButton = $('#newItemButton');
    var newItemForm = $('#newItemForm');
    var textInput = $('#itemData');

    newItemButton.show();
    newItemForm.hide();

    //Add new Item
    $('#newItemForm').on('submit',function(e){
        e.preventDefault();
        var newText = $('#itemData').val();
        $('ul li:last').after('<li class="newItem"><a href="">'+newText+'</a></li>');
        newItemForm.hide();
        newItemButton.show();
        textInput.val('');
    });

    //show Form
    $('#newItemButton').on('click', function(){
        newItemButton.hide();
        newItemForm.show();
    });

});