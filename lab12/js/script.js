//task 1
$(document).ready(function () {
    let texH1 = $('#main_h1').text('текст измененный с помощью jquery');
    //let myLogo = $("img[src*='logo.jpg']").hide();
    //let myLogo = $("#forheader img").hide();
    let myLogo = $("img[alt^='Х']").hide();
    myLogo.hide(3000);
    myLogo.show(3000);
});

//task 2
//let images = $("img:not([alt='Хедер'])").hide(5000);

//task 3
//function changeAttr(id, attr, value) {
//   $(`#${id}`).attr(`${attr}`, `${value}`);
//}

//changeAttr("img_1", "src", "")

//task4
//$(document).ready(() => {
//   $('#img_2').css("border", "1px solid #333333")
//      .animate({ "border-width": "5px" }, 5000, () => $('#forheader').fadeOut(5000));
//});

//task5
//$(document).ready(() => {
//   $('body').append("<p>lorem ipsum doler</p>").attr('id', 'newparagraph')
//      .css("color", "white").css("background-color", "black");
//});
