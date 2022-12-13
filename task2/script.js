let data = [];

let employeeCount = 1;

let employeeContainer = document.getElementsByClassName('employee_container')[0];

for (let i = 0; i < employeeCount; i++) {
   let form = getCard(i);
   employeeContainer.appendChild(form);
}

let vacInMonth = document.getElementById('vac-month');
let quarter = document.getElementById('quarter');

vacInMonth.addEventListener('change', (e) => {
   getEmplVacInMonth(Number(e.path[0].value.split("-")[1]));
});

quarter.addEventListener('change', (e) => {
   getEmplEndVacInQuarter(Number(e.path[0].value));
});

function vacInNextYear() {
   let nextYear = document.getElementById('next-year');

   let now = new Date().getFullYear();

   let employeeList = data.filter(el => el.startVacation.getFullYear() === now + 1).map(el => el.surname);

   nextYear.innerHTML = employeeList.join(", ");
}

function getEmplEndVacInQuarter(quarter) {
   let listEndVacQuarter = document.getElementById('list-by-quarter');

   let employeeList = data.filter(el => getQuarter(el.endVacation) === quarter).map(el => el.surname);

   listEndVacQuarter.innerHTML = employeeList.join(", ");
}

function getEmplVacInMonth(month) {
   let listVacMonth = document.getElementById('list-vac-month');

   let employeeList = data.filter(el => el.startVacation.getMonth() === month - 1).map(el => el.surname);

   listVacMonth.innerHTML = employeeList.join(", ");
}

function getCard(id) {
   let form = document.createElement('form');
   form.setAttribute("class", "questionnaire");
   form.setAttribute("id", `questionnaire_${id}`);

   let firstDiv = document.createElement('div');
   form.appendChild(firstDiv);

   let labelForSurname = document.createElement('label');
   labelForSurname.innerHTML = "Фамилия";
   labelForSurname.setAttribute("for", `surname_${id}`);

   firstDiv.appendChild(labelForSurname);

   let br1 = document.createElement('br');
   firstDiv.appendChild(br1);

   let inputForSurname = document.createElement('input');
   inputForSurname.setAttribute("type", "text");
   inputForSurname.setAttribute("id", `surname_${id}`);
   inputForSurname.setAttribute("name", `surname_${id}`);

   firstDiv.appendChild(inputForSurname);

   let secondDiv = document.createElement('div');
   form.appendChild(secondDiv);

   let labelForDate = document.createElement('label');
   labelForDate.setAttribute("for", `date_${id}`);
   labelForDate.innerHTML = "Дата заключения контракта";

   secondDiv.appendChild(labelForDate);

   let br2 = document.createElement('br');
   secondDiv.appendChild(br2);

   let inputForDate = document.createElement('input');
   inputForDate.setAttribute("type", "date");
   inputForDate.setAttribute("id", `date_${id}`);
   inputForDate.setAttribute("name", `date_${id}`);

   secondDiv.appendChild(inputForDate);

   let getVacButton = document.createElement('div');
   getVacButton.innerHTML = "Vacation";
   getVacButton.setAttribute("class", "vacation_btn");
   getVacButton.classList.add("hidden");
   getVacButton.setAttribute("id", `vacation_${id}`);

   form.appendChild(getVacButton);

   getVacButton.addEventListener("click", (e) => {
      alert(`Начало отпуска: ${formatDate(data[id].startVacation, 'en-uk')}\nОкончание отпуска: ${formatDate(data[id].endVacation, 'en-uk')}`);
   });

   let saveButton = document.createElement('div');
   saveButton.innerHTML = "Save";
   saveButton.setAttribute("class", "submit_btn");
   saveButton.setAttribute("id", `submit_${id}`);

   form.appendChild(saveButton);

   saveButton.addEventListener("click", (e) => {
      let surnameValue = inputForSurname.value;
      let dateValue = inputForDate.valueAsDate;
      let getVacButton = document.getElementById(`vacation_${id}`);

      if (surnameValue && dateValue) {
         saveEvent(e, id, surnameValue, dateValue);
         getVacButton.classList.remove("hidden");
      }
      else alert("Заполните все поля!")
   });

   return form;
}

function saveEvent(e, id, surname, date) {
   data[id] = {};
   data[id].id = id;
   data[id].surname = surname;
   data[id].date = date;
   data[id].element = e.path[0];

   let start = new Date(date);
   start.setDate(start.getDate() + 330);
   data[id].startVacation = start;

   let end = new Date(start);

   end.setDate(end.getDate() + 24);
   data[id].endVacation = end;

   vacInNextYear();

   console.log(data)
}

function formatDate(date, format) {
   return date.toLocaleDateString(format, { year: "numeric", month: "short", day: "numeric" });
}

function getQuarter(date) {
   return Math.floor(date.getMonth() / 3 + 1);
}

