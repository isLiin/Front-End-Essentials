$(document).ready(function () {
    let stt;
    let question, type, answer, choice;
    let listquestions = [
        { id: 1, type: "Single Choice", question: "Cau hoi", answer: ["Dap an 1", "Dap an 2", "Dap an 3"], choice: [1] },
        { id: 2, type: "Single Choice", question: "Cau hoi", answer: ["Dap an 1", "Dap an 2"] },
        { id: 3, type: "Single Choice", question: "Cau hoi", answer: ["Dap an 1", "Dap an 2", "Dap an 3"], choice: [1] },
        { id: 4, type: "Single Choice", question: "Cau hoi", answer: ["Dap an 1", "Dap an 2", "Dap an 3", "Dap an 4"], choice: [1] }
    ]
    let length = listquestions.length
    displayQuestion(listquestions)
    function displayQuestion(arr) {
        stt = 0;
        $("#tableBody").empty()
        arr.forEach(element => {
            stt++
            var col = element.answer.length

            $("#tableBody").append(
                `<tr id="${element.id}">
                <td rowspan="${col + 1}">${stt}</td>
                <td rowspan="${col + 1}">${element.type}</td>
                <td><strong>${element.question}</strong></td>
                <td rowspan="${col + 1}"><button id="deleteQuestionBtn" class="btn btn-light"><i style="color: red;"
                class="fas fa-close"></i></button></td>
                </tr>`
            )

            for (let i = 0; i < col; i++) {
                if (i == 0) {
                    $("#tableBody").append(
                        `<tr>
                    <td>A. ${element.answer[i]}</td>
                    </tr>`
                    )
                }
                if (i == 1) {
                    $("#tableBody").append(
                        `<tr>
                    <td>B. ${element.answer[i]}</td>
                    </tr>`
                    )
                }
                if (i == 2) {
                    $("#tableBody").append(
                        `<tr>
                    <td>C. ${element.answer[i]}</td>
                    </tr>`
                    )
                }
                if (i == 3) {
                    $("#tableBody").append(
                        `<tr>
                    <td>D. ${element.answer[i]}</td>
                    </tr>`
                    )
                }
            }
        });
    }

    $("#cancelBtn").on('click', function () {
        $("#formInput").trigger('reset')
    })

    $("#result tbody").on('click', '#deleteQuestionBtn', function () {
        console.log("aaa");
        var idDelete = $(this).parent().parent().attr('id')
        listquestions = listquestions.filter((e) => e.id != idDelete)
        displayQuestion(listquestions)
    })

    $("#addAnswerBtn").on('click', function () {
        var count = countAnswer()
        if (count == 0) {
            $("#multipAnswer").append(
                `<div class="answer">
                <div class="d-flex justify-content-between">
                    <div class="mt-2">Answer A</div>
                    <button id="deleteAnswerBtn" class="btn btn-light"><i style="color: red;"
                            class="fas fa-close"></i></button>
                </div>
                <input style="height: 100px;" type="text" class="form-control" id="answerQuestion">
                <small class="invalid-feedback"></small>
                <input type="radio" name="choiceAnswer" value="1">Is correct answer
                <small class="invalid-feedback choiceInvalid"></small>
                </div>`
            )
        }
        if (count == 1) {
            $("#multipAnswer").append(
                `<div class="answer">
                <div class="d-flex justify-content-between">
                    <div class="mt-2">Answer B</div>
                    <button id="deleteAnswerBtn" class="btn btn-light"><i style="color: red;"
                            class="fas fa-close"></i></button>
                </div>
                <input style="height: 100px;" type="text" class="form-control" id="answerQuestion">
                <small class="invalid-feedback"></small>
                <input type="radio" name="choiceAnswer" value="2">Is correct answer
                <small class="invalid-feedback choiceInvalid"></small>
                </div>`
            )
        }
        if (count == 2) {
            $("#multipAnswer").append(
                `<div class="answer">
                <div class="d-flex justify-content-between">
                    <div class="mt-2">Answer C</div>
                    <button id="deleteAnswerBtn" class="btn btn-light"><i style="color: red;"
                            class="fas fa-close"></i></button>
                </div>
                <input style="height: 100px;" type="text" class="form-control" id="answerQuestion">
                <small class="invalid-feedback"></small>
                <input type="radio" name="choiceAnswer" value="3">Is correct answer
                <small class="invalid-feedback choiceInvalid"></small>
                </div>`
            )
        }
        if (count == 3) {
            $("#multipAnswer").append(
                `<div class="answer">
                <div class="d-flex justify-content-between">
                    <div class="mt-2">Answer D</div>
                    <button id="deleteAnswerBtn" class="btn btn-light"><i style="color: red;"
                            class="fas fa-close"></i></button>
                </div>
                <input style="height: 100px;" type="text" class="form-control" id="answerQuestion">
                <small class="invalid-feedback"></small>
                <input type="radio" name="choiceAnswer" value="4">Is correct answer
                <small class="invalid-feedback choiceInvalid"></small>
                </div>`
            )
        }
        if (count == 4) {
            alert('Chi co 4 dap an')
        }
    })

    $('#multipAnswer').on('click', "#deleteAnswerBtn", function () {
        $(this).parent().parent().remove()
    })

    function countAnswer() {
        var rowTr = 0
        $("#multipAnswer .answer").each(function () {
            rowTr++
        })
        return rowTr
    }

    $('input[name=choice]').on('change', function () {
        if ($('input[name=choice]:checked').val() == "Multip Choice") {
            if (countAnswer<2) {
                $('#choiceInvalid').text("Vui lòng chọn du so lượng cau trả lời từ 2->4")
            }else if (checkChoice>1) {
                $('#choiceInvalid').text("Vui lòng chọn 1 câu tra loi dung ")            
            }
            
        } else if ($('input[name=choice]:checked').val() == "Single Choice") {
            $('#choiceInvalid').text("")
        }
    })

    function getdata() {
        length++
        question = $("#question").val()
        type = $('input[name=choice]:checked').val()

    }

    $("#addQABtn").on('click', function () {
        if (validate()) {
            getdata()
            let info = {
                id: length,
                type: type,
                question: question,
                answer: [],
                choice: []
            };
            $("#multipAnswer .answer").each(function () {
                console.log("aaa");
                rowTr = $(this)
                answer = rowTr.find($("#answerQuestion")).val()
                info.answer.push(answer)
                choice = rowTr.find($('input[name=choiceAnswer]:checked').val())
                info.choice.push(choice)
            })
            listquestions.push(info)
            displayQuestion(listquestions)

            $('form').trigger('reset')
        }
    })

    function validate() {
        var checkQuestion = isQuestion("#question")
        var checkAnswer = true
        var checkChoice = true
        $("#multipAnswer").each(function () {
            rowTr = $(this)
            checkAnswer = isAnswer(rowTr.find($('input[id=answerQuestion]')))
            // checkChoice = isCheck(rowTr.find($('input[name=choiceAnswer]:checked')))
        })


        var countNe = countCheck()
        if ($('input[name=choice]:checked').val() == "Multip Choice") {
            
        } else if ($('input[name=choice]:checked').val() == "Single Choice") {
            
        }

        return checkQuestion && checkAnswer && checkChoice
    }
    function countCheck() {
        var countRow = 0
        $("#multipAnswer .answer").each(function () {
            rowTr = $(this)

            // checkAnswer = isAnswer(rowTr.find($('input[id=answerQuestion]')))
            if (rowTr.find($('input[name=choiceAnswer]:checked')).is(':checked') != null) {
                countRow++
            }
        })
        return countRow
    }

    isQuestion = function (selector) {
        let regex = /^[ a-zA-Z]+$/;
        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập question!!!");
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
        let regex = /^[ a-zA-Z\.\,\!\?\=\(\)\+\-\*\/\#\<\>]+$/;

        if ($(selector).val() == "") {
            $(selector).addClass("is-invalid");
            $(selector).next().html("Yêu cầu nhập answer!!!");
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

    isCheck = function () {
        let selector = 'input[name=choiceAnswer]';
        if (!$(selector).is(':checked')) {
            $(selector).addClass("is-invalid");
            $(selector).next().next().html("Ban chưa check kìa:");
            return false;
        } else {
            $(selector).removeClass("is-invalid");
            return true;
        }
    }


})