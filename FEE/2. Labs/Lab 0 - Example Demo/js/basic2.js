$(document).ready(function(){
    $(".btn1").click(function(){
        $("p").show(200);
    });
    $(".btn2").click(function(){
        $("p").hide(200);
    });
    $(".btn3").click(function(){
        $("p").toggle(300);
    });
});