'use strict';

function convertFormatNumber(numb) {
    return Intl.NumberFormat("vi-vn", {
        style: "decimal",
    }).format(numb)
}

const RowItemCar = (car, index) => `
        <tr class="form-list-cars-item">
            <td class="form-list-cars-id">${index + 1}</td>
            <td class="form-list-cars-img"><img src="${car.hinhxe}" alt="${car.loaixe}" /></td>
            <td class="form-list-cars-brand">${car.hangxe}</td>
            <td class="form-list-cars-model">${car.loaixe}</td>
            <td class="form-list-cars-price">${convertFormatNumber(car.giathue)}</td>
            <td class="form-list-cars-status">${car.tinhtrang}</td>
        ${car.tinhtrang === 'Đang được thuê' ?
        '<td class="form-list-cars-action" onclick="handleActionCarInfo(' + index + ')"><button type="button" class="btn" data-toggle="modal" data-target="#exampleModal"><i class="fas fa-info-circle"></i></button></td>'
        : '<td class="form-list-cars-action" onclick="handleActionCarPlug(' + index + ')"><button class="btn"><i class="fas fa-plug"></i></button></td>'
    }
        </tr>
`;
const RowItemOrderCar = (info, index) => `
        <tr class="form-list-orders-item">
            <td>${index + 1}</td>
            <td>${info.fullname}</td>
            <td>${info.phone}</td>
            <td>${DATA_CARS[info.indexCar].hangxe}</td>
            <td>${DATA_CARS[info.indexCar].loaixe}</td>
            <td>${convertFormatNumber(DATA_CARS[info.indexCar].giathue)}</td>
            <td>${info.dateStart}</td>
            <td>${(info.dateEnd.length > 0) ? info.dateEnd : "-"}</td>
            <td>${numbDateDiff(info.dateStart, info.dateEnd)}</td>
            <td>${info.rented}</td>
            <td>${convertFormatNumber(calcDateOrderCar(info))}</td>
        </tr>
`
function calcDateOrderCar(info) {
    let day = numbDateDiff(info.dateStart, info.dateEnd);
    let price = DATA_CARS[info.indexCar].giathue;
    if (info.rented !== "tự lái") {
        let cost = (DATA_CARS[info.indexCar].loaixe === "4 chỗ") ? 500000 : 550000
        return (cost * day) + (day * price)
    }
    return price * day
}


function renderGUISelectionModel() {
    let container = $('.dropdown-menu-model');
    container.html('');
    container.append(`<option class="dropdown-item" value="all" selected>---Chọn loại xe---</option>`)

    const models = new Set();
    DATA_CARS.forEach(car => models.add(car.loaixe))

    models.forEach(model => {
        container.append(`<option class="dropdown-item" value="${model}">${model}</option>`)
    })
}

function renderGUISelectionStatus() {
    let container = $('.dropdown-menu-status');
    container.html('');
    container.append(`<option class="dropdown-item" value="all" selected>---Chọn tình trạng xe---</option>`)

    const models = new Set();
    DATA_CARS.forEach(car => models.add(car.tinhtrang))

    models.forEach(model => {
        container.append(`<option class="dropdown-item" value="${model}">${model}</option>`)
    })
}

function renderGUIListCars() {
    let container = $('#form-list-cars-tbody');
    container.html('');
    // render list cars
    renderFillterCars('all', 'Có Sẵn');
}


function renderFillterCars(model, status) {
    let container = $('#form-list-cars-tbody');
    container.html('');

    DATA_CARS.forEach((car, index) => {
        if (model === 'all' && status === 'all') {
            container.append(RowItemCar(car, index))
        } else if (model === 'all' && status !== 'all') {
            if (car.tinhtrang === status) {
                container.append(RowItemCar(car, index))
            }
        } else if (model !== 'all' && status === 'all') {
            if (car.loaixe === model) {
                container.append(RowItemCar(car, index))
            }
        } else if (model !== 'all' && status !== 'all') {
            if (car.loaixe === model && car.tinhtrang === status) {
                container.append(RowItemCar(car, index))
            }
        }
    })
}

