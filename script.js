// import calendarFunctions from 'datepicker.js';

//Funkcija za dodavanje događaja
const addNewCardButton = document.getElementById('add-event');

addNewCardButton.addEventListener('click', handleAddCardButtonClick);

function handleAddCardButtonClick() {
	const headerOfArticle = prompt('Unesi naziv događaja:', 'Događaj');
	if (!headerOfArticle) return;

	const imageLocation = prompt('Unesi putanju do slike: ', 'images/fesb-logo.png');
	if (!imageLocation) return;

	const description = prompt('Unesi opis događaja: ', 'tradicionalni');
	if (!description) return;

	const startDate = prompt("Unesi datum početka:", "19.1.2025.");
	const endDate = prompt("Unesi datum završetka:", "19.1.2025.");
  
	const newEvent = {
	  header: headerOfArticle,
	  image: imageLocation,
	  description: description,
	  location: "",
	  startDate: startDate,
	  endDate: endDate,
	};

	const happenings = JSON.parse(localStorage.getItem("events")) || [];
	
	// happenings su parsirani eventi (glupo ime zbog razlike)
	happenings.push(newEvent);
	
	// azuriranje i prikaz dogadaja koji su trenutno spremljenu
	localStorage.setItem("events", JSON.stringify(happenings));
	displaySavedEvents();
}

function displaySavedEvents(nameOfTheCity) {
	const cardContainer = document.getElementById("cards-container");
	cardContainer.innerHTML = "";

	var events = JSON.parse(localStorage.getItem("events")) || [];
	if(nameOfTheCity!=undefined & nameOfTheCity!=""){
		events = events.filter(event => event.location === nameOfTheCity);
	}else{
		events = JSON.parse(localStorage.getItem("events")) || [];
	}
	
	events.forEach((event, index) => {
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
			
			<div id="location-container-${index}">
				<label for="location-select-${index}">Odaberi lokaciju događaja:</label>
				<br>
				<select class="location-select-js" id="location-select-${index}">
					<option value="">Izaberi lokaciju</option>
				</select>
				<button class="confirm-location" data-index="${index}">Potvrdi</button>
			</div>
			<p id="location">Lokacija: ${event.location || "Lokacija nije odabrana"}</p>
			



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


	  //FETCHANJE
	  fetch("https://raw.githubusercontent.com/samayo/country-json/refs/heads/master/src/country-by-capital-city.json")
	  .then(response => response.json())
	  .then(data => {
		  const select = document.getElementById(`location-select-${index}`);
		  data.forEach((entry) => {
			  const option = document.createElement("option");
			  option.value = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
			  option.textContent = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
			  select.appendChild(option);
		  });
	  })
	  .catch(error => console.log("Unable to fetch cities", error));
  

	article.querySelector(".confirm-location").addEventListener("click", () => {
		const select = document.getElementById(`location-select-${index}`);
		const selectedLocation = select.value;

		const events = JSON.parse(localStorage.getItem("events")) || [];
		events[index].location = selectedLocation;
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
	  data.forEach((entry) => {
		  const option = document.createElement("option");
		  option.value = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
		  option.textContent = entry.city ? `${entry.city}, ${entry.country}` : entry.country;
		  select.appendChild(option);
	  });
  })
  .catch(error => console.log("Unable to fetch cities", error));


  
function getCityInFilter(){
	const buttonFound = document.querySelector(".found-events-on-location");

	buttonFound.addEventListener("click", () => {
	  const select = document.getElementById("location-select");
	select.value != undefined ? displaySavedEvents(select.value) : select.value = undefined;
	
});
}

document.addEventListener("DOMContentLoaded", () => {
	getCityInFilter();
  });