$(document).ready(function () {

    let listQuestion = [
        {
            id: "1",
            type: "Single Choice",
            question: "How are you",
            answer: ["Google", "Mozilla", "Hello", "CCCC"],
            dapAn: [0, 1]
        },
        {
            id: "2",
            type: "Single Choice",
            question: "How are you",
            answer: ["Google", "Mozilla", "Hello", "CCCC"],
            dapAn: [0, 1]
        }
    ]
    // let idQues = listQuestion.length
    displayArr()
    let stt = 0
    let countRow, count
    let question, answer, radioChoice, radioAns, dapAn
    // let listAns
    
    function displayArr() {
        console.log("akl");
        $("#bodyTable").empty()
        listQuestion.forEach(question => {
            stt++
            console.log(stt);
            countRow = question.answer.length
            $("#bodyTable").append(` 
            <tr id="${question.id}">
            <td rowspan="${countRow + 1}">${stt}</td>
            <td rowspan="${countRow + 1}">${question.type}</td>
            <td><strong>${question.question}</strong></td>
            <td rowspan="${countRow + 1}" style="width: 10%;"> <button class="btn btn-light" id="deleteRow"><i class="fas fa-close"
                        style="color: red;"></i></button></td>
            </tr>`)

            // if (countRow > 0) {
            // for (let i = 0; i < countRow; i++) {

            //     if (i == 0) {
            //         $("#bodyTable").append(`
            //         <tr>
            //         <td>A. ${question.answer[i]}</td>
            //         </tr>`)
            //     }
            //     if (i == 1) {
            //         $("#bodyTable").append(`
            //         <tr>
            //         <td>B. ${question.answer[i]}</td>
            //         </tr>`)
            //     }
            //     if (i == 2) {
            //         $("#bodyTable").append(`
            //         <tr>
            //         <td>C. ${question.answer[i]}</td>
            //         </tr>`)
            //     }
            //     if (i == 3) {
            //         $("#bodyTable").append(`
            //         <tr>
            //         <td>D. ${question.answer[i]}</td>
            //         </tr>`)
            //     }

            // }
            // }
        });
    }

    $("#tableLon tbody").on('click', '#deleteRow', function () {
        // console.log("vao roi ne");
        let idDelete = $(this).parent().parent().attr('id')
        listQuestion = listQuestion.filter((e) => e.id != idDelete)
        displayArr()
    })

    // $("form .answer").each(function () {
    //     var rowNe = $(this)
    // })
    // $('#addBtn').on('click', function () {

    // })


    function checkInput() {
        var check = true
        // $("form .answer").each(function () {
        //     var rowNe = $(this)
        // })
        $("form input").each(function () {
            var rowNe = $(this)

            if (!isItem(rowTr.find($("#question")))) {
                check = false
            } else {
                $(".invalid-feedback").hide()
            }
        })
    }

    $('#addAnsBtn').on('click', function () {
        var count = 0
        console.log("Vao roi ne");
        $("form input[name=checkAnswer]").each(function () {
            var rowNe = $(this)

            // if (isItem(rowTr.find($(".answer")))) {
            count++
            // }
        })
        console.log(count);
        if (count >= 4) {
            alert('chi them 4 dap an')
        } else if (count == 0) {
            $('#addAnswer').append(`<div class="answerA">
            <div class="d-flex justify-content-between">
                <label for="answer" class="form-label">Answer A</label>
                <button  id="deleteAns" class="btn btn-light"><i class="fas fa-close" style="color: red;"></i></button>
            </div>
            <input type="text" class="form-control answer" id="answer" style="height: 80px;">
            <small class="invalid-feedback"></small>
            <input type="radio" name="checkAnswer" id="check"> Is correct answer
            <small class="invalid-feedback"></small>
        </div>`)
        } else if (count == 1) {
            $('#addAnswer').append(` <div class="answerA">
            <div class="d-flex justify-content-between">
                <label for="answer" class="form-label">Answer B</label>
                <button  id="deleteAns" class="btn btn-light"><i class="fas fa-close" style="color: red;"></i></button>
            </div>
            <input type="text" class="form-control answer" id="answer" style="height: 80px;">
            <small class="invalid-feedback"></small>
            <input type="radio" name="checkAnswer" id="check"> Is correct answer
            <small class="invalid-feedback"></small>
        </div>`)
        } else if (count == 2) {
            $('#addAnswer').append(` <div class="answerA">
            <div class="d-flex justify-content-between">
                <label for="answer" class="form-label">Answer C</label>
                <button  id="deleteAns" class="btn btn-light"><i class="fas fa-close" style="color: red;"></i></button>
            </div>
            <input type="text" class="form-control answer" id="answer" style="height: 80px;">
            <small class="invalid-feedback"></small>
            <input type="radio" name="checkAnswer" id="check"> Is correct answer
            <small class="invalid-feedback"></small>
        </div>`)
        } else if (count == 3) {
            $('#addAnswer').append(` <div class="answerA">
            <div class="d-flex justify-content-between">
                <label for="answer" class="form-label">Answer D</label>
                <button  id="deleteAns" class="btn btn-light"><i class="fas fa-close" style="color: red;"></i></button>
            </div>
            <input type="text" class="form-control answer" id="answer" style="height: 80px;">
            <small class="invalid-feedback"></small>
            <input type="radio" name="checkAnswer" id="check"> Is correct answer
            <small class="invalid-feedback"></small>
        </div>`)
        }
    })

    $('form #addAnswer').on('click', '#deleteAns', function () {
        console.log($(this).parent().parent().attr('class'));
        console.log($(this).parent().parent().remove());

    })

    $('form #cancelBtn').on('click', function () {
        $('#formQues').trigger('reset')

    })
    $('form #addBtn').on('click', function () {


        
        idQues++
        // radioChoice = getChoice()

        // getChiTietAns()

        // console.log(getChoice());
        // console.log(listAns);


        let question = {
            id: idQues,
            type: getChoice(),
            question: $("#question").val(),
            answer: listAns,
            dapAn: [0, 1]
        }
        // console.log(question);


        listQuestion.push(question)
        displayArr()
        $('#formQues').trigger('reset')

    })


    function getChoice() {
        if ($("#inlineRadio1").is(':checked')) {
            return "Single Choice"
        }
        if ($("#inlineRadio2").is(':checked')) {
            return "Multip Choice"
        }
    }

    // function getDapAn() {
    //     // if ($("#inlineRadio1").is(':checked')) {
    //     //     return "Single Choice"
    //     // }
    //     // if ($("#inlineRadio2").is(':checked')) {
    //     //     return "Multip Choice"
    //     // }

    //     $("form #addAnswer input[type=radio]").each(function () {
    //         var rowNe = $(this)
    //         let listAns = []
    //         if (rowTr.find($(".answer")).val() = "") {
    //             radioAns = rowTr.find($(".answer")).val()
    //             console.log(radioAns);
    //         }
    //     })
    // }


    function getChiTietAns() {
        listAns = []
        $("form .answerA").each(function () {
            var rowTr = $(this)
            answer = rowTr.find($(".answer")).val()
            // itemName = rowTr.find($(".itemName")).val()
            // quantity = parseInt(rowTr.find($(".quantity")).val())
            // price = parseInt(rowTr.find($(".price")).val())
            // amount = quantity * price
            // object.total += amount
            // item = { itemName: itemName, quantity: quantity, price: price, amount: amount }
            // object.invoice.push(item)
            listAns.push(answer)
        })
        // console.log(listAns);F
    }

    //   function checkChiTiet() {
    //         var check = true;
    //         $("#chiTiet tbody tr").each(function () {
    //             rowTr = $(this)

    //             if (!isItem(rowTr.find($(".itemName")))) {
    //                 check = false
    //             } else {
    //                 $(".invalid-feedback").hide()
    //             }

    //             if (!isQuantity(rowTr.find($(".quantity")))) {
    //                 check = false
    //             } else {
    //                 $(".invalid-feedback").hide()
    //             }

    //             if (!isPrice(rowTr.find($(".price")))) {
    //                 check = false
    //             } else {
    //                 $(".invalid-feedback").hide()
    //             }
    //         })
    //         return check

    //     }




    isQuestion = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z0-9?]+$/;
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

    isAnswer = function (selector) {
        // let regex = /^(C)[a-zA-z]+$/;
        let regex = /^[ a-zA-Z0-9?.,!()+-*#<>;&]+$/;
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