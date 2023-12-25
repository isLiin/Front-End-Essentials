$(document).ready(function () {
    $("#formF").hide()
    $("#clearBtn").prop("disabled", true)
    $("#nav-search-tab").on('click', function () {
        $("#searchForm").show()
        $("#formF").hide()

    })
    $("#nav-form-tab").on('click', function () {
        $("#searchForm").hide()
        $("#formF").show()

    })

    let stt = 0;
    let listCategory = [
        { id: 1, cover: "##", title: "AAAA", category: "Truyen ky", author: "Diem Nguyen", releaseYear: 2022 },
        { id: 2, cover: "##", title: "BBBB", category: "Truyen ky", author: "Diem Nguyen", releaseYear: 2022 },
        { id: 3, cover: "##", title: "CCCC", category: "Truyen ky", author: "Diem Nguyen", releaseYear: 2022 }
    ]
    appendRow()








    function checkSearch() {
        let checkKeyword = isKeyword("#keyword")
    }

    function checkForm() {
        let checkKeyword = isKeyword("#keyword")


    }

    ("#searchBtn").on('click', function () {



    })






    function search() {

    }

    function appendRow() {
        $("#result").empty();
        listCategory.forEach(element => {
            stt++
            $("#result").append(`<tr>
                                <td>${stt}</td>
                                <td><img src="${element.cover}" alt=""></td>
                                <td>${element.title}</td>
                                <td>${element.category}</td>
                                <td>${element.author}</td>
                                <td>${element.releaseYear}</td>
                                <td><button class="btn btn-primary">Edit</button><button
                                class="btn btn-danger ml-2">Delete</button></td>
                                </tr>`)
        });
    }



    isKeyword = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z]{3}[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập họ và tên!!!");
            return false
        } else if (!regex.test($(selector).val())) {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Bạn nhập sai!");
            return false
        } else {
            $(selector).removeClass("is-invalid")
            return true
        }
    }
})


