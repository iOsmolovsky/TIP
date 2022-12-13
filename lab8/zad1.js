
let input_names = document.querySelectorAll("input[name='name']")
let input_dates = document.querySelectorAll("input[name='date']")

let names = [], dates = [];

let start_vacation_dates = [];
let end_vacation_dates = [];

(function() {

    let saved_input_names = localStorage.names ? JSON.parse(localStorage.names) : [];
    let saved_input_dates = localStorage.dates ? JSON.parse(localStorage.dates) : [];


    for (let i = 0; i < input_dates.length; i++) {

        if(saved_input_names[i]!=null && saved_input_names!='')
            input_names[i].value = saved_input_names[i]


        if(saved_input_dates[i]!=null) {
            let date = new Date(saved_input_dates[i]);

            let day = date.getDate(),
                month = date.getMonth() + 1,
                year = date.getFullYear(),
                hour = date.getHours(),
                min = date.getMinutes();

            month = (month < 10 ? "0" : "") + month;
            day = (day < 10 ? "0" : "") + day;
            hour = (hour < 10 ? "0" : "") + hour;
            min = (min < 10 ? "0" : "") + min;

            let res = year + "-" + month + "-" + day,
                displayTime = hour + ":" + min;
            input_dates[i].value = res;
        }
    }

}());

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

document.querySelector("input[class='submit']").onclick = function (){
    console.log("it's working")

    names = []
    dates = []
    start_vacation_dates = [];
    end_vacation_dates = []
    for (let i = 0; i < input_names.length; i++) {
        {
            names.push(input_names[i].value)
            let date = new Date(input_dates[i].value)
            dates.push(date)
        }
    }

    for (let i = 0; i < dates.length; i++) {
        let date = new Date(dates[i]);
        date.setMonth(date.getMonth()+(+11));
        start_vacation_dates.push(date);
        endDate = new Date(date);
        endDate.setDate(endDate.getDate()+24);
        end_vacation_dates.push(endDate);
    }
    let area = document.querySelector("textarea[name = 'info']")
    area.value ="";
    for (let i = 0; i < dates.length; i++) {
        if(names[i] != null && names[i] !='')
            area.value += ("Сотрудник "+ names[i]
                + "\nДата заключения контракта:" + dates[i].toLocaleDateString()
                + "\nНачало отпуска: " + start_vacation_dates[i].toLocaleDateString()
                +"\nКонец отпуска: " + end_vacation_dates[i].toLocaleDateString()+"\n")
    }

    localStorage.setItem("names",JSON.stringify(names));
    localStorage.setItem("dates",JSON.stringify(dates));

}

function IsVacationOnMonth(month, date) {
    let start = new Date(date.getFullYear(),month-1,1)
    let end = new Date(date.getFullYear(),month-1, DaysInMonth(month,date))

    if(start<date && date<end)
        return true
    return false
    }




 function DaysInMonth(month,date) {
    return 32 - new Date(date.getFullYear(), month-1, 32).getDate();
};

document.querySelector("input[class='month']").onclick = function (){
    let s_month = document.querySelector("select[class = 'month']")
    let month = s_month.value;

    let area = document.querySelector("textarea[name = 'month']")

    area.value = ("Работники у которых отпуск в месяце " + month +": ")
    let empls = [];

    for (let i = 0; i < start_vacation_dates.length; i++) {
        if(IsVacationOnMonth(month,start_vacation_dates[i]))
            empls.push(names[i])
    }
    for (let i = 0; i < empls.length; i++) {
        console.log(empls[i])
        area.value += ("\n" + empls[i]);
    }
}

document.querySelector("input[class='quarter']").onclick = function (){
    let s_quarter =  document.querySelector("select[class = 'quarter']");
    let quarter = s_quarter.value;
    let area = document.querySelector("textarea[name = 'quarter']")
    area.value = "Работники у которых отпуск в квартале " + quarter + ": "
    for (let i = 0; i < end_vacation_dates.length; i++) {

        let start_quarter = new Date(end_vacation_dates[i].getFullYear(),3*(quarter-1),1)
        let end_quarter = new Date(end_vacation_dates[i].getFullYear(), 2+3*(quarter-1),DaysInMonth(3+3*(quarter-1),end_vacation_dates[i]))

        if(start_quarter < end_vacation_dates[i] && end_vacation_dates[i] < end_quarter){
            area.value += ("\n"+names[i]);
        }
    }
}

document.querySelector("input[class='year']").onclick = function (){
    let area = document.querySelector("textarea[name = 'year']")
    area.value ="";
    for (let i = 0; i < dates.length; i++) {
        if(dates[i].getFullYear()!= start_vacation_dates[i].getFullYear())
            area.value += (names[i] + "\n");
    }
}

document.querySelector("input[class='CLS']").onclick = function (){
    localStorage.clear()
}