$(document).ready(function (){
   let task1 = $("#moto_models li:contains('мотоцикл')");

    let task2 = $("#my_links").find("a[href^='documents']");

    let task3 = $("#moto_table").find("tr:odd > *:last-child");

    console.log(task1);
    console.log(task2);
    console.log(task3);
});




