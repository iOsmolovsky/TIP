var amountOfBig=0;
var allPrice = 0;

document.querySelector('button[name="chek"]').onclick = function(){
    var chek = " ";
    var price = 0;
    price = priceIdent() + sizeident();
    var food = document.querySelector('input[name="dish"]:checked').value;
    var weight = document.querySelector('input[name="size"]:checked').value;
    chek = chek + "Блюдо: " + food + " /порция: " + weight + "г. /цена:" + price +"р.\r\n";
    textOutput(food, weight, price);
    if (weight == '500'){
        amountOfBig +=1;
    }
    allPrice +=price;
}


function textOutput(a, b, c){
    text = ("Блюдо: " + a + " /порция: " + b + "г. /цена:" + c +"р.\r\n")
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(text));
    document.querySelector('ul').appendChild(node);
}

function priceIdent(){
    switch(document.querySelector('input[name="dish"]:checked').value){
        case 'Хинкали': 
            return 5;
        case 'Пхали':
            return 12;
        case 'Хачапури':
            return 10;
        case 'Шашлык':
            return 15;
        case 'Суп харчо':
            return 10;
    }
}

function sizeident(){
    switch(document.querySelector('input[name="size"]:checked').value){
        case '200':
            return 0;
        case '350':
            return 2;
        case '500':
            return 4;
    }
}

function ifTwo(){
    text = ("Блюдо: Напиток" + " /порция: 200 мл." + " /цена: бесплатно")
    var node = document.createElement('li');
    node.appendChild(document.createTextNode(text));
    document.querySelector('ul').appendChild(node);
}

document.querySelector('button[name="order"]').onclick = function(){
    var delivery = confirm("Необходима доставка?");
    var deliveryPrice = 0 ;
    var text;

    if( delivery && amountOfBig < 3){
        deliveryPrice = allPrice*0.05;
    }
    if(amountOfBig >= 2 ){
        ifTwo();
    }
    allPrice +=deliveryPrice;
    if (deliveryPrice>0 && delivery){
        text = "Заказ на сумму: " + allPrice + " Включая доставку: " + deliveryPrice;
    }
    else if (delivery && amountOfBig >= 3){
        text = "Заказ на сумму: " + allPrice + " Включая бесплатную доставку";
    }
    else{
        text = "Заказ на сумму: " + allPrice + " Без доставки";
    }
    document.querySelector('output').value = text;

}