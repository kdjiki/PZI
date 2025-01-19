

const datepicker = document.querySelector(".datepicker");
const dates = datepicker.querySelector(".dates");

datepicker.hidden=true;

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

document.querySelector(".date-input").addEventListener("click", () => {
  datepicker.hidden = !datepicker.hidden;
});

datepicker.querySelector(".cancel").addEventListener("click", () => {
  datepicker.hidden = true;
});

datepicker.querySelector(".apply").addEventListener("click", () => {
    document.querySelector(".date-input").value = selectedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
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

  // remove the 'selected' class from other buttons
  const selected = dates.querySelector(".selected");
  selected && selected.classList.remove("selected");

  // add the 'selected' class to current button
  button.classList.add("selected");

  // set the selected date
  selectedDate = new Date(year, month, parseInt(button.textContent));
};

// render the dates in the calendar interface
const displayDates = () => {
  // update year & month whenever the dates are updated
    inputedMonth.selectedIndex = month;
    inputedYear.value = year;
    dates.innerHTML = "";

  //* display the last week of previous month

  // get the last date of previous month
  const daysOfThePreviusMOnth = new Date(year, month, 0);

  for (let i = 0; i <= daysOfThePreviusMOnth.getDay(); i++) {
    const text = daysOfThePreviusMOnth.getDate() - daysOfThePreviusMOnth.getDay() + i;
    const button = createButton(text, true, -1);
    dates.appendChild(button);
  }

  //* display the current month

  // get the last date of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    const button = createButton(i, false);
    button.addEventListener("click", handleDateClick);
    dates.appendChild(button);
  }

  //* display the first week of next month

  const daysOfTheNextMonth = new Date(year, month + 1, 1);

  for (let i = daysOfTheNextMonth.getDay(); i < 7; i++) {
    const text = daysOfTheNextMonth.getDate() - daysOfTheNextMonth.getDay() + i;
    const button = createButton(text, true, 1);
    dates.appendChild(button);
  }
};

const createButton = (text, isDisabled = false, type = 0) => {
  const currentDate = new Date();

  // determine the date to compare based on the button type
  let comparisonDate = new Date(year, month + type, text);

  // check if the current button is selected
  const selected = selectedDate.getTime() === comparisonDate.getTime();

  const button = document.createElement("button");
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today",  currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month && 
    !isDisabled);
  button.classList.toggle("selected", selected);
  return button;
};

displayDates();

