'use strict';

const recordData = (item, index) => `
                <div class="card" keys="${index}">
                    <img src="${item.art}" class="card-img-top" alt="">
                    <div class="card-body d-flex justify-content-between w-100">
                        <div class="title">${item.title}</div>
                        <div class="price">$${item.price}</div>
                    </div>
                </div>`

const recordEmpty = `
    <div class="card">
        <div class="card-body d-flex justify-content-between w-100">
            <div class="title">Empty</div>
        </div>
    </div>
`;

function isEmpty() {
    if (CONTAINER_DATA.length == 0) {
        $("#group-data").html("");
        $("#group-data").append(recordEmpty);
    } else {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            $("#group-data").append(recordData(item, index));
        })
    }
}

function Search(keysItem) {
    $("#group-data").html("");
    CONTAINER_DATA.forEach((item, index) => {
        if (item.title.toLowerCase().includes(keysItem.toLowerCase())) {
            $("#group-data").append(recordData(item, index));
        }
    })
}

$(document).ready(function () {
    isEmpty();

    $("#search").on('keyup', function () {
        let search = $(this).val();
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes(search.toLowerCase())) {
                $("#group-data").append(recordData(item, index));
            }
        })
    })

    $("#all").on('click', function () {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            $("#group-data").append(recordData(item, index));
        })
    })

    $("#cakes").on('click', function () {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            if ((item.title.toLowerCase().includes("cake"))) {
                $("#group-data").append(recordData(item, index));
            }
        })
    })

    $("#cupcakes").on('click', function () {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("cupcake")) {
                $("#group-data").append(recordData(item, index));
            }
        })
    })

    $("#sweets").on('click', function () {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("sweet")) {
                $("#group-data").append(recordData(item, index));
            }
        })
    })

    $("#doughnuts").on('click', function () {
        $("#group-data").html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("doughnut")) {
                $("#group-data").append(recordData(item, index));
            }
        })
    })
});