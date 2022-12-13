let sources = ["b1.jpg", "b2.jpg", "b3.jpg", "b4.jpg", "b5.jpg"]
const sliderLine = document.querySelector('.slider-line');
var old=0;

function func(x){
    var leftStop = 0;
    clear();
    let arrows = document.getElementsByClassName('arrow');
    arrows[x].style.display = 'inline-block';
    let offset=0;
    offset = offset+250*(x);
    sliderLine.style.left=-offset+"px";
    old = x;
}

function clear(){
    let arrows = document.getElementsByClassName('arrow');
    for (var i=0; i<arrows.length; i++){
        arrows[i].style.display = 'none';
    }
}
