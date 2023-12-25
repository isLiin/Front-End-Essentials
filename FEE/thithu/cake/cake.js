//Dinh nghia ham xu ly su kien khi nhan nut filter

function filterSelection(tag) {
    var elements = document.getElementsByClassName('column');

    //check tag
    if (tag == 'all') {
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'block';
        }
    } else {
        //An cac anh khong thuoc tag
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


//Lap qua tung nut filter va dang ky su kien click

var buttons = document.getElementsByClassName('btn');

Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', function () {
        var current = document.getElementsByClassName('active');
        current[0].className = current[0].className.replace('active', '');
        this.className += ' active';
    }
    )
}
)

//Dinh nghia ham xu ly su kien khi nguoi dung nhap keyword
document.getElementById('searchInput').addEventListener('keyup', function () {
    var keyword = this.value.toLowerCase();
    var elements = document.getElementsByClassName('column');

    //Lap qua tung anh va kiem tra
    Array.prototype.forEach.call(elements, function (element) {
        var name = element.getElementsByClassName('desc')[0].getElementsByTagName('h5')[0].innerText.toLowerCase();

        //kiem tra xem ten anh co chua keyword khong
        if (name.indexOf(keyword) > -1) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }
    )
}
)
    (function () {
        let searchInput = document.getElementById('searchInput');
        let cards = document.getElementsByClassName('card');

        searchInput.addEventListener('input', function (event) {
            let searchValue = event.target.value.toLowerCase();
            Array.from(cards).forEach(function (card) {
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