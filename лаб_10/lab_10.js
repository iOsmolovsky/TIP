let arrOfNam =[];


document.querySelector('button[name="date"]').onclick = function(){
    var workDay = new Date(document.querySelector('input[name="date1"]').value);
    var holyDay = new Date(document.querySelector('input[name="date2"]').value);
    var a=0; //кол-во выходных дней
    var b=0; //кол-во рабочих дней
    for (var d = workDay; d<=holyDay; d.setDate(d.getDate()+1)){
        switch(d.getDay()){
            case 0:
                a+=1;
                break;
            case 6:
                a+=1;
                break;
            default:
                b+=1;
        }
    }
    alert("Выходных дней: " + a + " Рабочих дней: " + b);
}
document.querySelector('button[name="load"]').onclick = function () {
    loadData();
}
document.querySelector('button[name="work"]').onclick = function () {
    var expDate;
    var currentDate = new Date()
    let arrOfExp = [];
    var a = 0, b = 0, c = 0;
    for (var i = 0; i <= 5; i++) {
        expDate = new Date(document.getElementById(i).value);
        arrOfExp[i] = getYearDiff(currentDate, expDate);
        if (arrOfExp[i] <= 1) {
            document.querySelectorAll('output')[i].value = "молодой";
            a++;
        }
        if (arrOfExp[i] > 1 && arrOfExp[i] <= 5) {
            document.querySelectorAll('output')[i].value = "опытный";
            b++;
        }
        if (arrOfExp[i] > 5) {
            document.querySelectorAll('output')[i].value = "ветеран";
            c++;
        }
    }
    arrOfNam = [a, b, c];
    saveData();

    let ctx = document.querySelector('#myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['молодой', 'опытный', 'ветеран'],
            datasets: [{
                label: 'рабочие',
                data: [a, b, c],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    });
}

function getYearDiff(date1, date2) {
    return Math.abs(date2.getFullYear() - date1.getFullYear());
}

function saveData(){
    let names=[];
    let dates=[];
    for (var i = 0; i<=5; i++){
        names[i] = document.getElementById(i+6).value;
        dates[i] = document.getElementById(i).value;
    }
    localStorage.setItem("name", JSON.stringify(names));
    localStorage.setItem("date", JSON.stringify(dates));
    
}

function loadData(){
    let savedNamesInput = localStorage.getItem("name");
    let savedDatesInput = localStorage.getItem("date");
    let namesInput = JSON.parse(localStorage.getItem("name"));
    let datesInput = JSON.parse(localStorage.getItem("date"));
    for (var i = 0; i<=5; i++){
        document.getElementById(i+6).value = (namesInput[i+6]);
        document.getElementById(i).value = datesInput[i];
    }

}