function renderGUIListOrderCars() {
    let container = $('#form-list-order-cars-tbody');
    container.html('');
    // render list cars
    DATA_ORDER_CARS.forEach((car, index) => {
        container.append(RowItemOrderCar(car, index))
    })
}

function handleCleanFormB() {
    $('#form-info-car #form-info-car-brand').val('');
    $('#form-info-car #form-info-car-model').val('');
    $('#form-info-car #form-info-car-price').val('');
}

function handleCleanFormC() {

}
function handleCleanModal() {
    $('#form-modal-car-brand').val('');
    $('#form-modal-car-model').val('');
    $('#form-modal-car-price').val('');
    $('#form-modal-car-fullName').val('');
    $('#form-modal-car-rented').val('');
    $('#form-modal-car-phone').val('');
    $('#form-modal-car-address').val('');
    $('#form-modal-car-dateStart').val('');
    $('#form-modal-car-dateEnd').val('');
    $('#form-modal-car-numberDay').val('');
}

function handleActionCarPlug(index) {
    let car = DATA_CARS[index];
    $('#form-info-car #form-info-car-brand').val(car.hangxe);
    $('#form-info-car #form-info-car-model').val(car.loaixe);
    $('#form-info-car #form-info-car-price').val(convertFormatNumber(car.giathue));
}

function handleActionCarInfo(index) {
    handleCleanModal();
    let info = DATA_ORDER_CARS.filter(item => item.indexCar === index)[0];
    let car = DATA_CARS[info.indexCar];

    $('#form-modal-car-brand').val(car.hangxe);
    $('#form-modal-car-model').val(car.loaixe);
    $('#form-modal-car-price').val(convertFormatNumber(car.giathue));
    $('#form-modal-car-fullName').val(info.fullname);
    $('#form-modal-car-rented').val(info.rented);
    $('#form-modal-car-phone').val(info.phone);
    $('#form-modal-car-address').val(info.address);
    $('#form-modal-car-dateStart').val(info.dateStart);
    $('#form-modal-car-dateEnd').val(info.dateEnd);
    $('#form-modal-car-numberDay').val(numbDateDiff());
}

function numbDateDiff() {
    let dateStart = $('#form-modal-car-dateStart').val();
    let dateEnd = $('#form-modal-car-dateEnd').val();

    let date1 = new Date(dateStart);
    let date2 = (dateEnd !== '') ? new Date(dateEnd) : new Date();
    let diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

function numbDateDiff(dateStart, dateEnd) {
    let date1 = new Date(dateStart);
    let date2 = (dateEnd !== '') ? new Date(dateEnd) : new Date();
    let diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
}

function handleFillterCars() {
    let model = $('.dropdown-menu-model').val();
    let status = $('.dropdown-menu-status').val();
    // render list cars
    renderFillterCars(model, status);
}

function handleSubmitInfoOrderCars() {
    handleCleanFormB();
    handleCleanFormC();

    let fullname = $('#form-info-car-fullName').val();
    let phone = $('#form-info-car-phone').val();
    let address = $('#form-info-car-address').val();
    let dateStart = $('#form-info-car-dateStart').val();
    let dateEnd = $('#form-info-car-dateEnd').val();
    let indexCar = $('#form-info-car-model').val();
    let rented = $('input[name="form-info-car-rented"]:checked').val();

    if (checkValidate(fullname, phone, address, dateStart, dateEnd, indexCar, rented)) {
        DATA_ORDER_CARS.push({
            "fullname": fullname,
            "phone": phone,
            "address": address,
            "dateStart": dateStart,
            "dateEnd": dateEnd,
            "indexCar": indexCar,
            "rented": rented
        });
    
        renderGUIListOrderCars();
    }

}

function checkValidate(fullname, phone, address, dateStart, dateEnd, indexCar, rented) {
    return true;
}

$(document).ready(function () {
    renderGUISelectionModel();
    renderGUISelectionStatus();
    renderGUIListCars();
    renderGUIListOrderCars();

    $('#btn-search').click(handleFillterCars);
    $('#btn-submit').click(handleSubmitInfoOrderCars);
    $('#form-modal-car-dateEnd').on('change', function () {
        $('#form-modal-car-numberDay').val(numbDateDiff)
    });
})