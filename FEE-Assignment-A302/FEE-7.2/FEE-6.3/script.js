/**
 * @author Ho Ngoc Khanh
 * @since 1.8.0
 */
'use strict';

/**
 * Handler create a record data.
 * 
 * @param {Object} item 
 * @param {Number} index 
 * @returns 
 */
const recordData = (item, index) => `
                <div class="card" keys="${index}">
                    <img src="${item.art}" class="card-img-top" alt="">
                    <div class="card-body d-flex justify-content-between w-100">
                        <div class="title">${item.title}</div>
                        <div class="price">$${item.price}</div>
                    </div>
                </div>`

/**
 * Handler start GUI.
 */
function startGUI() {
    const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes(""));
    renderGUI(datas);
}

/**
 * Handler render GUI with datas.
 * 
 * @param {Array} datas 
 */
function renderGUI(datas) {
    $("#group-data").html("");
    datas.forEach((item, index) => {
        $("#group-data").append(recordData(item, index));
    })
}

/**
 * Ready function
 * */
$(document).ready(function () {
    startGUI();

    // handler search
    $("#search").on('keyup', function () {
        let search = $(this).val();
        const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
        renderGUI(datas);
    })

    // handler get all
    $("#all").on('click', function () {
        startGUI();
    })

    // handler get cakes items
    $("#cakes").on('click', function () {
        const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes("cake"));
        renderGUI(datas);
    })

    // handler get cupcakes items
    $("#cupcakes").on('click', function () {
        const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes("cupcake"));
        renderGUI(datas);
    })

    // handler get sweets items
    $("#sweets").on('click', function () {
        const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes("sweet"));
        renderGUI(datas);
    })

    // handler get doughnuts items
    $("#doughnuts").on('click', function () {
        const datas = CONTAINER_DATA.filter(item => item.title.toLowerCase().includes("doughnut"));
        renderGUI(datas);
    })
});