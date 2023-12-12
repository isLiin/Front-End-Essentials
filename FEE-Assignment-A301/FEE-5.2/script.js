const row = (data) => `
                    <div class="record">
                        <div class="name">${data.fullmane}</div>
                        <div class="dob">${data.dob}</div>
                        <div class="gender">${data.gender}</div>
                    </div>`


function add() {
    let name = $("#input_name").val();
    let dob = $("#input_dob").val();
    let gender = $("#input_gender").val();

    if (name.trim().length == 0) {
        $("#input_name").focus();
        return;
    }

    if (dob.trim().length == 0) {
        $("#input_dob").focus();
        return;
    }

    if (gender.trim().length == 0) {
        $("#input_gender").focus();
        return;
    }

    let data = {
        fullmane: name,
        dob: dob,
        gender: gender
    }

    $("#result").append(row(data));

    $("#input_name").val("");
    $("#input_dob").val("");
    $("#input_gender").select("other");
    $("#input_name").focus();
}