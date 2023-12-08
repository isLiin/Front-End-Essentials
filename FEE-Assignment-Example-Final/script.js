const objStudent = {
    name: "",
    gender: "",
    dob: "",
    
}

// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");
});

const lineData = () => `
    <tr>
        <td>#</td>
        <td>Ho và tên</td>
        <td>Giói tinh</td>
        <td>Ngày sinh</td>
        <td>Khoi</td>
        <td>Lóp hoc</td>
        <td>M. Toán</td>
        <td>M. Ly</td>
        <td>M. Hóa</td>
        <td>D.TB</td>
        <td>
            <button class="btn btn-edit">
                <i class="far fa-edit"></i>
            </button>
            <button class="btn btn-trash">
                <i class="far fa-trash-alt"></i>
            </button>
        </td>
    </tr>
`;
