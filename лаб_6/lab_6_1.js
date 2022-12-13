(function() {
    var arr =[],
    tmp;

    do{
        tmp = prompt('Введите число', '');
        if(tmp === '' || tmp === null || isNaN(tmp)) 
        break;
        arr.push(+tmp);
    } while (true);

    document.querySelector('#out_0').innerHTML = arr;
    document.querySelector('#out_1').innerHTML = arr.reduce((a,e)=>a+e);
})();