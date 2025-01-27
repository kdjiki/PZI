const datepicker = document.querySelector(".datepicker");
const dates = datepicker.querySelector(".dates");

datepicker.hidden=true;

let activeInputOfDate = null;
let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

document.querySelector(".date-input-start").addEventListener("click", (e) => {
  // resetra za svako prvo pokretanje datuma pocetka
  const now = new Date();
  year = now.getFullYear();
  month = now.getMonth();
  selectedDate = now;
  
  activeInputOfDate = "start";
  const insertCalender = e.target.getBoundingClientRect();
  datepicker.style.top = `${insertCalender.bottom + window.scrollY}px`;
  datepicker.style.left = `${insertCalender.left + window.scrollX}px`;
  datepicker.hidden = !datepicker.hidden;

  displayDates(); 
});
document.querySelector(".date-input-end").addEventListener("click", (e) => {
  activeInputOfDate = "end";
  const insertCalender = e.target.getBoundingClientRect();
  datepicker.style.top = `${insertCalender.bottom + window.scrollY}px`; 
  datepicker.style.left = `${insertCalender.left + window.scrollX}px`;
  datepicker.hidden = !datepicker.hidden;
});

datepicker.querySelector(".cancel").addEventListener("click", () => {
  datepicker.hidden = true;
});

datepicker.querySelector(".apply").addEventListener("click", () => {
  const formattedDate = selectedDate.toLocaleDateString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  if (activeInputOfDate === "start") {
    const endDateValue = document.querySelector(".date-input-end").value;
    if (endDateValue){
      const endDate = new Date(endDateValue.split(".").reverse().join("-"));
      const startDate = new Date(selectedDate);
      if (endDate.getTime() >= startDate.getTime()) {
        document.querySelector(".date-input-start").value = formattedDate;
      } else {
        alert("Datum kraja mora biti veći ili jednak datumu početka!");
      }
    }else
      document.querySelector(".date-input-start").value = formattedDate;
  } else if (activeInputOfDate === "end") {
      const startDateValue = document.querySelector(".date-input-start").value;
      if (!startDateValue) {
        alert("Molimo unesite datum početka prije unosa datuma kraja!");
        return;
      }
      const startDate = new Date(startDateValue.split(".").reverse().join("-"));
      const endDate = new Date(selectedDate);
      if (endDate.getTime() >= startDate.getTime()) {
        document.querySelector(".date-input-end").value = formattedDate;
      } else {
        alert("Datum kraja mora biti veći ili jednak datumu početka!");
      }
  }
  

  datepicker.hidden = true;

});

const nextButton = datepicker.querySelector(".next");
nextButton.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

const prevBotton = datepicker.querySelector(".prev");
prevBotton.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

const inputedMonth = datepicker.querySelector(".month-input");
inputedMonth.addEventListener("change", () => {
  month = inputedMonth.selectedIndex;
  displayDates();
});

const inputedYear = datepicker.querySelector(".year-input");
inputedYear.addEventListener("change", () => {
  year = inputedYear.value;
  displayDates();
});


const handleDateClick = (e) => {
  const button = e.target;
  
  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  button.classList.add("selected");
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

const displayDates = () => {
    inputedMonth.selectedIndex = month;
    inputedYear.value = year;
    dates.innerHTML = "";

  const daysOfThePreviusMOnth = new Date(year, month, 0);
  for (let i = 0; i <= daysOfThePreviusMOnth.getDay(); i++) {
    const text = daysOfThePreviusMOnth.getDate() - daysOfThePreviusMOnth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  const lastOfMOnth = new Date(year, month + 1, 0);
  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  const daysOfTheNextMonth = new Date(year, month + 1, 1);
  for (let i = daysOfTheNextMonth.getDay(); i < 7; i++) {
    const text = daysOfTheNextMonth.getDate() - daysOfTheNextMonth.getDay() + i;
    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();
  let comparisonDate = new Date(year, month + type, text);

  const selected = selectedDate.getTime() === comparisonDate.getTime();
  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;


  const isToday = 
    currentDate.getDate() === comparisonDate.getDate() &&
    currentDate.getMonth() === comparisonDate.getMonth() &&
    currentDate.getFullYear() === comparisonDate.getFullYear();

  button.classList.toggle("today", isToday && !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();

