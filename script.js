//Funkcija za dodavanje događaja
const addNewCardButton = document.getElementById('add-event');

addNewCardButton.addEventListener('click', handleAddNewCardButtonClick);

function handleAddNewCardButtonClick() {
	const headerOfArticle = document.querySelector('[name="name-of-event"]').value;
	if (headerOfArticle == "") {
		alert("Unos naziva događaja je obavezan!");
		return;
	}
	const imageLocation = document.querySelector('[name="URL-of-picture"]').value;
	if (imageLocation == ""){
		alert("Unos URL fotografije događaja je obavezan!");
		return;
	}

	const description = document.querySelector('[name="description-of-event"]').value;
	if (!description) {
		alert("Unos opisa događaja je obavezan!");
		return;
	}
	const location= document.getElementById('location-select').value;
	if (!location) {
		alert("Unos lokacije događaja je obavezan!");
		return;
	}
	const startDate =document.querySelector('.date-input-start').value;
	if (startDate  == "") {
		alert("Unos datuma početka događaja je obavezan!");
		return;
	}
	const endDate = document.querySelector('.date-input-end').value;


	const newEvent = {
	  header: headerOfArticle,
	  image: imageLocation,
	  description: description,
	  location: location,
	  startDate: startDate,
	  endDate: endDate,
	};

	const happenings = JSON.parse(localStorage.getItem("events")) || [];
	if (endDate  == "") {
		newEvent.endDate=startDate;
	}
	// happenings su parsirani eventi (glupo ime zbog razlike)
	happenings.push(newEvent);
	localStorage.setItem("events", JSON.stringify(happenings));
	displaySavedEvents();


	document.querySelector('[name="name-of-event"]').value = "";
	document.querySelector('[name="URL-of-picture"]').value = "";
	document.querySelector('[name="description-of-event"]').value = "";
	document.getElementById('location-select').value = "";
	document.querySelector('.date-input-start').value = "";
	document.querySelector('.date-input-end').value = "";
}

function displaySavedEvents(nameOfTheCity) {
	const cardContainer = document.getElementById("cards-container");
	cardContainer.innerHTML = "";

	let events = JSON.parse(localStorage.getItem("events")) || [];
	const filteredEvents = nameOfTheCity
		? events.filter(event => event.location === nameOfTheCity)
		: events;

	if (filteredEvents.length === 0){
		const article = document.createElement("article");
	  article.classList.add("card");
		article.innerHTML = ` 
			<p id="message-empty">Trenutno nema dostupnih događaja za odabranu lokaciju.</p>
		`
		cardContainer.appendChild(article);
	}
	
	filteredEvents.forEach((event) => {
	  const article = document.createElement("article");
	  article.classList.add("card");

	  article.innerHTML = `
		<div class="card-main">
		  <div class="card-header">
			<h2>${event.header}</h2>
			<img src="${event.image}" alt="Event Image" />
		  </div>
		  <div class="card-text-container">
			<p id="description">Opis događaja: ${event.description}</p>
			
			<p id="location">Lokacija: ${event.location}</p>

			<p id="start-date">Datum početka: ${event.startDate}</p>
			<p id="end-date">Datum završetka: ${event.endDate}</p>
		  </div>
		</div>
		<div class="delete-class">
		  <button class="delete-event">Obriši događaj</button>
		</div>
	  `;

		  article.querySelector(".delete-event").addEventListener("click", () => {
			let events = JSON.parse(localStorage.getItem("events")) || [];
	  
			// trazi za dodadaj koji je trigeran
			events = events.filter((temp) => temp.header !== event.header);
			localStorage.setItem("events", JSON.stringify(events));
		  
			displaySavedEvents();
		});
	cardContainer.appendChild(article);
	});
}
  
  document.addEventListener('DOMContentLoaded', async function () {
	try {
		displaySavedEvents();
	}catch (e) {
		console.error(e);
	}
  });



  fetch("https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json")
  .then(response => response.json())
  .then(data => {
	  const select = document.getElementById(`location-select`);
	  const searchSelect = document.getElementById('location-select-menu');
	  data.forEach((entry) => {
		  const option = document.createElement("option");
		  option.value = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
		  option.textContent = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
		  select.appendChild(option.cloneNode(true));
		  searchSelect.appendChild(option.cloneNode(true));
	  });
  })
  
function getCityInFilter(){
	const buttonFound = document.querySelector(".found-events-on-location");

	buttonFound.addEventListener("click", () => {
	  const searchSelect = document.getElementById("location-select-menu");
	  searchSelect.value != undefined ? displaySavedEvents(searchSelect.value) : displaySavedEvents();
	
});
}

document.addEventListener("DOMContentLoaded", () => {
	getCityInFilter();
  });