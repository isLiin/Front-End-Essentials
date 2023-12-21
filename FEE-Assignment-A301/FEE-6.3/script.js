'use strict';

const recordData = (item, index) => `
                <div class="card" keys="${index}">
                    <img src="${item.art}" class="card-img-top" alt="">
                    <div class="card-body d-flex justify-content-between w-100">
                        <div class="title">${item.title}</div>
                        <div class="price">$${item.price}</div>
                    </div>
                </div>`


function renderGUI() {
    let groupData = $("#group-data");

    groupData.html("");
    CONTAINER_DATA.forEach((item, index) => {
        groupData.append(recordData(item, index));
    })
}

function Search(keysItem) {
    let groupData = $("#group-data");

    groupData.html("");
    CONTAINER_DATA.forEach((item, index) => {
        if (item.title.toLowerCase().includes(keysItem.toLowerCase())) {
            groupData.append(recordData(item, index));
        }
    })
}

$(document).ready(function () {
    let groupData = $("#group-data");
    renderGUI();

    $("#search").on('keyup', function () {

        let search = $(this).val();
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes(search.toLowerCase())) {
                groupData.append(recordData(item, index));
            }
        })
    })

    $("#all").on('click', function () {
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            groupData.append(recordData(item, index));
        })
    })

    $("#cakes").on('click', function () {
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("cake")) {
                groupData.append(recordData(item, index));
            }
        })
    })

    $("#cupcakes").on('click', function () {
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("cupcake")) {
                groupData.append(recordData(item, index));
            }
        })
    })

    $("#sweets").on('click', function () {
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("sweet")) {
                groupData.append(recordData(item, index));
            }
        })
    })

    $("#doughnuts").on('click', function () {
        groupData.html("");
        CONTAINER_DATA.forEach((item, index) => {
            if (item.title.toLowerCase().includes("doughnut")) {
                groupData.append(recordData(item, index));
            }
        })
    })
});