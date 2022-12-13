document.querySelector('button').onclick = function(){
    let l = document.querySelector('#lenght').value;
    let a = document.querySelector('#a').value;
    let b = document.querySelector('#b').value;
    let input = [];
    let result = [];
    let s;
    for(let i=0;i<l;i++){
        input.push(randomNum(a,b));
    }
    console.log(input);

    for(let i=0;i<l; i++){
        if(isEven(input[i]) != false && isEven(input[i])!=null){
            result.push(filt(input[i], isEven(input[i])))
        }
        
    }
    document.querySelector('#out_0').innerHTML = input;
    document.querySelector('#out_1').innerHTML = result;
    
    return result;
}

function randomNum(a,b){
    var rand = a - 0.5 + Math.random() * (b-a+1)
    rand = Math.round(rand);
    return rand;
}

function isEven(x){
    return x%2==0;
}

function filt(input, isEven){
    if(isEven){
        return input;
    }
}


